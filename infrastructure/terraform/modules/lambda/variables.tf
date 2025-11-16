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

variable "environment" {
  description = "environment"
  type        = string
  default     = "dev"
}

variable "vpc_id" {
  description = "VPC ID where RDS will be deployed"
  type        = string
}

variable "subnet_ids" {
  description = "List of subnet IDs for DB subnet group"
  type        = list(string)
  default = []
}

variable "rds_arn" {
  description = "arn of RDS"
  type        = string
}

variable "db_credentials_secret_arn" {
  type = string
}

variable "cors_allowed_origins" {
  type        = list(string)
  default = []
}
