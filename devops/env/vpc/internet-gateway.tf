resource "aws_internet_gateway" "xword-vpc-internet-gateway" {
  vpc_id = aws_vpc.xword-vpc.id

  tags = {
    Name = "xword-vpc-internet-gateway"
  }
}