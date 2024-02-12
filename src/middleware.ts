import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
const PUBLIC_FILE = /\.(.*)$/;
/*Note to self: jwtVerify does not compare if two strings are equal, rather it simply verifies that the user's jwt has been 
signed with the correct secret key (JWT_SECRET in this case). Although each jwt is unique, the secret key is the same for all
users that have been assigned a jwt by the same server.
Also, jwt's uniqueness is what allows the us to identify who is who (so that we can display user specific dashboards, etc)
*/
const verifyJWT = async (jwt) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );
  //console.log(jwt);
  return payload;
};

export default async function middleware(req, res) {
  const {pathname} = req.nextUrl

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/register") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const jwt = req.cookies.get(process.env.COOKIE_NAME)
  //console.log(jwt)

  if (!jwt) {
    req.nextUrl.pathname = '/signin'
    return NextResponse.redirect(req.nextUrl)
  }


  try {
    await verifyJWT(jwt.value)
    return NextResponse.next();
  } catch(e) {
    req.nextUrl.pathname = "/signin";
    return NextResponse.redirect(req.nextUrl);
  }
}