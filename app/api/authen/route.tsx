import connect from '../../util/mongodb';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    // Connect to the database
    const client = await connect;
    
    const body = await request.json();
    
    // // Hash the password entered
    // const hashedPassword = await bcrypt.hash(body.password, 4);
    
    // Check if the email exists in the database
    const user = await client.db("music_store").collection("subscribers").findOne({ email: body.email });
    
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // Handle password checking logic here if needed
    const passwordMatches = await bcrypt.compare(body.password, user.password);

    if(passwordMatches){
      return new Response(JSON.stringify({ message: 'Successfully logged in' }), { status: 200 });
    }else{  
      return new Response(JSON.stringify({message: 'Invalid Password'}), {status: 403})
    }
  } catch (error) {
    console.error('Error handling request:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}