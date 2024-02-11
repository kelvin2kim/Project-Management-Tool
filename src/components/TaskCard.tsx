import { getUserFromCookie } from "../lib/auth";
import { db } from "../lib/db";
import { cookies } from "next/headers";
import Button from "./Button";
import Card from "./Card";
import { TASK_STATUS } from "@prisma/client";


const getData = async () => {
    const user = await getUserFromCookie(cookies());
    
    const fiveTasks = await db.task.findMany({
        where: {
            ownerId: user.id,
            NOT: {
                status: TASK_STATUS.COMPLETED,
                deleted: false,
            }
        },
        take: 5,
        orderBy: {
            due: 'asc'
        }
    })

    return fiveTasks;
}

export default async function TaskCard({tasks, title}) {
    const data = tasks || await getData();

    return (
        <Card>
            <div className="flex justify-between items-center">
                <div>
                <span className="text-3xl text-gray-600">{title}</span>
                </div>
                <div>
                <Button intent="text" className="text-violet-600">
                    + Create New
                </Button>
                </div>
            </div>
            <div>
                {data && data.length ? (
                <div>
                    {data.map((task) => (
                    <div className="py-2 ">
                        <div>
                        <span className="text-gray-800">{task.name}</span>
                        </div>
                        <div>
                        <span className="text-gray-400 text-sm">
                            {task.description}
                        </span>
                        </div>
                    </div>
                    ))}
                </div>
                ) : (
                    <h4 className="text-xl text-gray-400">
                        <div>No Tasks</div>
                    </h4>
                )}
            </div>
        </Card>
    )
}