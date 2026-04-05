
import { createClient } from '@supabase/supabase-js';

import { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.VITE_SUPABASE_ANON_KEY; // For simplicity in mock, normally SERVICE_ROLE in backend

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE!);

/**
 * ALWAYS-ON ETERNAL ORCHESTRATION LAYER
 * This function is triggered by Vercel Cron every 3 hours.
 * It Posts + Automatically Refills the queue for the next 24h cycle.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') return res.status(405).send('Logic Failed: Method Not Allowed');

    const isTest = req.query.test === 'true';

    try {
        console.log(`KREO Orchestration Pulse [${new Date().toISOString()}]: Syncing eternal manifestation layer...`);

        // 1. Fetch Auth (ESSENTIAL)
        const { data: auth, error: authError } = await supabase.from('social_manifest_auth').select('*').limit(1);
        if (authError || !auth || auth.length === 0) {
            console.error("Neural Link Offline: No LinkedIn token found for background orchestration.");
            return res.status(401).json({ status: 'failed', message: 'No authenticated neural link.' });
        }
        const token = auth[0].linkedin_token;

        // 2. Fetch the next scheduled manifestation
        let query = supabase
            .from('social_manifest_queue')
            .select('*')
            .eq('status', 'scheduled');
        
        if (!isTest) {
            query = query.lte('post_at', new Date().toISOString());
        }

        const { data: pending, error: fetchError } = await query
            .order('post_at', { ascending: true })
            .limit(1);

        if (fetchError) throw fetchError;

        // 3. Process Manifestation
        if (pending && pending.length > 0) {
            const post = pending[0];
            console.log(`Manifesting High-Fidelity Update: ${post.topic}`);

            // ACTUAL LINKEDIN REST API CALL (v2/posts)
            try {
                // First, we need the person's URN (Member ID)
                // In production, we'd cache this in the auth table
                const meResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const me = await meResponse.json();
                const personURN = `urn:li:person:${me.sub}`;

                const liResponse = await fetch('https://api.linkedin.com/v2/posts', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'X-Restli-Protocol-Version': '2.0.0',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        author: personURN,
                        commentary: post.content,
                        visibility: "PUBLIC",
                        distribution: {
                            feedDistribution: "MAIN_FEED",
                            targetEntities: [],
                            thirdPartyDistributionChannels: []
                        },
                        lifecycleState: "PUBLISHED",
                        isReshareDisabledByAuthor: false
                    })
                });

                if (!liResponse.ok) {
                    const liError = await liResponse.json();
                    console.error("LinkedIn API Error:", liError);
                    throw new Error(JSON.stringify(liError));
                }

                console.log(`MANIFESTED TO LINKEDIN: ${post.topic}`);
                await supabase.from('social_manifest_queue').update({ status: 'posted' }).eq('id', post.id);

            } catch (liErr: any) {
                console.error("LinkedIn Manifestation Collapse:", liErr);
                // Mark as failed so we don't keep trying the same one if it's an API error
                await supabase.from('social_manifest_queue').update({ status: 'failed' }).eq('id', post.id);
                return res.status(500).json({ error: 'LinkedIn API Failed', details: liErr?.message || 'Unknown Error' });
            }
        }

        // 3. AUTO-REFILL LOGIC: Keep the queue healthy for eternal 24/8
        const { count, error: countError } = await supabase
            .from('social_manifest_queue')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'scheduled');

        if (!countError && (count || 0) < 3) {
            console.log("Manifest Queue Low: Orchestrating the next 8-post cycle...");
            
            const pillars = [
                'Cinematic PPT Manifestation', 'Financial Excel Orchestration', 'Interactive PDF Structure', 
                'Live Web Research', 'Dither & Neural Waves', 'Rich Minimalist Design', 
                'Editorial Typography', 'Architectural AI Logic'
            ];

            const appLink = "https://kreoai.vercel.app";
            const templates = [
                `Built in a legendary 2-hour sprint, KREO is proof that you can have high-end results in seconds. Creating a professional {topic} shouldn't take days—it should take a click. \n\nStarting at only $1: ${appLink} \n#KREO #CleanDesign #LaunchFast`,
                `It’s 9:00 AM. The VC pitch is at 9:15 AM. You have nothing. KREO builds you a cinematic, high-end presentation for {topic} in under 60 seconds. \n\nGet it for $1: ${appLink}/promo4 \n#VC #PitchDeck #KREO`,
                `KREO's tools don't need external "middle-men". Our code uses AI internally to function, making it clean, fast, and 100% yours. Professional {topic} artifacts have never been this simple. \n\nBuilt in 2 hours. yours for $1: ${appLink} \n#AI #Creation #CleanCode`,
                `Turning 40 hours of analyst work into 40 seconds of clarity. KREO manifests clean, professional financial reports for {topic} that your boss will actually love. \n\nAbsolute precision for $1: ${appLink} \n#MRR #SaaS #Business`
            ];

            // Determine starting time (3h after the last scheduled post, or now)
            const { data: lastPost } = await supabase.from('social_manifest_queue').select('post_at').order('post_at', { ascending: false }).limit(1);
            let startTime = lastPost && lastPost[0] ? new Date(lastPost[0].post_at).getTime() : Date.now();

            const nextBatch = pillars.map((pillar, i) => {
                const template = templates[i % templates.length];
                const waitMs = (i + 1) * 10800000; // 3 hours
                return {
                    topic: pillar,
                    content: template.replace('{topic}', pillar),
                    post_at: new Date(startTime + waitMs).toISOString(),
                    status: 'scheduled'
                };
            });

            await supabase.from('social_manifest_queue').insert(nextBatch);
            console.log("Neural Reinforcements Manifested: Eternal queue is healthy.");
        }

        return res.status(200).json({ status: 'synchronized' });

    } catch (err) {
        console.error("Eternal Orchestration Failed:", err);
        return res.status(500).json({ error: 'Orchestration Collapse' });
    }
}
