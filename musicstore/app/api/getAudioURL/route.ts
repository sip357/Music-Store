import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Search params for ID
    const beatId = req.nextUrl.searchParams.get("id");
    if (!beatId) {
      return NextResponse.json(
        { error: "Missing Id parameter" },
        { status: 400 }
      );
    }

    const client = new S3Client({ 
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
    
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: `${beatId}/tagged.wav`,
    });

    // Generate a signed URL (valid for 1 hour)
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error fetching audio URL from S3:", error);
    return NextResponse.json(
      { error: "Error fetching audio URL from S3" },
      { status: 500 }
    );
  }
}
