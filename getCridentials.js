// /api/get-credentials.js
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const client = await connectToDatabase(process.env.MONGODB_URI);
    const db = client.db('credentialsDB');
    const collection = db.collection('credentials');

    const credentials = await collection.find().toArray();
    res.status(200).json(credentials);
  } catch (error) {
    console.error('Error fetching credentials:', error);
    res.status(500).json({ error: 'Database error' });
  }
}
