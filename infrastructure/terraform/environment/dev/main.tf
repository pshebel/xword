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
  vpc_cidr = "10.2.0.0/16"
  man_cidr = "10.1.0.0/16"
}

# VPC
module "vpc" {
  source = "../../modules/vpc"

  vpc_cidr = local.vpc_cidr

  name_prefix = "xword-${var.environment}-vpc"
  region      = var.region
  environment = var.environment
}

# VPC Peering
module "vpc-peering" {
  source = "../../modules/vpc-peering"

  vpc_man = module.vpc.vpc_id
  vpc_env = data.aws_vpc.man.id
  vpc_man_cidr = local.man_cidr
  vpc_env_cidr = local.vpc_cidr
  region      = var.region
  environment = var.environment
}

# NAT Gateway
module "nat-gateway" {
  source = "../../modules/nat-gateway"

  name_prefix = "xword-${var.environment}-nat-gateway"
  region      = var.region
  environment = var.environment
  subnet_id = module.vpc.public_subnets[0]
  private_subnets = module.vpc.private_subnets
  private_rt = module.vpc.private_rt
  vpc_id        = module.vpc.vpc_id
}

# frontend
module "frontend" {
  source = "../../modules/frontend"

  size          = "t3.small"
  name_prefix   = "xword-${var.environment}-frontend"
  ami           = data.aws_ami.amazon_linux.id
  region        = var.region
  environment   = var.environment
  subnet_id     = module.vpc.public_subnets[0]
  bastion_sg_id = data.aws_security_group.man-bastion-sg.id
  vpc_id        = module.vpc.vpc_id
}

# Backend
module "backend" {
  source = "../../modules/backend"

  size          = "t3.small"
  api_port      = 3000
  name_prefix   = "xword-${var.environment}-backend"
  ami           = data.aws_ami.amazon_linux.id

  frontend_sg_id = module.frontend.frontend_sg_id
  region        = var.region
  environment   = var.environment
  subnet_id     = module.vpc.private_subnets[0]
  bastion_sg_id = data.aws_security_group.man-bastion-sg.id
  vpc_id        = module.vpc.vpc_id
}

