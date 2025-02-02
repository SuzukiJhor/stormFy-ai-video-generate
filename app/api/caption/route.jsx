import { AssemblyAI } from 'assemblyai'
import { NextResponse } from "next/server";

export async function POST(req) {
    const { data: { url, } } = await req.json();
    console.log('API - Caption', url);
    return NextResponse.json({ 'result': 'data' })
    try {
        const { data: { url, } } = await req.json();
        const client = new AssemblyAI({
            apiKey: process.env.CAPTION_ASSEMBLY_AI_API_KEY
        })
        const data = {
            audio_url: url
        }
        const transcript = await client.transcripts.transcribe(data)
        console.log(transcript.words)
        return NextResponse.json({ 'result': transcript.words })
    } catch (e) {
        return NextResponse.json({ 'Error': e })
    }
}