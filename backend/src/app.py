from flask import Flask, jsonify, request
from flask_cors import CORS
from src.api import get_puzzle, check_puzzle

app = Flask(__name__)
CORS(app)


@app.route('/api/puzzle', methods=['GET'])
def api_get_puzzle():
    """Get a random puzzle"""
    result, status_code = get_puzzle()
    return jsonify(result), status_code

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({"status": "healthy"}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000, debug=True)