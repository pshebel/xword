variable "instance_type" {
  description = "aws instance type"
}

variable "key_name" {
  description = "name of pem"
}

variable "associate_public_ip_address" {
  description = "associate public ip address"
}

variable "subnet_id" {
  description = "Subnet id"
}
variable "app_access_sg_id" {
  description = "app access sg"
}

variable "xword_vpc_security_group_id" {
  description = "vpc access sg"
}
variable "vpc_id" {
  description = "The VPC id"
}
variable "environment" {
  description = "The environment"
}
