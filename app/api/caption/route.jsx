import { AssemblyAI } from 'assemblyai'
import { NextResponse } from "next/server";

export async function POST(req) {
    const data = [
        {
            "text": "The",
            "start": 160,
            "end": 272,
            "confidence": 0.99973,
            "speaker": null
        },
        {
            "text": "story",
            "start": 272,
            "end": 504,
            "confidence": 0.99995,
            "speaker": null
        },
        {
            "text": "begins",
            "start": 544,
            "end": 888,
            "confidence": 0.99808,
            "speaker": null
        },
        {
            "text": "with",
            "start": 904,
            "end": 1128,
            "confidence": 0.70565,
            "speaker": null
        },
        {
            "text": "two",
            "start": 1184,
            "end": 1400,
            "confidence": 0.99781,
            "speaker": null
        },
        {
            "text": "determined",
            "start": 1440,
            "end": 1976,
            "confidence": 0.6926,
            "speaker": null
        },
        {
            "text": "Jiu",
            "start": 2008,
            "end": 2168,
            "confidence": 0.76536,
            "speaker": null
        },
        {
            "text": "Jitsu",
            "start": 2184,
            "end": 2536,
            "confidence": 0.96414,
            "speaker": null
        },
        {
            "text": "practitioners",
            "start": 2568,
            "end": 3192,
            "confidence": 0.56189,
            "speaker": null
        },
        {
            "text": "ready",
            "start": 3256,
            "end": 3528,
            "confidence": 0.9999,
            "speaker": null
        },
        {
            "text": "to",
            "start": 3544,
            "end": 3672,
            "confidence": 0.99991,
            "speaker": null
        },
        {
            "text": "train.",
            "start": 3696,
            "end": 4280,
            "confidence": 0.60713,
            "speaker": null
        },
        {
            "text": "They",
            "start": 4440,
            "end": 4760,
            "confidence": 0.9996,
            "speaker": null
        },
        {
            "text": "engage",
            "start": 4800,
            "end": 5096,
            "confidence": 0.99979,
            "speaker": null
        },
        {
            "text": "in",
            "start": 5128,
            "end": 5272,
            "confidence": 0.99995,
            "speaker": null
        },
        {
            "text": "a",
            "start": 5296,
            "end": 5480,
            "confidence": 0.99916,
            "speaker": null
        },
        {
            "text": "fierce,",
            "start": 5520,
            "end": 5832,
            "confidence": 0.86667,
            "speaker": null
        },
        {
            "text": "gripping",
            "start": 5896,
            "end": 6296,
            "confidence": 0.9991,
            "speaker": null
        },
        {
            "text": "battle,",
            "start": 6328,
            "end": 6712,
            "confidence": 0.99981,
            "speaker": null
        },
        {
            "text": "a",
            "start": 6776,
            "end": 6904,
            "confidence": 0.99816,
            "speaker": null
        },
        {
            "text": "crucial",
            "start": 6912,
            "end": 7176,
            "confidence": 0.99987,
            "speaker": null
        },
        {
            "text": "part",
            "start": 7208,
            "end": 7352,
            "confidence": 0.99992,
            "speaker": null
        },
        {
            "text": "of",
            "start": 7376,
            "end": 7512,
            "confidence": 0.99978,
            "speaker": null
        },
        {
            "text": "any",
            "start": 7536,
            "end": 7672,
            "confidence": 0.99973,
            "speaker": null
        },
        {
            "text": "match.",
            "start": 7696,
            "end": 8260,
            "confidence": 0.99981,
            "speaker": null
        },
        {
            "text": "A",
            "start": 8640,
            "end": 8952,
            "confidence": 0.99938,
            "speaker": null
        },
        {
            "text": "swift",
            "start": 8976,
            "end": 9272,
            "confidence": 0.86664,
            "speaker": null
        },
        {
            "text": "takedown",
            "start": 9336,
            "end": 9832,
            "confidence": 0.99349,
            "speaker": null
        },
        {
            "text": "showcases",
            "start": 9896,
            "end": 10344,
            "confidence": 0.9998,
            "speaker": null
        },
        {
            "text": "the",
            "start": 10392,
            "end": 10552,
            "confidence": 0.99996,
            "speaker": null
        },
        {
            "text": "technical",
            "start": 10576,
            "end": 10984,
            "confidence": 0.99973,
            "speaker": null
        },
        {
            "text": "skill",
            "start": 11032,
            "end": 11256,
            "confidence": 0.99677,
            "speaker": null
        },
        {
            "text": "and",
            "start": 11288,
            "end": 11480,
            "confidence": 0.95768,
            "speaker": null
        },
        {
            "text": "agility",
            "start": 11520,
            "end": 11864,
            "confidence": 0.99995,
            "speaker": null
        },
        {
            "text": "of",
            "start": 11912,
            "end": 12024,
            "confidence": 0.9999,
            "speaker": null
        },
        {
            "text": "the",
            "start": 12032,
            "end": 12152,
            "confidence": 0.9995,
            "speaker": null
        },
        {
            "text": "White",
            "start": 12176,
            "end": 12408,
            "confidence": 0.99864,
            "speaker": null
        },
        {
            "text": "GI",
            "start": 12464,
            "end": 12744,
            "confidence": 0.48761,
            "speaker": null
        },
        {
            "text": "fighter.",
            "start": 12792,
            "end": 13192,
            "confidence": 0.99434,
            "speaker": null
        },
        {
            "text": "The",
            "start": 13256,
            "end": 13432,
            "confidence": 0.99961,
            "speaker": null
        },
        {
            "text": "Bluegi",
            "start": 13456,
            "end": 14024,
            "confidence": 0.48702,
            "speaker": null
        },
        {
            "text": "character,",
            "start": 14072,
            "end": 14472,
            "confidence": 0.99863,
            "speaker": null
        },
        {
            "text": "showing",
            "start": 14536,
            "end": 14856,
            "confidence": 0.99097,
            "speaker": null
        },
        {
            "text": "resilience,",
            "start": 14888,
            "end": 15400,
            "confidence": 0.99963,
            "speaker": null
        },
        {
            "text": "transitions",
            "start": 15480,
            "end": 16040,
            "confidence": 0.99996,
            "speaker": null
        },
        {
            "text": "to",
            "start": 16120,
            "end": 16312,
            "confidence": 0.99965,
            "speaker": null
        },
        {
            "text": "a",
            "start": 16336,
            "end": 16424,
            "confidence": 0.99957,
            "speaker": null
        },
        {
            "text": "defensive",
            "start": 16432,
            "end": 16872,
            "confidence": 0.99967,
            "speaker": null
        },
        {
            "text": "position",
            "start": 16936,
            "end": 17540,
            "confidence": 0.99948,
            "speaker": null
        },
        {
            "text": "with",
            "start": 17920,
            "end": 18232,
            "confidence": 0.99988,
            "speaker": null
        },
        {
            "text": "a",
            "start": 18256,
            "end": 18392,
            "confidence": 0.99951,
            "speaker": null
        },
        {
            "text": "determined",
            "start": 18416,
            "end": 18904,
            "confidence": 0.73198,
            "speaker": null
        },
        {
            "text": "focus.",
            "start": 18952,
            "end": 19256,
            "confidence": 0.99974,
            "speaker": null
        },
        {
            "text": "The",
            "start": 19328,
            "end": 19512,
            "confidence": 0.99972,
            "speaker": null
        },
        {
            "text": "Bluegi",
            "start": 19536,
            "end": 19976,
            "confidence": 0.31151,
            "speaker": null
        },
        {
            "text": "character",
            "start": 20008,
            "end": 20328,
            "confidence": 0.70528,
            "speaker": null
        },
        {
            "text": "initiates",
            "start": 20344,
            "end": 20728,
            "confidence": 0.99937,
            "speaker": null
        },
        {
            "text": "a",
            "start": 20744,
            "end": 20872,
            "confidence": 0.99968,
            "speaker": null
        },
        {
            "text": "submission",
            "start": 20896,
            "end": 21304,
            "confidence": 0.99991,
            "speaker": null
        },
        {
            "text": "attempt.",
            "start": 21352,
            "end": 22060,
            "confidence": 0.99981,
            "speaker": null
        },
        {
            "text": "The",
            "start": 22720,
            "end": 23032,
            "confidence": 0.99891,
            "speaker": null
        },
        {
            "text": "match",
            "start": 23056,
            "end": 23336,
            "confidence": 0.99977,
            "speaker": null
        },
        {
            "text": "culminates",
            "start": 23408,
            "end": 23944,
            "confidence": 0.6787,
            "speaker": null
        },
        {
            "text": "in",
            "start": 23992,
            "end": 24152,
            "confidence": 0.94652,
            "speaker": null
        },
        {
            "text": "a",
            "start": 24176,
            "end": 24312,
            "confidence": 0.99936,
            "speaker": null
        },
        {
            "text": "submission,",
            "start": 24336,
            "end": 24808,
            "confidence": 0.99362,
            "speaker": null
        },
        {
            "text": "showcasing",
            "start": 24904,
            "end": 25432,
            "confidence": 0.99982,
            "speaker": null
        },
        {
            "text": "the",
            "start": 25496,
            "end": 25672,
            "confidence": 0.99992,
            "speaker": null
        },
        {
            "text": "strategy",
            "start": 25696,
            "end": 26008,
            "confidence": 0.99964,
            "speaker": null
        },
        {
            "text": "and",
            "start": 26024,
            "end": 26200,
            "confidence": 0.9796,
            "speaker": null
        },
        {
            "text": "effectiveness",
            "start": 26240,
            "end": 26776,
            "confidence": 0.80802,
            "speaker": null
        },
        {
            "text": "of",
            "start": 26808,
            "end": 26952,
            "confidence": 0.99989,
            "speaker": null
        },
        {
            "text": "Jiu",
            "start": 26976,
            "end": 27176,
            "confidence": 0.9011,
            "speaker": null
        },
        {
            "text": "Jitsu.",
            "start": 27208,
            "end": 27900,
            "confidence": 0.98226,
            "speaker": null
        },
        {
            "text": "The",
            "start": 28040,
            "end": 28340,
            "confidence": 0.99936,
            "speaker": null
        },
        {
            "text": "scene",
            "start": 28380,
            "end": 28644,
            "confidence": 0.99989,
            "speaker": null
        },
        {
            "text": "ends",
            "start": 28692,
            "end": 28868,
            "confidence": 0.99988,
            "speaker": null
        },
        {
            "text": "with",
            "start": 28884,
            "end": 29060,
            "confidence": 0.99977,
            "speaker": null
        },
        {
            "text": "mutual",
            "start": 29100,
            "end": 29444,
            "confidence": 0.99967,
            "speaker": null
        },
        {
            "text": "respect",
            "start": 29492,
            "end": 29748,
            "confidence": 0.99998,
            "speaker": null
        },
        {
            "text": "and",
            "start": 29804,
            "end": 30068,
            "confidence": 0.93984,
            "speaker": null
        },
        {
            "text": "sportsmanship,",
            "start": 30124,
            "end": 31076,
            "confidence": 0.99949,
            "speaker": null
        },
        {
            "text": "highlighting",
            "start": 31188,
            "end": 31716,
            "confidence": 0.98056,
            "speaker": null
        },
        {
            "text": "the",
            "start": 31748,
            "end": 31892,
            "confidence": 0.99974,
            "speaker": null
        },
        {
            "text": "values",
            "start": 31916,
            "end": 32196,
            "confidence": 0.99882,
            "speaker": null
        },
        {
            "text": "of",
            "start": 32228,
            "end": 32324,
            "confidence": 0.99968,
            "speaker": null
        },
        {
            "text": "the",
            "start": 32332,
            "end": 32452,
            "confidence": 0.99365,
            "speaker": null
        },
        {
            "text": "martial",
            "start": 32476,
            "end": 32804,
            "confidence": 0.82,
            "speaker": null
        },
        {
            "text": "arts.",
            "start": 32852,
            "end": 33300,
            "confidence": 0.50061,
            "speaker": null
        }
    ]
    return NextResponse.json({ 'result': data })
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