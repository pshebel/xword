provider "aws" {
  region = "us-east-1"
}


data "aws_vpc" "xword-vpc" {
  tags = {
    Name = "xword-vpc"
  }
}

data "aws_subnet" "xword-data-subnet1" {
  tags = {
    Name = "xword-data-subnet-1"
  }
}

data "aws_subnet" "xword-data-subnet2" {
  tags = {
    Name = "xword-data-subnet-2"
  }
}

module "rds" {
  source            = "../../resources/rds"
  environment       = "production"
  allocated_storage = "20"
  database_name     = "${var.production_database_name}"
  database_username = "${var.production_database_username}"
  database_password = "${var.production_database_password}"
  subnet_ids        = ["${data.aws_subnet.xword-data-subnet1.id}", "${data.aws_subnet.xword-data-subnet2.id}"]
  vpc_id            = "${data.aws_vpc.xword-vpc.id}"
  instance_class    = "db.t2.micro"
}