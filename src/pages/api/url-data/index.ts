import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { load } from 'cheerio';

const URLData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const url = new URL(req.query.url as string);

    console.log('URL', url)
    const response = await axios.get(url.toString());
    const html = response.data;
    const $ = load(html);
    const ogTitle = $('meta[property="og:title"]').attr('content') || $('title').text() || 'No Title';
    const ogDescription = $('meta[property="og:description"]').attr('content');
    const description = ogDescription || $('meta[name="description"]').attr('content') || 'No Description';
    const imageUrl = $('meta[property="og:image"]').attr('content') || 'No Image';
    res.status(200).json({
      success: 1,
      meta: {
        title: ogTitle,
        description,
      },
      image: {
        url: imageUrl,
      },
    });
  } catch (error) {
    res.status(400).json({ success: 0, error: error });
  }
}


export default URLData