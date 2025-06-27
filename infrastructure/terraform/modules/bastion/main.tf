provider "aws" {
  region = var.region
}

# Security Group for Bastion Host
resource "aws_security_group" "bastion" {
  vpc_id      = var.vpc_id

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.allowed_cidr_blocks
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.name_prefix}-sg"
    Environment = var.environment
  }
}

# Bastion Host
resource "aws_instance" "bastion" {
  ami                    = var.ami
  instance_type          = var.size
  key_name               = var.key_pair_name
  vpc_security_group_ids = [aws_security_group.bastion.id]
  subnet_id              = var.subnet_id

  # user_data = "${file("setup.sh")}"

  tags = {
    Name        = "${var.name_prefix}-host"
    Environment = var.environment
    Type        = "Bastion"
  }
}