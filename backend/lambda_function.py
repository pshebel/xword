import json
from src.api.handlers import get_puzzle


def lambda_handler(event, context):  
    http_method = event['requestContext']['http']['method']
    path = event['requestContext']['http']['path']

    print(http_method, path)

    # CORS headers
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
    }

    # Handle OPTIONS (CORS preflight)
    if http_method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': ''
        }

    # Handle GET /api/puzzle
    if http_method == 'GET':
        result, status_code = get_puzzle()
        return {
            'statusCode': status_code,
            'headers': cors_headers,
            'body': json.dumps(result)
        }

    # Unsupported method
    else:
        return {
            'statusCode': 405,
            'headers': cors_headers,
            'body': json.dumps({'message': 'Method not supported'})
        }