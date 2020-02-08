provider "aws" {
  region = "us-east-1"
}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-trusty-14.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

resource "aws_instance" "web" {
  ami                           = "${data.aws_ami.ubuntu.id}"
  instance_type                 = "${var.instance_type}"
  subnet_id                     = "${var.subnet_id}"
  key_name                      = "${var.key_name}"
  associate_public_ip_address   = "${var.associate_public_ip_address}"
  vpc_security_group_ids        = ["${var.xword_vpc_security_group_id}", "${var.app_access_sg_id}"]
  tags = {
    Name = "xword-web"
  }
}
