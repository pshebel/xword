provider "aws" {
  region = var.region
}

resource "aws_vpc_peering_connection" "main" {
  peer_vpc_id   = var.vpc_man
  vpc_id        = var.vpc_env
  auto_accept   = true

  accepter {
    allow_remote_vpc_dns_resolution = true
  }

  requester {
    allow_remote_vpc_dns_resolution = true
  }
  tags = {
    Name = "xword-man-${var.environment}-peering"
  }
}

data "aws_route_table" "man" {
  filter {
    name = "tag:Name"
    values = ["xword-man-vpc-public-rt"]
  }
}

resource "aws_route" "man-public" {
  route_table_id = data.aws_route_table.man.id
  destination_cidr_block = var.vpc_env_cidr
  vpc_peering_connection_id = aws_vpc_peering_connection.main.id
}

data "aws_route_table" "env-public" {
  filter {
    name = "tag:Name"
    values = ["xword-${var.environment}-vpc-public-rt"]
  }
}

resource "aws_route" "env-public" {
  route_table_id = data.aws_route_table.env-public.id
  destination_cidr_block = var.vpc_man_cidr
  vpc_peering_connection_id = aws_vpc_peering_connection.main.id
}

data "aws_route_table" "env-private" {
  filter {
    name = "tag:Name"
    values = ["xword-${var.environment}-vpc-private-rt"]
  }
}
resource "aws_route" "env-private" {
  route_table_id = data.aws_route_table.env-private.id
  destination_cidr_block = var.vpc_man_cidr
  vpc_peering_connection_id = aws_vpc_peering_connection.main.id
}