import json
import boto3
import os
import psycopg2
import psycopg2.pool

db_pool = None


def get_db_credentials():
    """Get DB credentials from AWS Secrets Manager or environment variables"""
    secret_name = os.environ.get("DB_SECRET_NAME")
    if secret_name:
        # AWS Secrets Manager (for Lambda)
        client = boto3.client("secretsmanager")
        secret_value = client.get_secret_value(SecretId=secret_name)
        return json.loads(secret_value["SecretString"])
    else:
        # Environment variables (for Docker)
        return {
            "username": os.environ.get("PGUSER", "postgres"),
            "password": os.environ.get("PGPASSWORD", "postgres"),
            "host": os.environ.get("PGHOST", "localhost"),
            "port": os.environ.get("PGPORT", "5432"),
            "dbname": os.environ.get("PGDATABASE", "xword"),
        }


def init_connection_pool():
    """Initialize database connection pool"""
    global db_pool
    if db_pool:
        return db_pool

    # Use Secrets Manager if available, otherwise use env vars
    creds = get_db_credentials()

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
    """Execute a database query"""
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


def close_pool():
    """Close all connections in the pool"""
    global db_pool
    if db_pool:
        db_pool.closeall()
        db_pool = None