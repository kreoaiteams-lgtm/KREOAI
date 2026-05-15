
/**
 * Executes a fetch request via the Chrome Extension background script
 * to bypass CORS restrictions. Falls back to normal fetch if extension is not available.
 */
export async function backgroundFetch(url: string, options: any = {}): Promise<Response> {
  // 1. Direct Chrome Runtime (if running inside extension or externally_connectable)
  const isDirectExtension = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage;

  if (isDirectExtension) {
    try {
      return await new Promise((resolve, reject) => {
        const serializedOptions = {
          method: options.method || 'GET',
          headers: options.headers || {},
          body: options.body
        };

        chrome.runtime.sendMessage(
          { 
            type: 'KREO_PROXY_REQUEST', 
            url, 
            options: serializedOptions 
          }, 
          (response) => {
            if (chrome.runtime.lastError) {
              console.warn("Direct extension message failed, falling back to direct fetch:", chrome.runtime.lastError);
              resolve(fetch(url, options));
              return;
            }

            if (response && response.success) {
                resolve(createResponseFromExtension(response));
            } else {
                console.warn("Extension reported failure, falling back to direct fetch");
                resolve(fetch(url, options));
            }
          }
        );
      });
    } catch (err) {
      console.warn("Background fetch error, falling back:", err);
      return fetch(url, options);
    }
  }

  // 2. Window PostMessage Relay (if running in web page and content script is present)
  // This is a bit more complex as we need to wait for a message back
  try {
    const requestId = Math.random().toString(36).substr(2, 9);
    return await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        window.removeEventListener("message", handleMessage);
        resolve(fetch(url, options));
      }, 2000); // Wait 2s for extension response

      function handleMessage(event: MessageEvent) {
        if (event.data && event.data.source === "KREO_EXTENSION" && event.data.requestId === requestId) {
          clearTimeout(timeout);
          window.removeEventListener("message", handleMessage);
          
          if (event.data.response && event.data.response.success) {
            resolve(createResponseFromExtension(event.data.response));
          } else {
            resolve(fetch(url, options));
          }
        }
      }

      window.addEventListener("message", handleMessage);
      
      window.postMessage({
        source: "KREO_APP",
        type: "KREO_PROXY_REQUEST",
        requestId,
        url,
        options: {
            method: options.method || 'GET',
            headers: options.headers || {},
            body: options.body
        }
      }, "*");
    });
  } catch (err) {
    return fetch(url, options);
  }
}

function createResponseFromExtension(response: any): Response {
    let body = response.data;
    
    // If it's a data URL (from TTS), we might need to convert it back to a blob
    if (typeof body === 'string' && body.startsWith('data:')) {
        // We can just return the data URL string as the body, 
        // but for Response it's better to convert to blob if needed.
        // However, fetch() usually handles strings fine.
    }

    return new Response(
      typeof body === 'string' ? body : JSON.stringify(body),
      {
        status: response.status || 200,
        statusText: response.statusText || 'OK',
        headers: new Headers(response.headers || {})
      }
    );
}
