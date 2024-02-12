'use client';
import Button from "./Button"
import { newTask } from "../lib/api";
import Modal from "react-modal";
import { useState } from "react";
import Input from "./Input";

Modal.setAppElement("#modal2");

export default function CreateTaskButton({projectId}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [name, setName] = useState("");
  
  const handleSubmit = async (e) => {
        e.preventDefault();
        await newTask({name, projectId});
        closeModal();
      };
    return(
      <div>
      <Button onClick={() => openModal()}>+ Create New</Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">New Task</h1>
        <form className="flex items-center" onSubmit={handleSubmit}>
          <Input
            required
            placeholder="task name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit">Create</Button>
        </form>
      </Modal>
    </div>
    )
}