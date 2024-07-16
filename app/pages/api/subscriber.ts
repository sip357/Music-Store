// pages/api/subscribe.tsx
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }

    try {
      const client = await clientPromise;
      const db = client.db('your-database-name');
      const collection = db.collection('subscribers');

      const existingSubscriber = await collection.findOne({ email });
      if (existingSubscriber) {
        res.status(409).json({ error: 'Email already subscribed' });
        return;
      }

      await collection.insertOne({ email });
      res.status(201).json({ message: 'Subscribed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
