
const SARVAM_API_KEY = "sk_pd0jziip_HNsimctXQkcPjiVMBWYLpyzQ";
const SARVAM_TTS_URL = "https://api.sarvam.ai/text-to-speech/stream";

export interface SarvamTTSOptions {
    text: string;
    languageCode?: string;
    speaker?: string;
    model?: string;
    pace?: number;
}

export const sarvamAI = {
    /**
     * Streams TTS audio from Sarvam AI
     */
    async streamTTS(options: SarvamTTSOptions): Promise<HTMLAudioElement | void> {
        try {
            const response = await fetch(SARVAM_TTS_URL, {
                method: "POST",
                headers: {
                    "api-subscription-key": SARVAM_API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: options.text,
                    target_language_code: options.languageCode || "hi-IN",
                    speaker: options.speaker || "shubh",
                    model: options.model || "bulbul:v3",
                    pace: options.pace || 1.1,
                    speech_sample_rate: 22050,
                    output_audio_codec: "mp3",
                    enable_preprocessing: true
                })
            });

            if (!response.ok) {
                throw new Error(`Sarvam TTS Error: ${response.status}`);
            }

            // Using Blob approach for React compatibility and simpler state management
            const chunks = [];
            const reader = response.body?.getReader();
            if (!reader) return;

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                chunks.push(value);
            }

            const blob = new Blob(chunks, { type: "audio/mpeg" });
            const audio = new Audio(URL.createObjectURL(blob));
            return audio;
        } catch (error) {
            console.error("Sarvam TTS Integration Failed:", error);
        }
    },

    /**
     * Generates "irresistible" social media post content using the KREO Creation Engine
     */
    async generateIrresistiblePost(topic: string, goal: string = "high-engagement") {
        const appLink = "https://kreoai.vercel.app";
        const templates = [
            `Built in a legendary 2-hour sprint, KREO is proof that you can have high-end results in seconds. Creating a professional ${topic} shouldn't take days—it should take a click. \n\nStarting at only $1: ${appLink} \n#KREO #CleanDesign #LaunchFast`,
            
            `It’s 9:00 AM. The VC pitch is at 9:15 AM. You have nothing. \n\nKREO builds you a cinematic, high-end presentation for ${topic} in under 60 seconds. No dragging boxes around—just results. \n\nGet it for $1: ${appLink}/promo4 \n#VC #PitchDeck #KREO`,
            
            `KREO's tools don't need external "middle-men" to work. Our code actually uses AI internally to function, making it clean, fast, and 100% yours. Professional ${topic} artifacts have never been this simple. \n\nBuilt in 2 hours. Yours for $1: ${appLink} \n#AI #Creation #CleanCode`,
            
            `Turning 40 hours of analyst work into 40 seconds of clarity. KREO builds clean, professional financial reports for ${topic} that your boss will actually love. \n\nAbsolute precision for $1: ${appLink} \n#MRR #SaaS #Business`,
            
            `Need to research ${topic} right now? KREO does live web research, finds the latest competitors, and builds a clean summary in seconds. No more endless Googling. \n\nResearch for $1: ${appLink} \n#WebResearch #CompetitorAnalysis #Tech`,
            
            `Turning a 50-page textbook chapter into a 1-page cheat sheet? KREO understands the logic of ${topic} and builds you a professional summary that actually makes sense. \n\nStudy smarter for $1: ${appLink} \n#Education #StudentLife #KREO`,
            
            `In a professional crisis, KREO is your secret weapon. From last-minute board reports to urgent campaign landing pages, it builds ${topic} with a clean, high-end look. \n\nManifest for $1: ${appLink} \n#Leadership #HighFidelity #KREO`,
            
            `High-end results shouldn't cost high-end prices. KREO is only $1 because we want everyone to have the power to create professional ${topic} artifacts in seconds. \n\nJoin the evolution for $1: ${appLink} \n#CleanDesign #Editorial #KREO`
        ];

        const selected = templates[Math.floor(Math.random() * templates.length)];
        
        return {
            content: selected,
            mediaPrompt: `A cinematic manifestation of ${topic} with cobalt blue accents and clean architectural balance.`
        };
    }
};
