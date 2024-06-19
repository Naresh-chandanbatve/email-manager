resource "aws_instance" "test-instance" {
  ami           = "ami-0e1d06225679bc1c5"  # amazon linux
  instance_type = "t2.micro"
  # key_name      = "test"  # SSH key pair
  vpc_security_group_ids = [ aws_security_group.allow_all.id]
  subnet_id = aws_subnet.subnet.id

  user_data = <<-EOL
  #!/bin/bash 

  sudo yum update -y
  sudo yum install -y docker
  sudo service docker start
  sudo usermod -a -G docker ec2-user  

  sudo docker pull nareshchandanbatve/email-manager:latest
  sudo docker run -d -p 3000:3000 -e GOOGLE_CLIENT_ID=var.GOOGLE_CLIENT_ID -e GOOGLE_CLIENT_SECRET=var.GOOGLE_CLIENT_SECRET -e NEXTAUTH_SECRET=var.NEXTAUTH_SECRET -e NEXTAUTH_URL=var.NEXTAUTH_URL -e REDIRECT_URI=var.REDIRECT_URI -e REFRESH_TOKEN=var.REFRESH_TOKEN -e NEXT_PUBLIC_APP_DOMAIN=var.NEXT_PUBLIC_APP_DOMAIN nareshchandanbatve/email-manager:latest
  EOL
  
  tags = {
    Name = "test-server"
  }
}


resource "aws_vpc" "main" {
 cidr_block = "10.0.0.0/16"
 
 tags = {
   Name = "main"
 }
}

resource "aws_security_group" "allow_all" {
   name = "allow_all"
   description = "allow 3000 port ingres egress"
   vpc_id = aws_vpc.main.id
}

resource "aws_security_group_rule" "ingress_all" {
  type = "ingress"
  from_port = 0
  to_port = 0
  protocol = "-1"
  cidr_blocks = ["0.0.0.0/0"]
  security_group_id = aws_security_group.allow_all.id
}

resource "aws_security_group_rule" "egress_all" {
  type = "egress"
  from_port = 0
  to_port = 0
  protocol = "-1"
  cidr_blocks = ["0.0.0.0/0"]
  security_group_id = aws_security_group.allow_all.id
}


# subnet
resource "aws_subnet" "subnet" {
  vpc_id = aws_vpc.main.id
  cidr_block  = "10.0.1.0/24"
  availability_zone = "ap-south-1a"
  map_public_ip_on_launch = "true"

  tags = {
    name = "subnet"
  }
 }


 # internaet gateway
 resource "aws_internet_gateway" "gateway" {
  vpc_id = aws_vpc.main.id

  tags = {
    name = "gateway"
  }
 }


#route table

resource "aws_route_table" "route_table" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gateway.id
  }

  tags = {
    name = "route_table"
  }
}


# assosiation to subnet
resource "aws_route_table_association" "a" {
  subnet_id = aws_subnet.subnet.id
  route_table_id = aws_route_table.route_table.id
}
