import { db } from "../../lib/db";
import { validateJWT } from "../../lib/auth";
import { TASK_STATUS } from "@prisma/client";

export default async function deleter(req, res) {
    const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);
  
    await db.task.update({
        where: {
            id: req.body.id,
        },
        data: {
            deleted: true,
            status: TASK_STATUS.COMPLETED,
        },
        
    })
  
    res.json({ data: { message: "ok" } });
  }