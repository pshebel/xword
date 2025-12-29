############################
# GitHub OIDC Provider
############################
resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
  client_id_list = [
    "sts.amazonaws.com"
  ]
  thumbprint_list = [
    "6938fd4d98bab03faadb97b34396831e3780aea1"
  ]

  tags = {
    Name        = "GitHub Actions OIDC Provider"
    ManagedBy   = "Terraform"
    Environment = var.environment
  }
}

############################
# IAM Role for GitHub Actions
############################
data "aws_iam_policy_document" "github_oidc_trust" {
  statement {
    effect = "Allow"
    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }
    actions = [
      "sts:AssumeRoleWithWebIdentity"
    ]
    
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }
    
    # Use StringLike to allow any branch, tag, or environment from the repository
    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values = [
        "repo:${var.github_owner}/${var.github_repo}:*"
      ]
    }
  }
} 

resource "aws_iam_role" "github_actions" {
  name               = var.role_name
  assume_role_policy = data.aws_iam_policy_document.github_oidc_trust.json
  description        = "Role for GitHub Actions to deploy Lambda functions"
  max_session_duration = 3600

  tags = {
    Name        = var.role_name
    ManagedBy   = "Terraform"
    Environment = var.environment
  }
}

############################
# Permissions Policy
############################
data "aws_iam_policy_document" "github_actions_permissions" {
  # Lambda permissions
  statement {
    sid    = "LambdaDeployment"
    effect = "Allow"
    actions = [
      "lambda:GetFunction",
      "lambda:GetFunctionConfiguration",
      "lambda:UpdateFunctionCode",
      "lambda:UpdateFunctionConfiguration",
      "lambda:PublishVersion",
      "lambda:UpdateAlias",
      "lambda:GetAlias",
      "lambda:ListAliases",
      "lambda:ListVersionsByFunction"
    ]
    resources = [
      "arn:aws:lambda:${var.region}:${var.account_id}:function:${var.lambda_function_name}",
      "arn:aws:lambda:${var.region}:${var.account_id}:function:${var.lambda_function_name}:*"
    ]
  }

  # API Gateway permissions
  statement {
    sid    = "APIGatewayDeployment"
    effect = "Allow"
    actions = [
      "apigateway:POST",
      "apigateway:GET"
    ]
    resources = [
      "arn:aws:apigateway:${var.region}::/restapis/${var.api_gateway_id}/deployments",
      "arn:aws:apigateway:${var.region}::/restapis/${var.api_gateway_id}/stages/*"
    ]
  }

  # S3 (frontend)
  statement {
    actions = [
      "s3:ListBucket",
      "s3:GetBucketLocation"
    ]
    resources = ["arn:aws:s3:::${var.s3_bucket_name}"]
  }

  statement {
    actions = [
      "s3:PutObject",
      "s3:GetObject",
      "s3:DeleteObject"
    ]
    resources = ["arn:aws:s3:::${var.s3_bucket_name}/*"]
  }

  statement {
    actions   = ["cloudfront:ListDistributions"]
    resources = ["*"]
  }

  # 3. Permission to clear the cache
  statement {
    actions   = ["cloudfront:CreateInvalidation"]
    resources = ["*"] 
  }

  # CloudWatch Logs permissions (if needed for debugging)
  statement {
    sid    = "CloudWatchLogs"
    effect = "Allow"
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
      "logs:DescribeLogGroups",
      "logs:DescribeLogStreams"
    ]
    resources = [
      "arn:aws:logs:${var.region}:${var.account_id}:log-group:/aws/lambda/${var.lambda_function_name}:*"
    ]
  }

  # STS permissions for identity verification
  statement {
    sid    = "STSGetCallerIdentity"
    effect = "Allow"
    actions = [
      "sts:GetCallerIdentity"
    ]
    resources = ["*"]
  }
}


resource "aws_iam_policy" "github_actions" {
  name        = "${var.role_name}-policy"
  description = "Permissions for GitHub Actions to deploy Lambda functions"
  policy      = data.aws_iam_policy_document.github_actions_permissions.json

  tags = {
    Name        = "${var.role_name}-policy"
    ManagedBy   = "Terraform"
    Environment = var.environment
  }
}

resource "aws_iam_role_policy_attachment" "github_actions" {
  role       = aws_iam_role.github_actions.name
  policy_arn = aws_iam_policy.github_actions.arn
}
