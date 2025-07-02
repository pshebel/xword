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

variable "vpc_man" {
  description = "vpc to connect from"
  type        = string
}

variable "vpc_env" {
  description = "vpc to connect to"
  type        = string
}


variable "vpc_man_cidr" {
  description = "destination vpc cidr"
  type = string
}

variable "vpc_env_cidr" {
  description = "destination vpc cidr"
  type = string
}
