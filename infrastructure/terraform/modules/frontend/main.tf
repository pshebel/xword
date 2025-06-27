provider "aws" {
  region = var.region
}

# Security Group for ui Host
resource "aws_security_group" "frontend" {
  vpc_id      = var.vpc_id

  ingress {
    description = "http"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    security_groups = [var.alb_sg_id]
  }

  ingress {
    description = "https"
    from_port   = 443
    to_port     = 443
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


# Target Groups
resource "aws_lb_target_group" "http" {
  name     = "${var.name_prefix}-http-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = var.vpc_id

  health_check {
    enabled             = true
    healthy_threshold   = 2
    interval            = 30
    matcher             = "200"
    path                = "/"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
  }

}
resource "aws_lb_target_group" "https" {
  name     = "${var.name_prefix}-https-tg"
  port     = 443
  protocol = "HTTPS"
  vpc_id   = var.vpc_id

  health_check {
    enabled             = true
    healthy_threshold   = 2
    interval            = 30
    matcher             = "200"
    path                = "/"
    port                = "traffic-port"
    protocol            = "HTTPS"
    timeout             = 5
    unhealthy_threshold = 2
  }

}

resource "aws_instance" "frontend" {
  ami                    = var.ami
  instance_type          = var.size
  key_name               = var.key_pair_name
  vpc_security_group_ids = [aws_security_group.frontend.id]
  subnet_id              = var.subnet_id

  # user_data = "${file("setup.sh")}"

  tags = {
    Name        = var.name_prefix
    Environment = var.environment
  }
}

# Target Group Attachments
resource "aws_lb_target_group_attachment" "http" {
  target_group_arn = aws_lb_target_group.http.arn
  target_id        = aws_instance.frontend.id
  port             = 80
}
resource "aws_lb_target_group_attachment" "https" {
  target_group_arn = aws_lb_target_group.https.arn
  target_id        = aws_instance.frontend.id
  port             = 443
}

# Load Balancer Listeners
resource "aws_lb_listener" "http" {
  load_balancer_arn = var.alb_arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.http.arn
  }
}


data "aws_acm_certificate" "cert" {
  filter {
    name   = "Domain name"
    values = ["xword.io"]
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = var.alb_arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = data.aws_acm_certificate.tossl.arn
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.https.arn
  }
}
