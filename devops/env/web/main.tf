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


resource "aws_instance" "web" {
  ami                           = "${data.aws_ami.amazon-linux-2.id}"
  instance_type                 = "${var.instance_type}"
  subnet_id                     = "${var.subnet_id}"
  key_name                      = "${var.key_name}"
  associate_public_ip_address   = "${var.associate_public_ip_address}"
  vpc_security_group_ids        = ["${var.xword_vpc_security_group_id}", "${var.app_access_sg_id}"]
  tags = {
    Name = "xword-web"
  }
}
