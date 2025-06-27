provider "aws" {
  region = var.region
}

# Security Group for API Host
resource "aws_security_group" "backend" {
  vpc_id      = var.vpc_id

  ingress {
    description = "API"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    security_groups = [var.alb_sg_id]
  }

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    security_groups = [var.bastion_sg_id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.name_prefix}-sg"
    Environment = var.environment
  }
}


resource "aws_lb_target_group" "backend" {
  name     = "api-tg"
  port     = 8080
  protocol = "HTTP"
  vpc_id   = var.vpc_id

  health_check {
    enabled             = true
    healthy_threshold   = 2
    interval            = 30
    matcher             = "200"
    path                = "/health"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
  }

  tags = {
    Name = "backend-target-group"
  }
}

resource "aws_lb_target_group_attachment" "backend" {
  target_group_arn = aws_lb_target_group.backend.arn
  target_id        = aws_instance.backend.id
  port             = 8080
}

resource "aws_lb_listener_rule" "http" {
  listener_arn = var.frontend_http_listener_arn
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend.arn
  }

  condition {
    path_pattern {
      values = ["/api/*"]
    }
  }
}

resource "aws_lb_listener_rule" "https" {
  listener_arn = var.frontend_https_listener_arn
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend.arn
  }

  condition {
    path_pattern {
      values = ["/api/*"]
    }
  }
}


resource "aws_ebs_volume" "backend" {
  availability_zone = "us-east-1a"
  size              = 40

  tags = {
    Name = "${var.name_prefix}-ebs-volume"
  }
}



resource "aws_instance" "backend" {
  ami                    = var.ami
  instance_type          = var.size
  key_name               = var.key_pair_name
  vpc_security_group_ids = [aws_security_group.backend.id]
  subnet_id              = var.subnet_id

  # user_data = "${file("setup.sh")}"

  tags = {
    Name        = var.name_prefix
    Environment = var.environment
  }
}

resource "aws_volume_attachment" "ebs_att" {
  device_name = "/dev/sdh"
  volume_id   = aws_ebs_volume.backend.id
  instance_id = aws_instance.backend.id
}