import fetch from 'node-fetch';
import { NextResponse } from "next/server";
import { supabase } from "@/configs/supabase";

const mockImagePayload =[
    {
      "scene_number": 1,
      "duration": 3,
      "imagePrompt": "goku",
      "contextText": "Did you know the sun is a star?"
    },
    {
      "scene_number": 2,
      "duration": 4,
      "imagePrompt": "naruto",
      "contextText": "Earth isn't the only planet; there are many others!"
    }
]
  
export async function POST(req) {
    try {
        // const { data: { result } } = await req.json();
        const result = mockImagePayload;
        console.log('IMAGE API - MOCK  ', mockImagePayload);
        // return NextResponse.json({ result: result });

        const width = 1024;
        const height = 1024;
        const seed = 42;
        const model = "flux";
        const imageBuffers = await Promise.all(
            result.map(async ({ imagePrompt }, index) => {
                const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(imagePrompt)}?width=${width}&height=${height}&seed=${seed}&model=${model}`;
                console.log(imageUrl)
                const response = await fetch(imageUrl);
                if (!response.ok) {
                    throw new Error(`Erro ao obter imagem: ${response.statusText}`);
                }
                return {
                    buffer: Buffer.from(await response.arrayBuffer()),
                    name: `image-${Date.now()}-${index}.png`,
                };
            })
        );
        const uploadPromises = imageBuffers.map(async (image) => {
            const filePath = `uploads/${image.name}`;
            const { data, error } = await supabase.storage.from("gallery").upload(filePath, image.buffer, {
                contentType: "image/png",
            });
            if (error) throw error;
            return supabase.storage.from("gallery").getPublicUrl(filePath).data.publicUrl;
        });

        const urls = await Promise.all(uploadPromises);
        return NextResponse.json({ urls });
    } catch (err) {
        console.error("Error generating image:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
