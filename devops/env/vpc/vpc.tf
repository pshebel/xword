resource "aws_vpc" "xword-vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = "true"

  tags = {
    Name = "xword-vpc"
  }
}

output "id" {
  value = aws_vpc.xword-vpc.id
}