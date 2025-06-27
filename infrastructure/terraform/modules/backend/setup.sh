#!/bin/bash
sudo yum update -y

#Install Git
sudo yum install -y git unzip

#Install Golang
GOLANG_VERSION="1.24.4"
cd /tmp
curl -O https://go.dev/dl/go${GOLANG_VERSION}.linux-amd64.tar.gz
tar -C /usr/local -xzf go${GOLANG_VERSION}.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin