resource "aws_ecr_repository" "xword-ui" {
  name                 = "xword-ui"
  image_tag_mutability = "MUTABLE"

  # image_scanning_configuration {
  #   scan_on_push = true
  # }
}

