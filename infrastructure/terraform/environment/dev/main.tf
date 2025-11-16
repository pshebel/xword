terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket = "xword-tfstate"
    key    = "dev/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.region
}

data "aws_acm_certificate" "xword" {
  domain = "xword.io"
}

data "aws_route53_zone" "xword" {
  name         = "xword.io"
  private_zone = false
}

data "aws_vpc" "man" {
  filter {
    name = "tag:Name"
    values = ["xword-man"]
  }
}

data "aws_security_group" "man-bastion-sg" {
  filter {
    name = "tag:Name"
    values = ["xword-bastion-sg"]
  }
}

locals {
  vpc_cidr = "10.2.0.0/16"
  man_cidr = "10.1.0.0/16"
}

# network
module "vpc" {
  source = "../../modules/vpc"

  vpc_cidr = local.vpc_cidr

  project_name = "xword"
  region      = var.region
  environment = var.environment
}

# VPC Peering
module "vpc-peering" {
  source = "../../modules/vpc-peering"

  vpc_man = data.aws_vpc.man.id
  vpc_env = module.vpc.vpc_id
  vpc_man_cidr = local.man_cidr
  vpc_env_cidr = local.vpc_cidr
  region      = var.region
  environment = var.environment

  depends_on = [module.vpc]
}

# NAT Gateway
module "nat-gateway" {
  source = "../../modules/nat-gateway"

  project_name = "xword"
  region      = var.region
  environment = var.environment
  subnet_id = module.vpc.public_subnets[0]
  private_subnets = module.vpc.private_subnets
  private_rt = module.vpc.private_rt
  vpc_id   = module.vpc.vpc_id
}


# db
module "rds" {
  source = "../../modules/rds"

  region = var.region
  environment = var.environment
  project_name = "xword"
  bastion_sg_id = data.aws_security_group.man-bastion-sg.id
  db_name = "xword"
  db_username = "postgres"
  vpc_id = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets
  allowed_cidr_blocks = [local.man_cidr]
}


module "lambda" {
  source = "../../modules/lambda"

  cors_allowed_origins= ["https://xword.io"]
  rds_arn = module.rds.rds_arn
  db_credentials_secret_arn = module.rds.db_credentials_secret_arn
  region = var.region
  environment = var.environment
  project_name = "xword"
  vpc_id = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets
  depends_on = [module.vpc-peering, module.rds]
}



module "frontend" {
  source = "../../modules/frontend"

  region = var.region
  environment = var.environment
  project_name = "xword"
  bucket_name = "xword"
  domain_name = "xword.io"
  acm_certificate_arn = data.aws_acm_certificate.xword.arn
  route53_zone_id = data.aws_route53_zone.xword.zone_id
}

# DNS
# module "route53" {
#   source = "../../modules/route53"

#   public_ip = module.monolith.public_ip
# }