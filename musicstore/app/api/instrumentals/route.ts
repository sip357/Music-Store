import { NextRequest, NextResponse } from "next/server";
import { client } from "@/app/utils/mongo";
import { ObjectId } from "mongodb";

//Database and collection
const db = process.env.MUSIC_DB!;
const coll = process.env.BEATS_COLL!;

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Data to insert
    const dataToInsert = await req.json();

    // Insert the data into MongoDB collection
    await client.db(db).collection(coll).insertOne(dataToInsert);
    

    return NextResponse.json(
      { message: "Data inserted successfully"},
      { status: 200 }
    );
  } catch (error) {
    console.error("Insert failed:", error);

    return NextResponse.json(
      { error: "Could not insert data" },
      { status: 500 }
    );
  } finally {
    await client.close()
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    await client.connect();
    const collection = client.db(db).collection(coll);
    const lastId = req.nextUrl.searchParams.get("lastId"); // Retrieve the last fetched document's _id

    //query to fetch documents after the last fetched document
    const query = lastId ? { _id: { $gt: new ObjectId(lastId) } } : {};
    const data = await collection.find(query).limit(15).toArray(); // Apply the query and limit

    // Get the last document's _id for the next page
    const nextLastId = data.length > 0 ? data[data.length - 1]._id : null;

    return NextResponse.json({ status: 200, data, nextLastId });
  } catch (error) {
    console.error("Fetch failed: ", error);
    return NextResponse.json(
      { error: "Could not find collection or database", details: error },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
