import { db } from "../../lib/db";
import { getUserFromCookie, validateJWT } from "../../lib/auth";
import { cookies } from "next/headers";

export default async function deleter(req, res) {
    const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);
    console.log(`jwt = ${req.cookies[process.env.COOKIE_NAME]}`);
    //const user = getUserFromCookie(cookies()) -> this doesn't work. Why?
    
    await db.project.update({
        where: {
            ownerId_name: {
            name: req.body.name,
            ownerId: user.id,
            },
        },
        data: {
            deleted: true,
        },
    })
  
    res.json({ data: { message: "ok" } });
  }