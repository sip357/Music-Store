import connect from "../util/mongodb";

  export async function GET(request: Request) {
    // Connect the client to the server (optional starting in v4.7)
    const client = await connect
    // Send a ping to confirm a successful connection
    const cursor = client.db("music_store").collection("beats").find();
    const array = await cursor.toArray()
    return Response.json(array)
  }

  export async function POST(request: Request){
    const client = await connect;
    const body = await request.json();
    await client.db("music_store").collection("subscribers")
      .insertOne({name: body.name, email: body.email})
    return Response.json({message: "Successfully signed up!"});
  }