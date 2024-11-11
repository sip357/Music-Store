import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

type ResponseData = {
  url: string;
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Parse the JSON body to retrieve the Title
    const { Title } = await req.json();

    if (!Title) {
      return NextResponse.json(
        { error: "Missing Title parameter" },
        { status: 400 }
      );
    }

    const client = new S3Client({ region: process.env.AWS_REGION });
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: `${Title}/tagged.wav`,
    });

    // Generate the public URL for the audio file
    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${Title}/tagged.wav`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error fetching image from S3:", error);
    return NextResponse.json(
      { error: "Error fetching image from S3" },
      { status: 500 }
    );
  }
}
