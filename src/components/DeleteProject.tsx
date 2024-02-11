'use client';
import Card from "./Card";
import Button from "./Button";
import { finishProject } from "../lib/api";
import { useRouter } from "next/navigation";


export default function DeleteProject({projectId}) {
    const router = useRouter();
    const handleSubmit = async () => {
        //console.log('clicked')
        await finishProject(projectId);
        router.push('/home');
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