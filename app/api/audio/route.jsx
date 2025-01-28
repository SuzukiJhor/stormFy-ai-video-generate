import { NextResponse } from "next/server";
import { supabase } from "@/configs/supabase";

const urlPlayHT = process.env.NEXT_PUBLIC_PLAYHT_URL;

export async function POST(req) {
  const { data } = await req.json();
  console.log('API - AUDIO', data);
  
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
    const response = await fetch(urlPlayHT, options);
    if (!response.ok) {
      throw new Error(`Erro ao obter áudio: ${response.statusText}`);
    }
    const audioData = await response.arrayBuffer();
    const audioBuffer = Buffer.from(audioData);

    const fileName = `${data.id}.mp3`;

    const { error: uploadError } = await supabase.storage
      .from('audio')
      .upload(fileName, audioBuffer, {
        contentType: "audio/mpeg",
        upsert: true,
      });

    if (uploadError) {
      throw new Error(`Erro ao fazer upload para o Supabase: ${uploadError.message}`);
    }

    const { data: publicUrl } = supabase.storage
      .from('audio')
      .getPublicUrl(fileName);

    return NextResponse.json({
      Resultado: "Áudio criado com sucesso",
      url: publicUrl.publicUrl,
    });
  } catch (error) {
    console.error('Erro ao gerar áudio:', error.message);
    return NextResponse.json({ error: 'Erro ao gerar áudio' }, { status: 500 });
  }
}