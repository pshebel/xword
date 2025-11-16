import json
import api


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
        result, status_code = api.get_puzzle()
        return {
            'statusCode': status_code,
            'headers': cors_headers,
            'body': json.dumps(result)
        }

    # Handle POST /api/check
    elif http_method == 'POST':
        print("calling api_check_puzzle")
        try:
            body = json.loads(event.get("body", "{}"))
            puzzle_id = body.get("id")
            cert = body.get("cert")

            if not puzzle_id or cert is None:
                return {
                    'statusCode': 400,
                    'headers': cors_headers,
                    'body': json.dumps({"error": "Missing id or cert"})
                }

            result, status_code = api.check_puzzle(puzzle_id, cert)
            return {
                'statusCode': status_code,
                'headers': cors_headers,
                'body': json.dumps(result)
            }
        except Exception as e:
            print("Exception:", e)
            return {
                'statusCode': 500,
                'headers': cors_headers,
                'body': json.dumps({"error": str(e)})
            }

    # Unsupported method
    else:
        return {
            'statusCode': 405,
            'headers': cors_headers,
            'body': json.dumps({'message': 'Method not supported'})
        }