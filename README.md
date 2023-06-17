# chatgpt-translation-browser-extension
Translates Chinese, Japanese, and Korean text in browser to English using your chatgpt browser subscription.

## Server
1. Install Python and pip
2. run `pip install flask flask_cors revChatGPT` 
3. Modify the Chatbot config in translation_server.py, fill in either email & password or use your access token (https://chat.openai.com/api/auth/session). Put paid as true if you have premium subscription.
4. Run translation_server.py

## Browser Extension (Chrome)
1. go to chrome://extensions
2. Click on "Load unpacked"
3. Select the `Minis Translate Extension` directory
4. Click once on extension to translate text on current page. 

#### Change `gptPrompt` variable in content.js for customized prompt.

