provider "aws" {
  region = var.region
}


resource "aws_route53_zone" "main" {
  name = "xword.io"
}


resource "aws_route53_record" "dev-a1" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "xword.io"
  type    = "A"
  ttl     = "30"
  records  = [var.public_ip]
}


resource "aws_route53_record" "dev-a2" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "www.xword.io"
  type    = "A"
  ttl     = "30"
  records  = [var.public_ip]
}