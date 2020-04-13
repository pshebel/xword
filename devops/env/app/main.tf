provider "aws" {
  region = "us-east-1"
}

data "aws_ami" "amazon-linux-2" {
 most_recent = true

 filter {
   name   = "name"
   values = ["amzn2-ami-hvm*"]
 }
  owners = ["amazon"]
}

/* Security Group for resources that want to access the App */
resource "aws_security_group" "app_access_sg" {
  vpc_id      = var.vpc_id
  name        = "${var.environment}-app-access-sg"
  description = "Allow access to app subnet"

  tags = {
    Name        = "${var.environment}-app-access-sg"
    Environment = var.environment
  }
}


resource "aws_security_group" "app_sg" {
  name = "${var.environment}-app-sg"
  description = "${var.environment} Security Group"
  vpc_id = var.vpc_id
  tags = {
    Name = "${var.environment}-app-sg"
    Environment =  var.environment
  }

  // allows traffic from the SG itself
  ingress {
      from_port = 0
      to_port = 0
      protocol = "-1"
      self = true
  }

  ingress {
    to_port = 22
    from_port = 22
    protocol  = "tcp"
    cidr_blocks = var.cidr_blocks
  }
  
  //allow traffic for TCP 5432
  ingress {
      from_port = 8000
      to_port   = 8000
      protocol  = "tcp"
      security_groups = ["${aws_security_group.app_access_sg.id}"]
  }

  // outbound internet access
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "app" {
  ami                           = "${data.aws_ami.amazon-linux-2.id}"
  instance_type                 = "${var.instance_type}"
  subnet_id                     = "${var.subnet_id}"
  key_name                      = "${var.key_name}"
  associate_public_ip_address   = "${var.associate_public_ip_address}"
  vpc_security_group_ids        = ["${aws_security_group.app_sg.id}", "${var.db_access_sg_id}"]
  tags = {
    Name = "xword-app"
  }
}
