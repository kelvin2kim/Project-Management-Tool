'use client';
import Card from "./Card";
import Button from "./Button";
import { finishProject } from "../lib/api";

export default function DeleteProject({projectId}) {

    //const a = {name: projectId, user: user}
    const handleSubmit = async () => {
        console.log('clicked')
        await finishProject(projectId);
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