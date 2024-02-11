'use client';
import Card from "./Card";
import Button from "./Button";
import { finishProject } from "../lib/api";
import { useRouter } from "next/router";

export default function DeleteProject({projectId}) {

    //const a = {name: projectId, user: user}
    const handleSubmit = async () => {
        //console.log('clicked')
        //const router = useRouter();
        await finishProject(projectId);
        //router.push('/app/home');
      };

    console.log(`project name: ${projectId}`)
    return (
        <div className="w-full py-4 relative">
            <div className="flex justify-end">
                <Button onClick={handleSubmit}>
                    delete
                </Button>
            </div>
        </div>
    );
}