import { db } from "../../lib/db";
import { validateJWT } from "../../lib/auth";

export default async function deleter(req, res) {
    //console.log(`cookies: ${req.cookies}`);
    //console.log(`jwt1: ${req.cookies[process.env.COOKIE_NAME]}`);
    const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);
    //console.log(`jwt = ${req.cookies[process.env.COOKIE_NAME]}`);
    //const user = getUserFromCookie(cookies()) -> this doesn't work. Why?

    //console.log(`ownerid: ${user.id}`)
    //console.log(`name of project: ${req.body}`)
  
    await db.project.update({
        where: {
            ownerId_name_deleted: {
                name: req.body,
                ownerId: user.id,
                deleted: false,
            }
        },
        data: {
            deleted: true,
        },
        
    })
  
    res.json({ data: { message: "ok" } });
  }