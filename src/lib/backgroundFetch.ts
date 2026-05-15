
/**
 * Executes a fetch request via the most reliable available channel:
 * 1. Chrome Extension (if available)
 * 2. Vercel Serverless Proxy (to bypass CORS)
 * 3. Direct Fetch (fallback)
 */
export async function backgroundFetch(url: string, options: any = {}): Promise<Response> {
  const isSarvam = url.includes('sarvam.ai');
  const isTTS = url.includes('text-to-speech');

  // 1. Chrome Extension (Direct or Relay)
  const isDirectExtension = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage;

  if (isDirectExtension) {
    try {
      return await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(
          { type: 'KREO_PROXY_REQUEST', url, options }, 
          (response) => {
            if (chrome.runtime.lastError || !response?.success) {
              resolve(tryVercelProxy(url, options, isSarvam, isTTS));
            } else {
              resolve(createResponseFromExtension(response));
            }
          }
        );
      });
    } catch (err) {
      return tryVercelProxy(url, options, isSarvam, isTTS);
    }
  }

  // 2. Window PostMessage Relay (if content script is present)
  try {
    const requestId = Math.random().toString(36).substr(2, 9);
    const extensionResponse = await new Promise<any>((resolve) => {
      const timeout = setTimeout(() => {
        window.removeEventListener("message", handleMessage);
        resolve(null);
      }, 1000);

      function handleMessage(event: MessageEvent) {
        if (event.data && event.data.source === "KREO_EXTENSION" && event.data.requestId === requestId) {
          clearTimeout(timeout);
          window.removeEventListener("message", handleMessage);
          resolve(event.data.response);
        }
      }
      window.addEventListener("message", handleMessage);
      window.postMessage({ source: "KREO_APP", type: "KREO_PROXY_REQUEST", requestId, url, options }, "*");
    });

    if (extensionResponse?.success) {
      return createResponseFromExtension(extensionResponse);
    }
  } catch (err) {
    // Ignore and proceed to proxy
  }

  // 3. Vercel Serverless Proxy (Most reliable for production)
  return tryVercelProxy(url, options, isSarvam, isTTS);
}

async function tryVercelProxy(url: string, options: any, isSarvam: boolean, isTTS: boolean): Promise<Response> {
  if (isSarvam) {
    try {
      const proxyUrl = `/api/sarvam-proxy${isTTS ? '?endpoint=tts' : ''}`;
      const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': options.headers?.['Authorization'] || options.headers?.['authorization'] || '',
          'api-subscription-key': options.headers?.['api-subscription-key'] || ''
        },
        body: options.body
      });
      if (response.ok) return response;
    } catch (err) {
      console.warn("Vercel Proxy failed, falling back to direct fetch:", err);
    }
  }

  // 4. Final Fallback: Direct Fetch (Likely to hit CORS in browser)
  return fetch(url, options);
}

function createResponseFromExtension(response: any): Response {
    let body = response.data;
    return new Response(
      typeof body === 'string' ? body : JSON.stringify(body),
      {
        status: response.status || 200,
        statusText: response.statusText || 'OK',
        headers: new Headers(response.headers || {})
      }
    );
}
