import { NextResponse } from "next/server";
import { db } from '@/configs/db'
import { VideoData } from "@/configs/schema";

export async function POST(req) {
    const { data, createdBy } = await req.json();
    return NextResponse.json({ error: "O campo 'data' está vazio." }, { status: 200 });
    // return NextResponse.json({ result: "data" });
    if (!data || Object.keys(data).length === 0)
        return NextResponse.json({ error: "O campo 'data' está vazio." }, { status: 400 });

    console.log(data, createdBy);
    await insertVideoData(data, createdBy);

    return NextResponse.json({ result: "data" });
}

async function insertVideoData(data, createdBy) {
    return await db.insert(VideoData).values({
        script: data.videoScript,
        audioFileUrl: data.audioScript,
        captions: data.captions,
        imageList: data.imageUrl,
        createdBy: createdBy,
    })
}