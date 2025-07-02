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

variable "vpc_id" {
  description = "CIDR block for VPC"
  type        = string
}

variable "subnet_id" {
  description = "id of the public subnet"
  type        = string
  default     = "10.0.0.0/16"
}

variable "private_subnets" {
  description = "Private subnet ids"
  type        = list(string)
}

variable "private_rt" {
  description = "private route table id"
  type        = string
}
