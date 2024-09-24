import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { ClerkLoading } from "@clerk/nextjs";

// Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});
console.log('api keys------',   process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
   process.env.CLOUDINARY_API_KEY,
  process.env.CLOUDINARY_API_SECRET,);

interface CoudinaryUploadResult {
  public_id: string;
  [key: string]: any;
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    console.log('userId', userId);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    console.log('file---------',file);

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log("buffer------------", buffer);

    const result = await new Promise<CoudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "zipvid-image-uploads" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CoudinaryUploadResult);
          }
        );
        console.log("uploadStream----------", uploadStream);
        uploadStream.end(buffer);

      
      }
    );
    console.log("result------------", result);
    return NextResponse.json(
        {
          publicId: result.public_id,
        },
        { status: 201 }
      );
  } catch (error) {
    console.log("upload image failed", error);
    return NextResponse.json({ error: "upload image failed" }, { status: 501 });
  }
}
