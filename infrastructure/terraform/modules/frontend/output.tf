output "s3_bucket_name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.web_bucket.id
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution"
  value       = aws_cloudfront_distribution.web_distribution.id
}

output "cloudfront_domain_name" {
  description = "Domain name of the CloudFront distribution"
  value       = aws_cloudfront_distribution.web_distribution.domain_name
}

output "website_url" {
  description = "Website URL"
  value       = var.domain_name != "" ? "https://${var.domain_name}" : "https://${aws_cloudfront_distribution.web_distribution.domain_name}"
}

output "route53_records" {
  description = "Route53 DNS records created"
  value = var.domain_name != "" && var.route53_zone_id != "" ? {
    a_record    = "${var.domain_name} -> ${aws_cloudfront_distribution.web_distribution.domain_name}"
    aaaa_record = "${var.domain_name} -> ${aws_cloudfront_distribution.web_distribution.domain_name}"
  } : null
}