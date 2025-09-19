variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "project name"
  type        = string
  default     = "xword"
}

variable "key_pair_name" {
  description = "project name"
  type        = string
  default     = "xword"
}

variable "environment" {
  description = "environment"
  type        = string
  default     = "dev"
}