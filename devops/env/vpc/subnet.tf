resource "aws_subnet" "xword-data-subnet1" {
    vpc_id     = aws_vpc.xword-vpc.id
    cidr_block = "10.0.0.0/24"
    availability_zone = "us-east-1a"

    tags = {
        Name = "xword-data-subnet-1"
    }
}

resource "aws_subnet" "xword-data-subnet2" {
    vpc_id     = aws_vpc.xword-vpc.id
    cidr_block = "10.0.1.0/24"
    availability_zone = "us-east-1b"

    tags = {
        Name = "xword-data-subnet-2"
    }
}

# for now, bastion subnet too
resource "aws_subnet" "xword-web-subnet" {
    vpc_id     = aws_vpc.xword-vpc.id
    cidr_block = "10.0.2.0/24"
    availability_zone = "us-east-1c"

    tags = {
        Name = "xword-web-subnet"
    }
}

resource "aws_subnet" "xword-app-subnet" {
    vpc_id     = aws_vpc.xword-vpc.id
    cidr_block = "10.0.3.0/24"
    availability_zone = "us-east-1d"

    tags = {
        Name = "xword-app-subnet"
    }
}



output "xword-data-subnet1-id" {
  value = aws_subnet.xword-data-subnet1.id
}

output "xword-data-subnet2-id" {
  value = aws_subnet.xword-data-subnet2.id
}

output "xword-web-subnet-id" {
  value = aws_subnet.xword-web-subnet.id
}

output "xword-app-subnet-id" {
  value = aws_subnet.xword-app-subnet.id
}


output "xword-data-subnet1-cidr" {
  value = aws_subnet.xword-data-subnet1.cidr_block
}

output "xword-data-subnet2-cidr" {
  value = aws_subnet.xword-data-subnet2.cidr_block
}

output "xword-web-subnet-cidr" {
  value = aws_subnet.xword-web-subnet.cidr_block
}

output "xword-app-subnet-cidr" {
  value = aws_subnet.xword-app-subnet.cidr_block
}