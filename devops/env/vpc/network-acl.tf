resource "aws_network_acl" "xword-vpc-network-acl" {
    vpc_id = aws_vpc.xword-vpc.id
    subnet_ids = ["${aws_subnet.xword-data-subnet1.id}", "${aws_subnet.xword-data-subnet2.id}", "${aws_subnet.xword-app-subnet.id}"]

    egress {
        protocol   = "-1"
        rule_no    = 100
        action     = "allow"
        cidr_block = "0.0.0.0/0"
        from_port  = 0
        to_port    = 0
    }

    ingress {
        protocol   = "-1"
        rule_no    = 100
        action     = "allow"
        cidr_block = "0.0.0.0/0"
        from_port  = 0
        to_port    = 0
    }

    tags = {
        Name = "xword-vpc-network-acl"
    }
}