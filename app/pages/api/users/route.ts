import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongoose';
import User from '../../../model/subscribers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email } = req.body;

    if (!name) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }

    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }

    try {
      await clientPromise; // Ensure the client is connected

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(409).json({ error: 'Email already signed up' });
        return;
      }

      const newUser = new User({ name, email });
      await newUser.save();

      res.status(201).json({ message: 'Signed up successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
