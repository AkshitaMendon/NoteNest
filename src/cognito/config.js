const config = {
  userPoolId: "us-east-1_6I1yUZs5E", // Replace with terraform output "cognito_user_pool_id"
  clientId: "2opt96ofs8pe21pop15qq60vta", // Replace with terraform output "cognito_user_pool_client_id"
  region: "us-east-1", // Matches terraform output "aws_region"
};

export default config;