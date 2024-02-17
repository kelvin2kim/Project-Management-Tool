import {FC} from "react";
import { Prisma, TASK_STATUS } from "@prisma/client";
import Card from "./Card";
import clsx from "clsx";

//Makes a type that looks like the arguments for a project entity, and also we want to make sure tasks is included in these arguments
//Also, this would only include the necessary attributes such as name or ownerId, the other attributes, if necessary have default
//values and or are optional, or already exist, like tasks
const projectWithTasks = Prisma.validator<Prisma.ProjectArgs>()({
    include: {tasks: true},
  });

  /*
  Remember that projectWithTasks is a query argument at this point (the arguments inputted when making a query which would be
    the specific properties of the entity depending on the query), and Prisma.ProjectGetPayload turns this query argument
    and translates it to a typescript type that can now be used inside of the function component. 
  */
type ProjectWithTasks = Prisma.ProjectGetPayload<typeof projectWithTasks>;
  

function displayDate(date) {
    const output = new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        weekday: "long",
        year: "numeric",
        });
    return output;
}

const ProjectComponent: FC<{project: ProjectWithTasks}> = ({ project }) => {
    //Use filter instead of map if I want to filter function used within the parenthesis as conditional
    const completed = project.tasks.filter((a) => a.status === TASK_STATUS.COMPLETED).length;
    const allTasks = project.tasks.length;
    const progress = Math.ceil((completed / allTasks) * 100);

    //console.log(`completed: ${completed}, allTasks: ${allTasks}, progress: ${progress}`)

    return (
        <Card className="!px-6 !py-8 hover:scale-105 transition-all ease-in-out duration-200">
          <div>
            <span className="text-sm text-gray-300">
              {displayDate(project.createdAt)}
            </span>
          </div>
          <div className="mb-6">
            <span className="text-3xl text-gray-600">{project.name}</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-400">
              {completed}/{project.tasks.length} completed
            </span>
          </div>
          <div>
            <div className="w-full h-2 bg-violet-200 rounded-full mb-2">
              <div
                className={clsx(
                  "h-full text-center text-xs text-white bg-violet-600 rounded-full"
                )}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-600 font-semibold">
                {progress}%
              </span>
            </div>
          </div>
        </Card>
      );
}

export default ProjectComponent;