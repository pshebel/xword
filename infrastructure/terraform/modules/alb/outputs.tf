output "alb_sg_id" {
  description = "ID of the alb sg"
  value       = aws_security_group.alb.id
}

output "alb_arn" {
  description = ""
  value = aws_lb.main.arn
}