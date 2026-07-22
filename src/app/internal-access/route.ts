import { type NextRequest, NextResponse } from 'next/server'

export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/', request.url))

  response.cookies.set('internal_user', 'true', {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
  response.headers.set('X-Robots-Tag', 'noindex, nofollow')

  return response
}
