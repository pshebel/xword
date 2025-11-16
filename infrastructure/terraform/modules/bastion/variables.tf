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

variable "project_name" {
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

variable "vpc_id" {
  description = "id for the previously created vpc"
  type        = string
}

variable "subnet_id" {
  description = "id of a public subnet"
  type = string
}

variable "size" {
  description = "size of the ec2 instance used for the bastion"
  type        = string
  default = "t3.micro"
}

variable "allowed_cidr_blocks" {
  description = "CIDR blocks allowed to access bastion host"
  type        = list(string)
}