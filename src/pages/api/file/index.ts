import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Error sending message' });
  }
}
