import connect from '../../util/mongodb';
import bcrypt from 'bcrypt';

export async function GET(request: Request) {
  try {
    const client = await connect;
    const cursor = client.db("music_store").collection("subscribers").find();
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
    const hashedPassword = await bcrypt.hash(body.password, 4);
    await client.db("music_store").collection("subscribers")
      .insertOne({ name: body.name, email: body.email, password: hashedPassword});
    return Response.json({ message: "Successfully signed up" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}