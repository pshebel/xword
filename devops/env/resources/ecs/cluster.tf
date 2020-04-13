resource "aws_ecs_cluster" "xword-ecs-cluster" {
    name = "${var.ecs-cluster-name}"
}