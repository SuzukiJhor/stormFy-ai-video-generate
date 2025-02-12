import { NextResponse } from "next/server";
import { db } from '@/configs/db'
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function GET(req) {
    try {
        const email = req.headers.get("User-Email");
        if (!email)
            return NextResponse.json({ error: "Email não fornecido." }, { status: 400 });
        const response = await db.select({ credits: Users.credits }).from(Users).where(eq(Users.email, email));
        if (!response || response.length === 0) {
            return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
          }
        const credits = response[0].credits;
        return NextResponse.json(credits, { status: 200 });
    } catch (error) {
        console.error('Erro ao buscar vídeos:', error);
        return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
    }
}