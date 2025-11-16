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
    key    = "prod/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.region
}

data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

data "aws_vpc" "man" {
  filter {
    name = "tag:Name"
    values = ["xword-man-vpc"]
  }
}

data "aws_security_group" "man-bastion-sg" {
  filter {
    name = "tag:Name"
    values = ["xword-man-bastion-sg"]
  }
}

locals {
  vpc_cidr = "10.3.0.0/16"
  man_cidr = "10.1.0.0/16"
}

# VPC
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
  db_password = "postgres"
  vpc_id = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets
  allowed_cidr_blocks = [local.vpc_cidr, local.man_cidr]
}

# # backend
# module "alb" {
#   source = "../../modules/"
# }


# # DNS
# module "route53" {
#   source = "../../modules/route53"

#   public_ip = module.monolith.public_ip
# }

# # NAT Gateway
# module "nat-gateway" {
#   source = "../../modules/nat-gateway"

#   name_prefix = "xword-${var.environment}-nat-gateway"
#   region      = var.region
#   environment = var.environment
#   subnet_id = module.vpc.public_subnets[0]
#   private_subnets = module.vpc.private_subnets
#   private_rt = module.vpc.private_rt
#   vpc_id        = module.vpc.vpc_id
# }

# # frontend
# module "frontend" {
#   source = "../../modules/frontend"

#   size          = "t3.small"
#   name_prefix   = "xword-${var.environment}-frontend"
#   ami           = data.aws_ami.amazon_linux.id
#   region        = var.region
#   environment   = var.environment
#   subnet_id     = module.vpc.public_subnets[0]
#   bastion_sg_id = data.aws_security_group.man-bastion-sg.id
#   vpc_id        = module.vpc.vpc_id
# }

# # Backend
# module "backend" {
#   source = "../../modules/backend"

#   size          = "t3.small"
#   api_port      = 3000
#   name_prefix   = "xword-${var.environment}-backend"
#   ami           = data.aws_ami.amazon_linux.id

#   frontend_sg_id = module.frontend.frontend_sg_id
#   region        = var.region
#   environment   = var.environment
#   subnet_id     = module.vpc.private_subnets[0]
#   bastion_sg_id = data.aws_security_group.man-bastion-sg.id
#   vpc_id        = module.vpc.vpc_id
# }

