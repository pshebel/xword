import json
import boto3
import os
import psycopg2
import psycopg2.pool

db_pool = None

def get_db_credentials(secret_name: str):
    client = boto3.client("secretsmanager")
    secret_value = client.get_secret_value(SecretId=secret_name)
    return json.loads(secret_value["SecretString"])


def init_connection_pool():
    global db_pool
    if db_pool:
        return db_pool

    creds = get_db_credentials(os.environ["DB_SECRET_NAME"])

    db_pool = psycopg2.pool.SimpleConnectionPool(
        minconn=1,
        maxconn=5,
        user=creds["username"],
        password=creds["password"],
        host=creds["host"],
        port=creds["port"],
        database=creds["dbname"],
    )
    return db_pool


def run_query(sql, params=None, fetch=False):
    pool = init_connection_pool()
    conn = pool.getconn()

    try:
        with conn.cursor() as cur:
            cur.execute(sql, params)
            if fetch:
                return cur.fetchall()
            conn.commit()
    finally:
        pool.putconn(conn)

def api_get_puzzle():
    try:
        # SELECT a random puzzle
        row = run_query(
            "SELECT id, size FROM puzzles ORDER BY RANDOM() LIMIT 1;",
            fetch=True
        )

        if not row:
            return {"statusCode": 404, "body": json.dumps({"error": "No puzzle found"})}

        puzzle_id, size = row[0]

        # FULL SQL identical to Go version
        query = """
            WITH random_prompt AS (
                SELECT id AS prompt_id
                FROM prompts
                ORDER BY RANDOM()
                LIMIT 1
            )
            SELECT
                pdw.text AS padded_word_text,
                c.text AS clue_text,
                pw.across,
                pw.idx
            FROM puzzle_words pw
            JOIN puzzles p ON p.id = %s
            JOIN padded_words pdw ON pdw.id = pw.padded_word_id
            JOIN words w ON w.id = pdw.word_id
            JOIN random_prompt rp ON TRUE
            JOIN clues c ON c.word_id = w.id AND c.prompt_id = rp.prompt_id
            WHERE pw.puzzle_id = p.id
            ORDER BY pw.idx;
        """

        rows = run_query(query, params=(puzzle_id,), fetch=True)

        block = []
        clues = []

        for padded_word_text, clue_text, across, idx in rows:
            # Build Clue object
            clues.append({
                "text": clue_text,
                "across": across,
                "index": idx
            })

            # Build block array (same logic as Go)
            if across:
                for i, ch in enumerate(padded_word_text):
                    if ch == "*":
                        block.append(idx * size + i)

        result = {
            "id": puzzle_id,
            "size": size,
            "block": block,
            "clues": clues
        }

        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "GET"
            },
            "body": json.dumps(result)
        }

    except Exception as e:
        return {"statusCode": 500, "body": json.dumps({"error": str(e)})}


# ============================================================
#  /api/check
# ============================================================
def api_check_puzzle(event):

    try:
        body = json.loads(event["body"])
        puzzle_id = body["id"]
        cert = body["cert"]  # array index → string guess

        # SQL identical to Go
        query = """
            SELECT cert
            FROM puzzles
            WHERE id = %s;
        """

        row = run_query(query, params=(puzzle_id,), fetch=True)

        success = row == cert

        result = {
            "id": puzzle_id,
            "success": success,
        }

        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "POST"
            },
            "body": json.dumps(result)
        }

    except Exception as e:
        print("Exception ",e)
        return {"statusCode": 500, "body": json.dumps({"error": str(e)})}


def lambda_handler(event, context):
    print(event)
    
    http_method = event['requestContext']['http']['method']
    path = event['requestContext']['http']['path']

    print(http_method, path)

    if http_method == 'GET':
        resp = api_get_puzzle()
        print(resp)
        return resp
    elif http_method == 'POST':
        print("calling api_check_puzzle")
        return api_check_puzzle(event)
    elif http_method == 'OPTIONS':
        # CORS preflight
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
            },
            'body': ''
        }
    else:
        response_body = {'message': 'Method not supported'}
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(response_body)
    }