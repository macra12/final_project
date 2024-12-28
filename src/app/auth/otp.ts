import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

const OTP_STORE: { [key: string]: string } = {}; // Replace with a database in production

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'POST') {
    const { phone } = req.body;
    const otp = crypto.randomInt(100000, 999999).toString();

    OTP_STORE[phone] = otp;
    console.log(`Sending OTP ${otp} to ${phone}`); // Replace with SMS API logic

    return res.status(200).json({ message: 'OTP sent successfully' });
  }

  if (method === 'PUT') {
    const { phone, otp } = req.body;
    if (OTP_STORE[phone] === otp) {
      delete OTP_STORE[phone]; // OTP is used, remove it
      return res.status(200).json({ message: 'OTP verified successfully' });
    }

    return res.status(401).json({ message: 'Invalid OTP' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
