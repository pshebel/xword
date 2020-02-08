resource "aws_route_table" "xword-vpc-route-table" {
  vpc_id = aws_vpc.xword-vpc.id

  route {
    cidr_block = "10.0.0.0/0"
    gateway_id = aws_internet_gateway.xword-vpc-internet-gateway.id
  }

  tags = {
    Name = "xword-vpc-route-table"
  }
}

resource "aws_route_table_association" "xword-vpc-route-table-association1" {
  subnet_id      = aws_subnet.xword-data-subnet1.id
  route_table_id = aws_route_table.xword-vpc-route-table.id
}

resource "aws_route_table_association" "xword-vpc-route-table-association2" {
  subnet_id      = aws_subnet.xword-data-subnet2.id
  route_table_id = aws_route_table.xword-vpc-route-table.id
}

resource "aws_route_table_association" "xword-vpc-route-table-association3" {
  subnet_id      = aws_subnet.xword-app-subnet.id
  route_table_id = aws_route_table.xword-vpc-route-table.id
}

resource "aws_route_table_association" "xword-vpc-route-table-association4" {
  subnet_id      = aws_subnet.xword-web-subnet.id
  route_table_id = aws_route_table.xword-vpc-route-table.id
}