
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
    const sarvamRes = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.authorization || '',
        'api-subscription-key': (req.headers['api-subscription-key'] as string) || ''
      },
      body: JSON.stringify(req.body)
    });

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
