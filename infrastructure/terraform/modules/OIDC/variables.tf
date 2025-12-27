variable "region" {
  description = "AWS region where resources are deployed"
  type        = string
  default     = "us-east-1"
}

variable "account_id" {
  description = "AWS account ID"
  type        = string
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "role_name" {
  description = "Name of the IAM role for GitHub Actions"
  type        = string
  default     = "github-actions-deploy-role"
}

variable "github_owner" {
  description = "GitHub organization or user name"
  type        = string
}

variable "github_repo" {
  description = "GitHub repository name"
  type        = string
}

variable "github_branch" {
  description = "GitHub branch that can assume the role"
  type        = string
  default     = "main"
}

variable "lambda_function_name" {
  description = "Name of the Lambda function to deploy"
  type        = string
  default     = "xword-dev-api"
}

variable "api_gateway_id" {
  description = "ID of the API Gateway REST API"
  type        = string
}