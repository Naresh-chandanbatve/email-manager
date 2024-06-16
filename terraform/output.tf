output "public_ip_address" {
    value = aws_instance.test-instance.public_ip
}