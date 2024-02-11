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
