
console.log("[KREO Background] Proxy Service Worker Initialized");

// Listen for messages from content scripts or external pages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'KREO_PROXY_REQUEST') {
    handleSarvamRequest(message.url, message.options)
      .then(result => sendResponse(result))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep the message channel open for async response
  }
});

// Also support externally_connectable for direct communication from the web app
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
    if (message.type === 'KREO_PROXY_REQUEST') {
      handleSarvamRequest(message.url, message.options)
        .then(result => sendResponse(result))
        .catch(error => sendResponse({ success: false, error: error.message }));
      return true;
    }
});

async function handleSarvamRequest(url, options) {
  try {
    console.log(`[KREO Proxy] Fetching: ${url}`);
    
    // In background scripts, fetch is not restricted by CORS for host_permissions
    const response = await fetch(url, {
      method: options.method || 'POST',
      headers: options.headers || {},
      body: options.body
    });

    const isJson = response.headers.get('content-type')?.includes('application/json');
    let data;
    
    if (isJson) {
      data = await response.json();
    } else {
      // For TTS streams, we might need to send back base64 or arrayBuffer
      // But for now, let's try text/blob
      const blob = await response.blob();
      data = await blobToBase64(blob);
    }

    return {
      success: true,
      data: data,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    };
  } catch (error) {
    console.error("[KREO Proxy] Fetch Error:", error);
    return { success: false, error: error.message };
  }
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
