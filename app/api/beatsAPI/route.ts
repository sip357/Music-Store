import connect from '../../util/mongodb';

export async function GET(request: Request) {
  try {
    const client = await connect;
    const cursor = client.db("music_store").collection("beats").find();
    const array = await cursor.toArray();
    return Response.json(array);
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await connect;
    const body = await request.json();
    if (!body.Title || !body.BPM || !Array.isArray(body.Tags)) {
      throw new Error('Invalid input data');
    }
    await client.db("music_store").collection("beats")
      .insertOne({ Title: body.Title, BPM: body.BPM, Audio: body.BPM, Tags: body.Tags});
    console.log("Success");
    return Response.json({ message: "Successfully uploaded new beat!" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request){
  try {
    // Your logic here
    return Response.json({ message: 'Success' }),{status: 200};
  } catch (error) {
    console.error('Error handling request:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}