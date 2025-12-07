import { prisma } from "@/src/app/[locale]/lib/prisma";
import bcrypt from "bcrypt";

export async function GET() {
    const users = await prisma.user.findMany();
    console.log(users);
    return Response.json(users)
}


export async function POST(request: Request) {
    try {
        const body = await request.json()

        if (body.password !== body.confirmPassword) {
            return new Response(JSON.stringify({ message: "Passwords do not match", status: 400 }), { status: 400 })
        } else {
            delete body.confirmPassword;
        }

        body.password = await bcrypt.hash(body.password, 10)

        await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password
            }
        })
        return new Response(JSON.stringify({ message: "User created successfully", status: 201 }), { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: "User not created", status: 500 }), { status: 500 })
    }
}