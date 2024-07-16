// pages/api/beats.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('music_store');

    switch (req.method) {
      case 'GET':
        const allBeats = await db.collection('beats').find({}).toArray();
        res.status(200).json({ status: 200, data: allBeats });
        break;
      case 'POST':
        const bodyObject = JSON.parse(req.body);
        const result = await db.collection('beats').insertOne(bodyObject);
        res.status(201).json({ status: 201, data: result.ops[0] });
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
}
