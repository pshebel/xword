output "bastion_public_ip" {
  description = "Public IP address of the bastion host"
  value       = aws_instance.bastion.public_ip
}

output "bastion_sg_id" {
    description = "id of the bastion security group"
    value = aws_security_group.bastion.id
}