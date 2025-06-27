#!/bin/sh

DB_PATH="/data/database.db"

# Create database file if it doesn't exist
mkdir -p /data
touch $DB_PATH

# Run all migration scripts in order
for f in /migrations/*.sql; do
  echo "Running $f..."
  sqlite3 $DB_PATH < "$f"
done

# Keep the container running
tail -f /dev/null

