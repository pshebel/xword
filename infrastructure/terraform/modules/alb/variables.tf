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

variable "public_subnets" {
    description = "list of public subnets in vpc"
    type = list(string)
}

variable "vpc_id" {
  description = "id for the previously created vpc"
  type        = string
}