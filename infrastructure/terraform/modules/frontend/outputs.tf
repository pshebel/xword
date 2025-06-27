output "frontend_http_listener_arn" {
  description = "arn of the http alb listener"
  value       = aws_lb_listener.http.arn
}

output "frontend_https_listener_arn" {
  description = "arn of the https alb listener"
  value       = aws_lb_listener.https.arn
}