# resource "aws_ecs_task_definition" "xword-task-definition" {
#     family                = "xword-task-definition"
#     #container_definitions = "${file("./ecs/wordpress.json")}"
#     container_definitions = "${template_file.demo-template.rendered}"
#     volume {
#         name = "efs-wordpress-data"
#         host_path = "/mnt/efs/wordpress"
#     }
# }