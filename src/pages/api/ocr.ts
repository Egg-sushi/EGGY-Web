import type { NextApiRequest, NextApiResponse } from 'next';
import tesseract from 'node-tesseract-ocr';

type OCRRequestBody = {
  imageData: string;
};

type OCRResponseBody = {
  text: string;
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb', // Set desired value here
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<OCRResponseBody>) {
  if (req.method === 'POST') {
    const { imageData } = req.body as OCRRequestBody;
    const buffer = Buffer.from(imageData, 'base64');
    const result = await tesseract.recognize(buffer, {
      lang: 'eng',
      oem: 1,
      psm: 3,
    });
    res.status(200).json({ text: result.trim() });
  } else {
    res.status(405).end();
  }
}
