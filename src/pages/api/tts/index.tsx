import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const TestToSpeechGenerator = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case 'POST':
      try {
        const { plainText } = req.body;
        if(!plainText) res.status(400).json({ error: 'No text provided.' });
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL_GENERATOR!}/api/v1/tts`, { plainText });
        res.json({ url: data.url });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
      }
      break;

    default:
      res.status(500).json({ error: 'Method not allowed' });
      break;
  }
};

export default TestToSpeechGenerator;
