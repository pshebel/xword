#!/bin/bash
sudo yum update -y

#Install Git
sudo yum install -y git unzip

# Install Terraform
TERRAFORM_VERSION="1.12.2"
cd /tmp
curl -O https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip
unzip terraform_${TERRAFORM_VERSION}_linux_amd64.zip
sudo mv terraform /usr/local/bin/

# Install awscli
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# # Install Cron
# sudo yum install cron
# sudo systemctl enable cron

# /etc/crontab << 
# * 9 * * 1-5 terraform init && terraform apply -y 
# * 17 * * 1-5 terraform destroy -y