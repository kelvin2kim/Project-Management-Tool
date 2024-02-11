import { getUserFromCookie } from "../../../lib/auth";
import { db } from "../../../lib/db";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import Greetings from "../../../components/Greetings";
import PlaceholderGreetings from "../../../components/PlaceholderGreetings";
import ProjectComponent from "../../../components/ProjectComponent";
import TaskCard from "../../../components/TaskCard";
import NewProject from "../../../components/NewProjectCard";
import NewProjectCard from "../../../components/NewProjectCard";

async function getProject() {
	const user = await getUserFromCookie(cookies());
	const projects = await db.project.findMany({
	  where: {
		ownerId: user.id,
	  },
	  include: {
		tasks: true,
	  },
	});
	return { projects };
  };

export default async function Home() {
	const {projects} = await getProject();
  return (
    <div className="h-full overflow-y-auto pr-6 w-full">
      <div className=" h-full  items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex px-3 mt-3">
			<Suspense fallback={<PlaceholderGreetings/>}>
				<Greetings/>
			</Suspense>
		</div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3">
			{projects.map((project) => (
			<div className="w-1/3 p-3 ">
				<Link href = {`/project/${project.id}`}>
					<ProjectComponent project={project}/>
				</Link>
			</div>
			))}
          <div className="w-1/3 p-3">
			<NewProjectCard/>
		  </div>
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full px-3">
			<TaskCard title="Tasks:"/>
		  </div>
        </div>
      </div>
    </div>
  );
}