provider "aws" {
  region = "us-east-1"
}

data "aws_vpc" "vpc" {
  tags {
    Name = "xword-vpc"
  }
}

data "aws_db_instance" "rds" {
  tags = {
     Name = "xword-rds"
  }
}


module "app" {
  source                      = "../../resources/app"
  instance_type               = "t2.micro"
  subnet_id                   = "${data.vpc.xword-app-subnet-id}"
  key_name                    = "xword"
  associate_public_ip_address = true
  environment                 = "production"
  vpc_id                      = "${data.vpc.id}"
  db_access_sg_id             = "${data.rds.db_access_sg_id}"
  cidr_blocks                 = ["73.39.106.77/32"]
}