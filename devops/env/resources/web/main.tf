provider "aws" {
  region = "us-east-1"
}

data "aws_vpc" "vpc" {
  tags = {
    Name = "xword-vpc"
  }
}

data "aws_security_group" "db_access_sg" {
  tags = {
    Name  = "${var.environment}-db-access-sg"
  }
}

data "aws_security_group" "vpc_sg" {
  tags = {
    Name = "${var.environment}-vpc-sg"
  }
}

data "aws_subnet" "xword-web-subnet" {
  tags = {
    Name = "xword-web-subnet"
  }
}


data "aws_ami" "amazon-linux-2" {
 most_recent = true

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm*"]
  }
  owners = ["amazon"]
}

resource "aws_instance" "web" {
  ami                           = "${data.aws_ami.amazon-linux-2.id}"
  instance_type                 = "${var.instance_type}"
  subnet_id                     = "${data.aws_subnet.xword-web-subnet.id}"
  key_name                      = "${var.key_name}"
  associate_public_ip_address   = "${var.associate_public_ip_address}"
  vpc_security_group_ids        = ["${data.aws_security_group.vpc_sg.id}", "${data.aws_security_group.db_access_sg.id}"]
  tags = {
    Name = "xword-web"
  }
}
