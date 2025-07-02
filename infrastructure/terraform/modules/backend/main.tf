provider "aws" {
  region = var.region
}

# Security Group for API Host
resource "aws_security_group" "backend" {
  vpc_id      = var.vpc_id

  ingress {
    description = "API"
    from_port   = var.api_port
    to_port     = var.api_port
    protocol    = "tcp"
    security_groups = [var.frontend_sg_id]
  }

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    security_groups = [var.bastion_sg_id]
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

resource "aws_instance" "backend" {
  ami                    = var.ami
  instance_type          = var.size
  key_name               = var.key_pair_name
  vpc_security_group_ids = [aws_security_group.backend.id]
  subnet_id              = var.subnet_id

  tags = {
    Name        = var.name_prefix
    Environment = var.environment
  }
}

resource "aws_ebs_volume" "backend" {
  availability_zone = "us-east-1a"
  size              = 40

  tags = {
    Name = "${var.name_prefix}-ebs-volume"
  }
}

resource "aws_volume_attachment" "ebs_att" {
  device_name = "/dev/sdh"
  volume_id   = aws_ebs_volume.backend.id
  instance_id = aws_instance.backend.id
}
