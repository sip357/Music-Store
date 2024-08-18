import connect from '../../../util/mongodb'

const datab = 'userToken';
const coll = 'signUp';

export async function GET(request: Request, { params }) {
  try {
    const { email } = params;

    // if (!emailAddress) {
    //   return new Response(JSON.stringify({ error: 'Email address is required' }), {
    //     status: 400,
    //     headers: { 'Content-Type': 'application/json' },
    //   });
    // }

    const client = await connect;
    const token = await client.db(datab).collection(coll)
      .findOne({ email: email });

    if (!token) {
      return new Response(JSON.stringify({ error: 'Token not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Token exists. Delete it.', token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching token:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request: Request, {params}){
    try {
        const {email} = params;
        const client = await connect;
        const Token = await client.db(datab).collection(coll)
        .deleteOne({email: email})

        return new Response(JSON.stringify({Token, message: "Token has been deleted"}),{
            status: 200,
            headers: {'Content-Type': 'application/json'},
        })
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({error: 'Failed '}), {
            status: 500,
            headers: {'Content-Type': 'application/json'},
        });
    }
}

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