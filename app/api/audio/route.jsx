import { NextResponse } from "next/server";
import fs from 'fs';

export async function POST(req) {
  const { data } = await req.json();
  console.log('API - AUDIO', data);

  const url = 'https://api.play.ht/api/v2/tts/stream';
  // const url = process.env.NEXT_PUBLIC_PLAYHT_URL;

  const options = {
    method: 'POST',
    headers: {
      accept: 'audio/mpeg',
      'content-type': 'application/json',
      AUTHORIZATION: 'f3cc6d3be2ae4e93aff99c5254ac5953',
      'X-USER-ID': '7nUa9SZuEhVncBs25jrlu6xvDdn1'
    },
    body: JSON.stringify({
      voice: 's3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json',
      output_format: 'mp3',
      voice_engine: 'PlayDialog',
      text: data.text
    })
  };
  

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Erro ao obter áudio: ${response.statusText}`);
    }
    const audioData = await response.arrayBuffer();
    const audioBuffer = Buffer.from(audioData);
    fs.writeFileSync('audio.mp3', audioBuffer);
    return NextResponse.json({ Resultado: 'Sucesso' });

  } catch (error) {
    console.error('Erro ao gerar áudio:', error.message);
    return NextResponse.json({ error: 'Erro ao gerar áudio' }, { status: 500 });
  }
}