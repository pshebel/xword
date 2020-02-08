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

resource "aws_security_group" "bastion" {
  vpc_id = var.vpc_id
  name = "${var.environment}-bastion-sg"
  description = "Allow access to bastion"

  tags = {
    Name = "${var.environment}-bastion-sg"
    Environment = var.environment
  }

  ingress {
    to_port = 22
    from_port = 22
    protocol  = "tcp"
    cidr_blocks = var.cidr_blocks
  }
  // outbound internet access
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


resource "aws_instance" "bastion" {
  ami           = "${data.aws_ami.ubuntu.id}"
  instance_type = "${var.instance_type}"
  subnet_id = "${var.subnet_id}"
  key_name = "${var.key_name}"
  associate_public_ip_address = "${var.associate_public_ip_address}"
  vpc_security_group_ids= ["${aws_security_group.bastion.id}", "${var.db_access_sg_id}"]
  tags = {
    Name = "xword-bastion"
  }
}