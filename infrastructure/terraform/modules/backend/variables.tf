variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}
variable "environment" {
  description = "environment"
  type        = string
  default     = "dev"
}

variable "name_prefix" {
  description = "prefix for resources created for a project"
  type        = string
  default     = "xword"
}

variable "key_pair_name" {
  description = "project name"
  type        = string
  default     = "xword"
}

variable "ami" {
  description = "the id for the aws linux image"
  type        = string
}

variable "subnet_id" {
    description = "private subnet id for backend"
    type = string
}

variable "bastion_sg_id" {
    description = "id of the bastion security group"
    type = string
}

variable "frontend_sg_id" {
    description = "id of the frontend security group"
    type = string
}

variable "size" {
  description = "size of the ec2 instance used for the bastion"
  type        = string
  default = "t3.micro"
}

variable "vpc_id" {
  description = "id for the previously created vpc"
  type        = string
}


variable "api_port" {
  description = "port number to accept api requests"
  type        = number
}
