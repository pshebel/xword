provider "aws" {
  region = "us-east-1"
}


module "web" {
  source                      = "../../resources/web"
  instance_type               = "t2.micro"
  key_name                    = "xword"
  associate_public_ip_address = true
  environment                 = "production"
}