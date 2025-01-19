import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import ContainerEntry from '@/models/ContainerEntry';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("working"),
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const newEntry = await ContainerEntry.create(req.body);
      res.status(201).json(newEntry);
    } catch (error) {
      res.status(400).json({ error: 'Failed to add entry' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
