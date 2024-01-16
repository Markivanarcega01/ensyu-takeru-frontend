import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './app/actions'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login'

  const token = request.cookies.get('token')?.value || ''
  // await verifyToken(token)

  if(isPublicPath && token){
    return NextResponse.redirect(new URL('/homepage',request.nextUrl))
  }
  if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login',request.nextUrl))
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/homepage',
    '/login',
    '/accounts',
    '/part-number',
  ],
}