import { chatSession } from "@/configs/AIModel";
import { NextResponse } from "next/server";

const videoScenes = {
    "video_scenes": [
      {
        "scene_number": 1,
        "duration": 3,
        "imagePrompt": "A brightly colored cartoon sun wearing oversized sunglasses and a wide, toothy grin, floating in a clear blue sky with fluffy white clouds. Cartoon style, vibrant colors, whimsical design.",
        "contextText": "Did you know the sun is a star?"
      },
      {
        "scene_number": 2,
        "duration": 4,
        "imagePrompt": "A cartoon earth with large, surprised eyes, wearing a small party hat, surrounded by cartoon planets with funny expressions. Cartoon style, cheerful, exaggerated features.",
        "contextText": "Earth isn't the only planet; there are many others!"
      },
      {
        "scene_number": 3,
        "duration": 5,
        "imagePrompt": "A group of cartoon penguins wearing tiny backpacks, marching in a single file line across an icy landscape with a goofy-looking polar bear waving from a distance. Cartoon style, playful, simple shapes.",
        "contextText": "Penguins can't fly, but they are fantastic swimmers."
      },
      {
        "scene_number": 4,
        "duration": 5,
        "imagePrompt": "A cartoon cat wearing a monocle and a top hat, holding a tiny book with a big magnifying glass, surrounded by stacks of colorful books. Cartoon style, humorous, detailed textures.",
        "contextText": "Cats have a special bone in their ears that helps them hear better than humans."
      },
      {
        "scene_number": 5,
        "duration": 5,
        "imagePrompt": "A cartoon giraffe with a long, wobbly neck, trying to tie a tiny bow tie on its neck, looking silly. Cartoon style, exaggerated proportions, lighthearted.",
        "contextText": "Giraffes have the longest necks, but they only have 7 vertebrae, just like humans."
      },
      {
        "scene_number": 6,
        "duration": 5,
        "imagePrompt": "A group of cartoon bees flying around a big, colorful flower, one of them wearing a tiny helmet and goggles. Cartoon style, bright, energetic design.",
        "contextText": "Bees do a special dance to tell their friends where to find the best flowers."
      },
      {
        "scene_number": 7,
        "duration": 3,
        "imagePrompt": "A group of different cartoon animals with wide eyes, looking up at a shooting star in a night sky with twinkling stars. Cartoon style, whimsical, magical.",
        "contextText": "The universe is full of amazing wonders!"
      }
    ]
  };
  
export async function POST(req) {
    try {
        const { data } = await req.json();
        // const result = await chatSession.sendMessage(data);
        return NextResponse.json({'result': videoScenes.video_scenes});
        // return NextResponse.json({'result':JSON.parse(result.response.text())});
    } catch(e) {
        return NextResponse.json({'Error': e})
    }
}