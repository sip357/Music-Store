import { ObjectId } from 'mongodb';
import connect from '../../../util/mongodb';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const client = await connect;
    const database = client.db("music_store");
    const collection = database.collection("beats");

    // Convert the string id to ObjectId
    const beatData = await collection.findOne({ _id: new ObjectId(id) });  

    if (!beatData) {
      return new Response(JSON.stringify({ error: 'Beat not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(beatData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
