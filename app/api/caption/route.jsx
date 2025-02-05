import { AssemblyAI } from 'assemblyai'
import { NextResponse } from "next/server";

const transcriptionData = [
    {
        word: "The",
        start: 160,
        end: 272,
        confidence: 0.99973
    },
    {
        word: "story",
        start: 272,
        end: 504,
        confidence: 0.99995
    },
    {
        word: "begins",
        start: 544,
        end: 888,
        confidence: 0.99808
    },
    {
        word: "with",
        start: 904,
        end: 1128,
        confidence: 0.70565
    },
    {
        word: "two",
        start: 1184,
        end: 1400,
        confidence: 0.99781
    },
    {
        word: "determined",
        start: 1440,
        end: 1976,
        confidence: 0.6926
    },
    {
        word: "Jiu",
        start: 2008,
        end: 2168,
        confidence: 0.76536
    },
    {
        word: "Jitsu",
        start: 2184,
        end: 2536,
        confidence: 0.96414
    },
    {
        word: "practitioners",
        start: 2568,
        end: 3192,
        confidence: 0.56189
    },
    {
        word: "ready",
        start: 3256,
        end: 3528,
        confidence: 0.9999
    },
    {
        word: "to",
        start: 3544,
        end: 3672,
        confidence: 0.99991
    },
    {
        word: "train.",
        start: 3696,
        end: 4280,
        confidence: 0.60713
    }
];

export async function POST(req) {
    try {
        const { data: { url, } } = await req.json();
        return NextResponse.json({ 'result': transcriptionData })

        const client = new AssemblyAI({
            apiKey: process.env.CAPTION_ASSEMBLY_AI_API_KEY
        })
        const data = {
            audio_url: url
        }
        const transcript = await client.transcripts.transcribe(data)
        console.log('Response API - Caption', transcript);
        return NextResponse.json({ 'result': transcript.words })
    } catch (e) {
        return NextResponse.json({ 'Error': e })
    }
}