let queue = [];
let charCount = 0;
let gptPrompt = "please translate this into English, do not add anything like 'this is the translation' at the start. ";

async function logElementsWithAsianText(node) {
    const visibleElements = [
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "a",
      "span",
      "div",
      "li",
      "td",
      "strong",
      "em",
      "caption",
      "article",
      "blockquote",
      "cite",
      "code",
      "em",
      "i",
      "label",
      "pre",
      "q",
      "s",
      "small",
      "time",
      "u",
      "rb"
    ];
  
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      visibleElements.includes(node.tagName.toLowerCase())
    ) {
      const immediateTextNodes = Array.from(node.childNodes).filter(
        child => child.nodeType === Node.TEXT_NODE
      );
  
      for (const textNode of immediateTextNodes) {
        const textContent = textNode.textContent.trim();
        const cjkCharacters = textContent.match(/[\u4e00-\u9fa5\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7A3]/g);
        
        if (cjkCharacters) {
          queue.push(textNode);
          charCount += textContent.length;
          
          if (charCount >= 300) {
            await translateQueue();
          }
        }
      }
    }
  
    for (const childNode of node.childNodes) {
      await logElementsWithAsianText(childNode);
    }
}
  
async function translateQueue() {
  if (queue.length === 0) {
    return;
  }
  
  await new Promise(resolve => {
    setTimeout(resolve, 3000); // Delay between requests
  });

  try {
    const prompt = queue.map(node => node.textContent.trim()).join('\n');
    const response = await fetch("http://localhost:5000/revchatgpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: gptPrompt + prompt
      })
    });

    if (response.ok) {
      const data = await response.json();
      const translations = data.response.split('\n');
      for (let i = 0; i < queue.length; i++) {
        queue[i].textContent = translations[i];
      }
    } else {
      console.error("Error:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
  
  queue = [];
  charCount = 0;
}
  
async function processDocument() {
  console.log("Processing Document")
  await logElementsWithAsianText(document.body);
  await translateQueue(); // Ensure remaining elements in the queue are translated
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'processDocument') {
    console.log("clicked")
    processDocument();
  }
});
