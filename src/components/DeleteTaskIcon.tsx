'use client'
import {X} from "react-feather";
import { deleteTask } from "../lib/api";
import clsx from "clsx";

export default function DeleteTaskIcon({task}) {
    const Icon = X;
    const handleSubmit = async () => {
        await deleteTask(task);
    }
    return(
        <div onClick={handleSubmit}>
            <Icon
            size={20}
            className={clsx("stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out")}
            />
        </div>
        
    )
}