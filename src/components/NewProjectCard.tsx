"use client";
import { newProject } from "../lib/api";
import { useState } from "react";
import Modal from "react-modal";
import Button from "./Button";
import Input from "./Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { useRouter } from "next/navigation";
import CalendarCard from "./CalendarCard";

Modal.setAppElement("#modal");

export default function NewProjectCard () {
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [name, setName] = useState("");
  const [due, setDueDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dueDate = due.toISOString();
    await newProject({name, dueDate});
    router.refresh();
    closeModal();
  };

  return (
    <div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center">
      <Button onClick={() => openModal()}>+ New Project</Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 bg-white rounded-xl p-8"
      >
        <h1 className="text-3xl mb-6">New Project</h1>
        <form className="flex items-center" onSubmit={handleSubmit}>
            <Input
                required
                placeholder="project name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <div className="px-3">
              <CalendarCard className='flex justify-center items-center'>
                  <DatePicker
                          selected={due}
                          onChange={(date) => setDueDate(date)}
                  />
                </CalendarCard>
            </div>
          <Button type="submit">Create</Button>
        </form>
      </Modal>
    </div>
  );
};