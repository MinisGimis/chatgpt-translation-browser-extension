async function logElementsWithChineseText(node) {
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
      "u"
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
        const chineseCharacters = textContent.match(/[\u4e00-\u9fa5]/g);
  
        if (chineseCharacters) {
          await new Promise(resolve => {
            setTimeout(resolve, 1000); // Delay between requests
          });
  
          try {
            const response = await fetch("http://localhost:5000/revchatgpt", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                prompt: "please translate this into English, do not add anything like 'this is the translation' at the start. " + textContent
              })
            });
  
            if (response.ok) {
              const data = await response.json();
              console.log(data.response);
              textNode.textContent = data.response
            } else {
              console.error("Error:", response.status);
            }
          } catch (error) {
            console.error("Error:", error);
          }
        }
      }
    }
  
    for (const childNode of node.childNodes) {
      await logElementsWithChineseText(childNode);
    }
  }
  
  async function processDocument() {
    await logElementsWithChineseText(document.body);
  }
  
  processDocument();
  