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


@app.route('/api/check', methods=['POST'])
def api_check_puzzle():
    """Check puzzle solution"""
    data = request.get_json()
    
    if not data or 'id' not in data or 'cert' not in data:
        return jsonify({"error": "Missing id or cert"}), 400
    
    puzzle_id = data['id']
    cert = data['cert']
    
    result, status_code = check_puzzle(puzzle_id, cert)
    return jsonify(result), status_code


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({"status": "healthy"}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000, debug=True)