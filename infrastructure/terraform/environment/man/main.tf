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
    key    = "man/terraform.tfstate"
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

  vpc_cidr = "10.1.0.0/16"

  project_name = "xword"
  region      = var.region
  environment = var.environment
}

# bastion
module "bastion" {
  source = "../../modules/bastion"

  project_name = "xword"
  ami           = data.aws_ami.amazon_linux.id
  size          = "t3.micro"
  allowed_cidr_blocks = var.allowed_cidr_blocks
  region        = var.region
  environment   = var.environment
  subnet_id     = module.vpc.public_subnets[1]
  vpc_id        = module.vpc.vpc_id
}