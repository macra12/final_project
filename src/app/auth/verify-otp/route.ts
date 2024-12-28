import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { phone, otp } = await request.json();
    
    // Add your OTP verification logic here
    // Verify the OTP against your stored value
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid OTP' },
      { status: 400 }
    );
  }
}