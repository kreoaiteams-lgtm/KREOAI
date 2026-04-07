
import { createClient } from '@supabase/supabase-js';
import { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.VITE_SUPABASE_ANON_KEY;

const LINKEDIN_CLIENT_ID = "86xmiww1fqytmq";
const LINKEDIN_CLIENT_SECRET = "WPL_AP1.xJUG2N8enQaquVR5.ps/NfQ==";

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE!);

/**
 * LINKEDIN NEURAL HANDSHAKE
 * Swaps Authorization Code for Access Token securely.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') return res.status(405).send('Logic Failed: Method Not Allowed');

    const { code, redirect_uri } = req.body;
    if (!code) return res.status(400).send('Missing Authorization Code');

    try {
        console.log("Orchestrating LinkedIn Token Swap...");

        const oauthResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                client_id: LINKEDIN_CLIENT_ID,
                client_secret: LINKEDIN_CLIENT_SECRET,
                redirect_uri
            })
        });

        const tokenData = await oauthResponse.json();
        if (tokenData.error) throw new Error(tokenData.error_description || tokenData.error);

        const accessToken = tokenData.access_token;

        // Persist Auth to Cloud for Backend Orchestrator
        const { error: upsertError } = await supabase.from('social_manifest_auth').upsert({ 
            user_id: '00000000-0000-0000-0000-000000000000', // Private layer
            linkedin_token: accessToken,
            updated_at: new Date().toISOString()
        });

        if (upsertError) throw upsertError;

        console.log("Neural Handshake Successful: Access Token Secured.");
        return res.status(200).json({ status: 'success' });

    } catch (err: any) {
        console.error("Neural Handshake Collapse:", err);
        return res.status(500).json({ error: 'Auth Failed', details: err.message });
    }
}
