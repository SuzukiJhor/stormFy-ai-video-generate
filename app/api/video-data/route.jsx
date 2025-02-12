import { NextResponse } from "next/server";
import { db } from '@/configs/db'
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";

const responseGet = {
    "videoScript": [
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
    ],
    "audioScript": "https://wzcdsrkdftxalfcstjqd.supabase.co/storage/v1/object/public/audio//ef6cb6af-08fd-4e63-9ae4-79c3f9b99af4.mp3",
    "imageUrl": [
        "https://wzcdsrkdftxalfcstjqd.supabase.co/storage/v1/object/public/gallery/uploads/image-1738477911393-0.png",
        "https://wzcdsrkdftxalfcstjqd.supabase.co/storage/v1/object/public/gallery/uploads/image-1738477913242-1.png"
    ],
    "captions": [
        {
            "word": "The",
            "start": 160,
            "end": 272,
            "confidence": 0.99973
        },
        {
            "word": "story",
            "start": 272,
            "end": 504,
            "confidence": 0.99995
        },
        {
            "word": "begins",
            "start": 544,
            "end": 888,
            "confidence": 0.99808
        },
        {
            "word": "with",
            "start": 904,
            "end": 1128,
            "confidence": 0.70565
        },
        {
            "word": "two",
            "start": 1184,
            "end": 1400,
            "confidence": 0.99781
        },
        {
            "word": "determined",
            "start": 1440,
            "end": 1976,
            "confidence": 0.6926
        },
        {
            "word": "Jiu",
            "start": 2008,
            "end": 2168,
            "confidence": 0.76536
        },
        {
            "word": "Jitsu",
            "start": 2184,
            "end": 2536,
            "confidence": 0.96414
        },
        {
            "word": "practitioners",
            "start": 2568,
            "end": 3192,
            "confidence": 0.56189
        },
        {
            "word": "ready",
            "start": 3256,
            "end": 3528,
            "confidence": 0.9999
        },
        {
            "word": "to",
            "start": 3544,
            "end": 3672,
            "confidence": 0.99991
        },
        {
            "word": "train.",
            "start": 3696,
            "end": 4280,
            "confidence": 0.60713
        }
    ]
}

export async function POST(req) {
    //MOCK
    // return NextResponse.json({ result: "data" });
    const { data } = await req.json();
    const { videoData, createdBy } = data;
    if (!data || Object.keys(data).length === 0)
        return NextResponse.json({ error: "O campo 'data' está vazio." }, { status: 400 });

    await insertVideoData(videoData, createdBy);
    return NextResponse.json({ result: "data" });
}

export async function GET(req) {
    try {
        const email = req.headers.get("User-Email");
        //Mock
        // return NextResponse.json(responseGet, { status: 200 });
        if (!email)
            return NextResponse.json({ error: "Email não fornecido." }, { status: 400 });
        const response = await db.select().from(VideoData).where(eq(VideoData.createdBy, email));
        return NextResponse.json(response, { status: 200 });
    } catch (err) {
        console.error('Erro ao buscar vídeos:', err);
        return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
    }
}

async function insertVideoData(videoInfo, createdBy) {
    return await db.insert(VideoData).values({
        script: videoInfo.videoScript.video_scenes,
        audioFileUrl: videoInfo.audioScript,
        captions: videoInfo.captions,
        imageList: videoInfo.imageUrl,
        title: videoInfo.title,
        description: videoInfo.description,
        createdBy: createdBy,
    })
}