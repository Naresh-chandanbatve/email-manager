# aws keys
variable "aws-access-key" {
 description = "AWS Access key"
 type = string
 default = "your aws access key"
}

variable "aws-secret-key" {
 description = "aws secret key"   
 type = string
 default = "your aws secret key"
}


# application environment variables
variable "GOOGLE_CLIENT_ID" {
 description = "google client id"   
 type = string
 default = "your aws client id"
}

variable "GOOGLE_CLIENT_SECRET" {
 description = "google client secret"   
 type = string
 default = "your aws client secret"
}

variable "NEXTAUTH_SECRET" {
 description = "aws next auth secret"   
 type = string
 default = "your aws next auth secret"
}

variable "NEXTAUTH_URL" {
 description = "aws nextt auth url"   
 type = string
 default = "your aws Next auth url"
}

variable "REDIRECT_URI" {
 description = "redirect uri"   
 type = string
 default = "your ridirect uri"
}

variable "REFRESH_TOKEN" {
 description = "refresh token"   
 type = string
 default = "your refresh token"
}

variable "NEXT_PUBLIC_APP_DOMAIN" {
 description = "next public app domain"   
 type = string
 default = "your next public app domain"
}


