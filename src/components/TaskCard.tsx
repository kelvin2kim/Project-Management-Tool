import { getUserFromCookie } from "../lib/auth";
import { db } from "../lib/db";
import { cookies } from "next/headers";
import Button from "./Button";
import Card from "./Card";
import { TASK_STATUS } from "@prisma/client";
import CreateTaskButton from "./CreateTaskButton";


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
//if the value of id is undefined, then for prisma is query essentially becomes "where: {ownerId: user.id}"; it ignores the id field
//but hey, it works for my use case
//Remember that the create new task button the home page just puts the task in, and you're not specifing what project the task belongs to
//If you want to put a task into a specific project, you have to go to the project page and create the task there
//If u just make a new task in the home page it will just put the task into the first project in the database list
const getData2 = async (id) => {
    const user = await getUserFromCookie(cookies());
    
    const project = await db.project.findFirst({
        where: {
            id: id,
            ownerId: user.id,
        },
        include: {
            tasks: true,
        }
    })
    return project;
  }

export default async function TaskCard({tasks, title, params}) {
    const project = await getData2(params);
    console.log(`params: ${params}`)
    const data = tasks || await getData();

    return (
        <Card>
            <div className="flex justify-between items-center">
                <div>
                <span className="text-3xl text-gray-600">{title}</span>
                </div>
                <div>
                <CreateTaskButton projectId={project.id}/>
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