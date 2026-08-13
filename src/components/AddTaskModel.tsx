import { useState } from "react";
import type { Task, TaskStatus } from "../types/task";

interface AddTaskModalProps {
  onClose: () => void;
  onAddTask: (task: Task) => void;
}

const AddTaskModal = ({
  onClose,
  onAddTask,
}: AddTaskModalProps) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] =
    useState<TaskStatus>("pending");

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Validation
    if (!title.trim() || !description.trim() || !date) {
      alert("Please fill all fields");
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      status: status,
      date: date,
    };

    // Send task to App.tsx
    onAddTask(newTask);

    // Close modal
    onClose();

    // Reset form
    setTitle("");
    setDescription("");
    setDate("");
    setStatus("pending");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">

      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Add New Task
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Create a new task
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-slate-500"
          >
            ×
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Task Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Enter task title"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Enter description"
              rows={3}
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          {/* Date */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as TaskStatus
                )
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-purple-500"
            >
              <option value="pending">
                Pending
              </option>

              <option value="completed">
                Completed
              </option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white hover:bg-purple-700"
            >
              Add Task
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddTaskModal;