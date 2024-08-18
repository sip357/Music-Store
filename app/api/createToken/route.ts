import connect from '../../util/mongodb'

const datab = 'userToken';
const coll = 'signUp';

export async function POST(request: Request) {
    try {
        const client = await connect;
        const body = await request.json();
        if (!body.email || !body.token || !body.expires) {
          throw new Error('Invalid input data');
        }
        await client.db(datab).collection(coll)
          .insertOne({ email: body.email, token: body.token, expires: body.expires});
        console.log("Success");
  
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Failed to send magic link' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }