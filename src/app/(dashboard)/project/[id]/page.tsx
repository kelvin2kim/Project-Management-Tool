import TaskCard from "../../../../components/TaskCard";
import { getUserFromCookie } from "../../../../lib/auth";
import { db } from "../../../../lib/db";
import { cookies } from "next/headers";
import { TASK_STATUS } from "@prisma/client";
import DeleteProject from "../../../../components/DeleteProject";

const getData = async (id) => {
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

export default async function ProjectPage({params}) {
    const project = await getData(params.id);
    return (
        <div className="h-full w-full overflow-y-auto pr-6 px-3 mt-10">
            <DeleteProject projectId={project.name}/>
          <TaskCard tasks={project.tasks} title={project.name} />
        </div>
      );
}