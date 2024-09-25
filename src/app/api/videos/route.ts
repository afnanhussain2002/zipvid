import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
console.log("prisma-----", prisma);
export async function GET(request: NextRequest) {

    try {
      const videos = await prisma.video.findMany({
            orderBy: {
                createdAt: "desc"
            }

        });
        console.log('videos', videos);
        return NextResponse.json(videos);
    } catch (error) {
        console.log(error,"Error from GET /api/video");
        return NextResponse.json({ error: "Error fetching videos" }, { status: 500 });
    }finally {
        await prisma.$disconnect();
    }
}