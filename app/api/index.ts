import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import ContainerEntry from '@/models/ContainerEntry';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const entries = await ContainerEntry.find();
      res.status(200).json(entries);
    } catch (error) {
      res.status(400).json({ error: 'Failed to fetch entries' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
