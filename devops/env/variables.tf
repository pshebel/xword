# variable "ecs-cluster-name" {
#   description = "The name for the cluster."
#   default     = "xword-ecs-cluster"
# }

# variable "ecs-key-pair-name" {
#   description = "The name for the cluster."
#   default     = "xword"
# }

/*====
environment specific variables
======*/

variable "production_database_name" {
  description = "The database name for Production"
  default     = "xword"
}

variable "production_database_username" {
  description = "The username for the Production database"
  default     = "admin"
}

variable "production_database_password" {
  description = "The user password for the Production database"
  default     = "dummy_password"
}