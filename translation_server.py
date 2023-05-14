import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from revChatGPT.V1 import Chatbot

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize Chatbot with config
chatbot = Chatbot(config={
    "email": "",
    "password": "",
    "access_token": "",
    "paid": False
})

@app.route('/revchatgpt', methods=['POST'])
def revchatgpt():
    data = request.get_json(force=True)
    prompt = data['prompt']
    response = ""
    # Generate response using revChatGPT
    for data in chatbot.ask(
        prompt
    ):
        response = data["message"]
    print(response)
    
    # Create a JSON object
    json_response = {"response": response}
    
    # Return JSON response
    return json.dumps(json_response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
