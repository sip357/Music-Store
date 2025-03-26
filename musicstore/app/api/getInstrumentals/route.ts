import { NextRequest, NextResponse } from 'next/server';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

//Create a new DynamoDB client    
const dynamoDB = new DynamoDB({ 
  region: process.env.AWS_REGION!, 
  credentials: { accessKeyId: process.env.AWS_ACCESS_KEY!, 
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY! } 
});

// Function to fetch beats from DynamoDB
async function getBeats(LastEvaluatedId: string | null) {
  const params = {
    TableName: process.env.DYNAMODB_BEATS_TABLE!,
    Limit: 10, // Fetch 10 items
    ExclusiveStartKey: LastEvaluatedId
      ? { Id: { S: LastEvaluatedId } }
      : undefined,
  };

  const { Items } = await dynamoDB.scan(params);
  return Items || [];
}

// Function to generate pre-signed URLs for beats
async function getPresignedUrl(beatId: string) {
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

  return url;
}

export async function GET(req: NextRequest) {
  try {
    const lastId = req.nextUrl.searchParams.get("lastId"); // Retrieve the last fetched document's _id
    // Fetch 10 beats from DynamoDB
    const beats = await getBeats(lastId);

    // Generate pre-signed URLs for each beat
    const beatsWithUrls = await Promise.all(
      beats.map(async (beat) => ({
        ...beat,
        src: await getPresignedUrl(beat.Id.S as string),
      }))
    );
    const lastKey = beats.length > 0 ? beats[beats.length - 1].Id : null;

    return NextResponse.json({ status: 200, beatsWithUrls, lastKey });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to retrieve beats' }, { status: 500 });
  }
}
