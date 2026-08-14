import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Plus } from "lucide-react";

import type { Task } from "../types/task";

// ------------------------------------
// ZOD VALIDATION SCHEMA
// ------------------------------------

const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(30, "Title must not exceed 30 characters"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .min(8, "Description must be at least 8 characters")
    .max(200, "Description must not exceed 200 characters"),

  date: z
    .string()
    .min(1, "Date is required"),
});

// Form data type
type TaskFormData = z.infer<typeof taskSchema>;

// ------------------------------------
// PROPS
// ------------------------------------

interface AddTaskModalProps {
  onClose: () => void;
  onAddTask: (task: Task) => void;
}

// ------------------------------------
// COMPONENT
// ------------------------------------

const AddTaskModal = ({
  onClose,
  onAddTask,
}: AddTaskModalProps) => {

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),

    defaultValues: {
      title: "",
      description: "",
      date: "",
    },

    mode: "onBlur",
  });

  // ------------------------------------
  // SUBMIT
  // ------------------------------------

  const onSubmit = (data: TaskFormData) => {

    const newTask: Task = {
      // ID App.tsx me generate hoga
      id: 0,

      title: data.title.trim(),

      description: data.description.trim(),

      status: "pending",

      date: data.date,
    };

    onAddTask(newTask);

    reset();

    onClose();
  };

  // ------------------------------------
  // CLOSE MODAL
  // ------------------------------------

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

        {/* --------------------------------
            HEADER
        -------------------------------- */}

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-xl font-extrabold text-slate-900">
              Add New Task
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Create a new task.
            </p>

          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>

        </div>

        {/* --------------------------------
            FORM
        -------------------------------- */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >

          {/* =================================
              TITLE
          ================================= */}

          <div>

            <label
              htmlFor="title"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Task Title
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              id="title"
              type="text"
              placeholder="Enter task title"
              {...register("title")}
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                errors.title
                  ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />

            {errors.title && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errors.title.message}
              </p>
            )}

          </div>

          {/* =================================
              DESCRIPTION
          ================================= */}

          <div>

            <label
              htmlFor="description"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Description
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <textarea
              id="description"
              rows={3}
              placeholder="Enter task description"
              {...register("description")}
              className={`w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                errors.description
                  ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />

            {errors.description && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errors.description.message}
              </p>
            )}

          </div>

          {/* =================================
              DATE
          ================================= */}

          <div>

            <label
              htmlFor="date"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Date
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              id="date"
              type="date"
              {...register("date")}
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
                errors.date
                  ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />

            {errors.date && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errors.date.message}
              </p>
            )}

          </div>

          {/* =================================
              BUTTONS
          ================================= */}

          <div className="flex gap-3 pt-3">

            {/* Cancel */}
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >

              <Plus size={17} />

              {isSubmitting
                ? "Adding..."
                : "Add Task"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddTaskModal;