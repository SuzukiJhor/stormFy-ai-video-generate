import { NextResponse } from "next/server";
import * as PlayHT from 'playht';
import fs from 'fs';

export async function POST(req) {

    // await initializePlayHT();
    const { data } = await req.json();
    console.log('API - AUDIO', data);
    return NextResponse.json({Resultado: 'Success'})
}

async function initializePlayHT() {
    try {
        PlayHT.init({
          apiKey: process.env.NEXT_PUBLIC_PLAYHT_API_KEY,
          userId: process.env.NEXT_PUBLIC_PLAYHT_USER_ID,
        });
      } catch (error) {
        console.log("Falha ao inicializar PlayHT SDK", error.message);
    }
}

// async function streamAudio(text = '') {
//   const stream = await PlayHT.stream('All human wisdom is summed up in these two words: Wait and hope.', { voiceEngine: 'PlayDialog' });
//   stream.on('data', (chunk) => {
//     // Do whatever you want with the stream, you could save it to a file, stream it in realtime to the browser or app, or to a telephony system
//     fs.appendFileSync('output.mp3', chunk);
//   });
//   return stream;
// }