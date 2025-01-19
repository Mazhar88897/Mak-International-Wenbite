import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import ContainerEntry from '@/models/ContainerEntry';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      await ContainerEntry.findByIdAndDelete(id);
      res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete entry' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
