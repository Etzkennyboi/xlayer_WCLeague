import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const client = new OpenAI({
            baseURL: 'https://integrate.api.nvidia.com/v1',
            apiKey: process.env.NVIDIA_API_KEY || 'dummy_key_for_build'
        });
        const body = await req.json();
        const { action, data } = body;

        if (action === 'predict_dive') {
            const { history } = data; // Array of strings e.g., ["top-left", "bottom-right"]
            
            const prompt = `You are an expert adaptive Goalkeeper AI for a penalty shootout game. 
            The player has shot in the following sequence so far: ${history.length ? history.join(', ') : 'No shots yet'}. 
            Predict the player's NEXT shot direction. 
            Choose exactly one of: "top-left", "top-right", "bottom-left", "bottom-right". 
            Output ONLY the direction. No reasoning, no other text.`;

            const completion = await client.chat.completions.create({
                model: 'deepseek-ai/deepseek-v3.2',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
                max_tokens: 10
            });

            let direction = completion.choices[0].message.content.trim().toLowerCase();
            // Fallback in case AI outputs something weird
            const valid = ["top-left", "top-right", "bottom-left", "bottom-right"];
            if (!valid.includes(direction)) {
                direction = valid[Math.floor(Math.random() * valid.length)];
            }
            
            return NextResponse.json({ prediction: direction });
        }

        if (action === 'generate_commentary') {
            const { history, score, won } = data; // history is array of "goal" or "save"
            
            const prompt = `You are a dramatic AI sports commentator for a high-stakes penalty shootout. 
            The player just finished their 5 shots. The sequence was: ${history.join(', ')}. 
            The final score is ${score} out of 5. 
            The player ${won ? 'won 1 USDT in Real Mode!' : 'lost and went home empty-handed.'} 
            Generate an exciting, short 2-paragraph play-by-play narrative of the shootout. Make it intense! Keep it concise.`;

            const completion = await client.chat.completions.create({
                model: 'deepseek-ai/deepseek-v3.2',
                messages: [{ role: 'user', content: prompt }],
                temperature: 1,
                top_p: 0.95,
                max_tokens: 1024,
                extra_body: { chat_template_kwargs: { thinking: true } }
            });

            return NextResponse.json({ 
                commentary: completion.choices[0].message.content.trim() 
            });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('AI Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
