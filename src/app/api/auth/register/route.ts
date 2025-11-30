import { prisma } from "@/src/app/lib/prisma";


export async function GET() {
    const users = await prisma.user.findMany();
    console.log(users);
    return new Response("Hello")
}


export async function POST() {
    return new Response("Hello")
}