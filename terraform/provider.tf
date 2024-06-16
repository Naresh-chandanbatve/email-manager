terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "5.31.0"
    }
  }
}

provider "aws" {
  region = "ap-south-1"  # Set the AWS region
  # profile = "test"      # AWS profile 
  access_key = var.aws-access-key
  secret_key = var.aws-secret-key
}
