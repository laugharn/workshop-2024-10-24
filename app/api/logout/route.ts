import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json(
    { isAuthenticated: false },
    { status: 200 }
  );

  // Delete the cookie instead of setting it with a negative maxAge
  response.cookies.delete('workshop_auth');

  return response;
}
