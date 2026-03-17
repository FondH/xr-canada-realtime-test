import { NextResponse } from 'next/server';
import { ProxyAgent } from 'undici';

const dispatcher = process.env.HTTPS_PROXY
    ? new ProxyAgent(process.env.HTTPS_PROXY)
    : undefined;

export async function POST() {
    try {
        if (!process.env.OPENAI_API_KEY){
            throw new Error(`OPENAI_API_KEY is not set`);

        }
        const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            // @ts-expect-error undici dispatcher not in standard fetch types
            dispatcher,
            body: JSON.stringify({
                model: "gpt-4o-realtime-preview-2024-12-17",
                voice: "alloy",
                modalities: ["audio", "text"],
                instructions:  process.env.XR_SYSTEM_PROMPT ?? "You are XR Voice, a helpful AI voice assistant by Xinrui. Greet the user warmly and answer their questions conversationally. Keep responses concise and natural for voice. You can speak in Chinese or English based on what the user uses.",
            }),
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${JSON.stringify(response)}`);
        }

        const data = await response.json();

        // Return the JSON response to the client
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching session data:", error);
        return NextResponse.json({ error: "Failed to fetch session data" }, { status: 500 });
    }
}