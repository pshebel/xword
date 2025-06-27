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

# VPC
module "vpc" {
  source = "../../modules/vpc"

  name_prefix = "${var.project_name}-${var.environment}-vpc"
  region      = var.region
  environment = var.environment
}

# Bastion
module "bastion" {
  source = "../../modules/bastion"

  name_prefix         = "${var.project_name}-${var.environment}-bastion"
  region              = var.region
  environment         = var.environment
  allowed_cidr_blocks = var.allowed_cidr_blocks
  ami                 = data.aws_ami.amazon_linux.id
  vpc_id              = module.vpc.vpc_id
  subnet_id           = module.vpc.public_subnets[0]
  size                = "t3.micro"
}

# ALB
module "alb" {
  source = "../../modules/alb"

  name_prefix    = "${var.project_name}-${var.environment}-alb"
  region         = var.region
  environment    = var.environment
  public_subnets = module.vpc.public_subnets
  vpc_id              = module.vpc.vpc_id
  
}
# frontend
module "frontend" {
  source = "../../modules/frontend"

  name_prefix   = "${var.project_name}-${var.environment}-frontend"
  ami                 = data.aws_ami.amazon_linux.id
  size          = "t3.small"
  alb_arn = module.alb.alb_arn
  region        = var.region
  environment   = var.environment
  subnet_id     = module.vpc.public_subnets[1]
  alb_sg_id     = module.alb.alb_sg_id
  bastion_sg_id = module.bastion.bastion_sg_id
  vpc_id        = module.vpc.vpc_id
  
}


# Backend
module "backend" {
  source = "../../modules/backend"

  size          = "t3.small"
  name_prefix   = "${var.project_name}-${var.environment}-backend"
  ami                 = data.aws_ami.amazon_linux.id
  alb_arn = module.alb.alb_arn

  region        = var.region
  environment   = var.environment
  subnet_id     = module.vpc.private_subnets[0]
  alb_sg_id     = module.alb.alb_sg_id
  bastion_sg_id = module.bastion.bastion_sg_id
  vpc_id              = module.vpc.vpc_id
  frontend_http_listener_arn = module.frontend.frontend_http_listener_arn
  frontend_https_listener_arn = module.frontend.frontend_https_listener_arn

}

