import { NextResponse } from 'next/server';

export async function GET() {
  // Redirect to the main page with a download trigger
  return NextResponse.redirect(new URL('/?download=true', process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'));
}
