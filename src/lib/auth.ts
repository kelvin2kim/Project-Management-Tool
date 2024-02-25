import {db} from './db'
import bcrypt from 'bcrypt'
import {jwtVerify, SignJWT} from 'jose'

export function hashPassword(pwd) {
	return bcrypt.hash(pwd, 10)
}

export function comparePwd(plainText, hashed) {
	return bcrypt.compare(plainText, hashed)
}


export function createJWT(user) {
	const iat = Math.floor(Date.now() / 1000);
 	const exp = iat + 60 * 60 * 24 * 7;

  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
}
//When thinking about what validateJWT returns, think about what SignJWT returns, and what the payload is (includes user.id and user.email)
//And remember if u wanna access the jwt directly to use jwtVerify function, you can do so from the cookies (or req.cookies if inside api routing file)
export async function validateJWT(jwt) {
	const {payload} = await jwtVerify(
		jwt,
		new TextEncoder().encode(process.env.JWT_SECRET)
		)

  //console.log('hello')
	return payload.payload as any;
}

export async function getUserFromCookie(cookies) {
  const jwt = cookies.get(process.env.COOKIE_NAME);

  const { id } = await validateJWT(jwt.value);

  const user = await db.user.findUnique({
    where: {
      id: id as string,
    },
  });

  return user;
};
