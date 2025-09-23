import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(_req: Request) {
    try {
        const {userId}=await auth();
        const user=await prisma.user.findUnique({
            where:{id:userId ||""},
            include:{wishlist:true}
        })
        return NextResponse.json({wishlist:user?.wishlist || []})
    } catch (error) {
        return NextResponse.json({"Failed to fetch wishlist":error}, {status:500})
    }
}