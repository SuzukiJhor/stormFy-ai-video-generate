import { chatSession } from "@/configs/AIModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    const result = {text: 'The story begins with two determined Jiu-Jitsu practitioners ready to train.They engage in a fierce gripping battle, a crucial part of any match.A swift takedown showcases the technical skill and agility of the white gi fighter.The blue gi character, showing resilience, transitions to a defensive position.With a determined focus, the blue gi character initiates a submission attempt.The match culminates in a submission, showcasing the strategy and effectiveness of Jiu-Jitsu.The scene ends with mutual respect and sportsmanship, highlighting the values of the martial art.',
        id: 'ef6cb6af-08fd-4e63-9ae4-79c3f9b99af4'};
    return NextResponse.json({'result': result})
    // try {
    //     const { prompt } = await req.json();
    //     const result = await chatSession.sendMessage(prompt);
    //     return NextResponse.json({'result':JSON.parse(result.response.text())})
    // } catch(e) {
    //     return NextResponse.json({'Error': e})
    // }
}