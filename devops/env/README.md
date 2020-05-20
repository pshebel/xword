// tagging image
sudo docker-compose -f xword/ui/docker/docker-compose.yml build --no-cache
docker tag xword-ui:latest 432883629663.dkr.ecr.us-east-1.amazonaws.com/xword-ui
$(aws ecr get-login --no-include-email --region us-east-1)
docker push 432883629663.dkr.ecr.us-east-1.amazonaws.com/xword-ui

sudo docker-compose -f xword/api/docker/docker-compose.yml build --no-cache
docker tag xword-api:latest 432883629663.dkr.ecr.us-east-1.amazonaws.com/xword-api
$(aws ecr get-login --no-include-email --region us-east-1)
docker push 432883629663.dkr.ecr.us-east-1.amazonaws.com/xword-api


// pull docker imagess


docker run -d -p 8000:8000 --network="xword" --restart=always -e MARIA_HOST=${MARIA_HOST} -e MARIA_DB=${MARIA_DB} -e MARIA_USER=${MARIA_USER} -e MARIA_PW=${MARIA_PW} 432883629663.dkr.ecr.us-east-1.amazonaws.com/xword-api:latest


docker run -d -p 80:80 --network="xword" --restart=always  -e API_HOST=${API_HOST} 432883629663.dkr.ecr.us-east-1.amazonaws.com/xword-ui:latest



// install
Mysql
Docker
aws cli

// stand up

// Run terraform
// Update rds password
mysql -h <db host> -P 3306 -u admin -p 
// update admin password
ALTER USER  'admin' IDENTIFIED BY 'test';
// create api user
CREATE USER 'xword_writer'@'%' IDENTIFIED BY 'password';
GRANT SELECT, INSERT, UPDATE, DELETE ON xword.* to 'xword_writer'@'%';
flush privileges;
// run sql scripts



// set up docker
// To install the community edition, add the GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
// Add the docker repository
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

sudo apt-get update
// To make sure, you're going to install docker from Docker repo,
apt-cache policy docker-ce
// Now install docker,
sudo apt-get install -y docker-ce
// It would be running by default, but you can check the status
sudo systemctl status docker


sudo chmod 777 /var/run/docker.sock
docker network create xword


// set up docker on amazon linux
sudo yum install docker
sudo groupadd docker
sudo usermod -aG docker ec2-user
// logout and back in
service docker start
docker network create xword

sudo groupadd docker

sudo usermod -aG docker jenkins