import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

// Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

interface CoudinaryUploadResult {
  public_id: string;
  bytes:number;
  duration?:number;
  [key: string]: any;
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const originalSize = formData.get("originalSize") as string;



    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CoudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { 
            resource_type:"video",
            folder: "zipvid-video-uploads",
            transformation:[
                {quality:"auto", fetch_format:"mp4"}
            ]

          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CoudinaryUploadResult);
          }
        );
        uploadStream.end(buffer);
      }
    );
    
  } catch (error) {
    console.log("upload image failed", error);
    return NextResponse.json({ error: "upload image failed" }, { status: 501 });
  }
}
