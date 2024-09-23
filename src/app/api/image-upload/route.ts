import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from 'cloudinary';

  // Configuration
  cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET  // Click 'View API Keys' above to copy your API secret
});

interface CoudinaryUploadResult {
    public_id: string;
   [key: string]: any;
}

