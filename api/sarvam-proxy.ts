import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers for local development if needed
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, api-subscription-key'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { endpoint } = req.query;
  const targetUrl = endpoint === 'tts' 
    ? 'https://api.sarvam.ai/text-to-speech/stream'
    : 'https://api.sarvam.ai/v1/chat/completions';

  try {
    const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

    const apiKey = (req.headers['api-subscription-key'] as string) || '';
    const authHeader = (req.headers.authorization as string) || '';

    // Build headers — prefer api-subscription-key (Sarvam's native auth), fallback to Authorization
    const forwardHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (apiKey) forwardHeaders['api-subscription-key'] = apiKey;
    if (authHeader) forwardHeaders['Authorization'] = authHeader;

    if (!apiKey && !authHeader) {
      console.error('[Sarvam Proxy] No credentials provided in request headers');
      return res.status(401).json({ error: 'Missing Sarvam credentials. Provide api-subscription-key header.' });
    }

    const sarvamRes = await fetch(targetUrl, {
      method: 'POST',
      headers: forwardHeaders,
      body
    });

    if (!sarvamRes.ok) {
        const errorText = await sarvamRes.text();
        console.error(`[Sarvam Proxy Error] Status: ${sarvamRes.status}, Body: ${errorText}`);
        return res.status(sarvamRes.status).json({ error: 'Sarvam API Error', details: errorText });
    }

    const data = await sarvamRes.json().catch(() => null);
    
    // For TTS, it might be a stream/blob
    if (!data && endpoint === 'tts') {
        const buffer = await sarvamRes.arrayBuffer();
        res.setHeader('Content-Type', 'audio/mpeg');
        return res.send(Buffer.from(buffer));
    }

    res.status(sarvamRes.status).json(data);
  } catch (error: any) {
    console.error('[Sarvam Proxy Error]:', error);
    res.status(500).json({ error: error.message });
  }
}
