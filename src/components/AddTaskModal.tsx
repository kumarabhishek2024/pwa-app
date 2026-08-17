import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Save, Plus } from "lucide-react";

import type { Task } from "../types/task";

// ============================================
// VALIDATION
// ============================================

const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Task title is required")
    .min(3, "Task title must be at least 3 characters")
    .max(100, "Task title must not exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .min(5, "Description must be at least 5 characters")
    .max(300, "Description must not exceed 300 characters"),

  date: z
    .string()
    .min(1, "Date is required"),

  status: z.enum([
    "pending",
    "completed",
  ]),

  priority: z.enum([
    "low",
    "medium",
    "high",
  ]),
});

type TaskFormData = z.infer<typeof taskSchema>;

// ============================================
// PROPS
// ============================================

interface AddTaskModalProps {
  onClose: () => void;

  onAddTask: (
    task: Omit<Task, "id">
  ) => void;

  onUpdateTask: (
    task: Task
  ) => void;

  editingTask: Task | null;
}

// ============================================
// DATE FORMATTER
// ============================================

const formatDateForInput = (
  date: string
): string => {
  if (!date) {
    return "";
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }

  const parsedDate = new Date(date);

  if (!Number.isNaN(parsedDate.getTime())) {
    const year = parsedDate.getFullYear();

    const month = String(
      parsedDate.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      parsedDate.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return "";
};

// ============================================
// COMPONENT
// ============================================

function AddTaskModal({
  onClose,
  onAddTask,
  onUpdateTask,
  editingTask,
}: AddTaskModalProps) {

  const isEditMode =
    editingTask !== null;

  // ==========================================
  // ONLY BACKGROUND SCROLL LOCK
  // ==========================================

  useEffect(() => {
    const previousBodyOverflow =
      document.body.style.overflow;

    const previousHtmlOverflow =
      document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousBodyOverflow;

      document.documentElement.style.overflow =
        previousHtmlOverflow;
    };
  }, []);

  // ==========================================
  // FORM
  // ==========================================

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),

    defaultValues: {
      title: "",
      description: "",
      date: "",
      status: "pending",
      priority: "medium",
    },

    mode: "onBlur",
  });

  // ==========================================
  // EDIT DATA
  // ==========================================

  useEffect(() => {
    if (editingTask) {
      reset({
        title: editingTask.title,

        description:
          editingTask.description,

        date:
          formatDateForInput(
            editingTask.date
          ),

        status:
          editingTask.status,

        priority:
          editingTask.priority ?? "medium",
      });
    } else {
      reset({
        title: "",
        description: "",
        date: "",
        status: "pending",
        priority: "medium",
      });
    }
  }, [
    editingTask,
    reset,
  ]);

  // ==========================================
  // SUBMIT
  // ==========================================

  const onSubmit = (
    data: TaskFormData
  ) => {

    // UPDATE
    if (editingTask) {
      const updatedTask: Task = {
        ...editingTask,

        title:
          data.title.trim(),

        description:
          data.description.trim(),

        date:
          data.date,

        status:
          data.status,

        priority:
          data.priority,
      };

      onUpdateTask(updatedTask);

      return;
    }

    // ADD
    const newTask: Omit<Task, "id"> = {
      title:
        data.title.trim(),

      description:
        data.description.trim(),

      date:
        data.date,

      status:
        data.status,

      priority:
        data.priority,
    };

    onAddTask(newTask);
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        h-screen
        items-center
        justify-center
        overflow-hidden
        bg-white
        lg:left-64
      "
    >

      {/* ===================================== */}
      {/* CENTER */}
      {/* ===================================== */}

      <div
        className="
          flex
          h-full
          w-full
          items-center
          justify-center
          px-4
          py-6
          sm:px-6
          lg:px-10
        "
      >

        {/* =================================== */}
        {/* ADD TASK CARD */}
        {/* =================================== */}

        <div
          className="
            w-full
            max-w-3xl

            max-h-[calc(100vh-48px)]

            overflow-y-auto

            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-xl
          "
        >

          {/* ================================= */}
          {/* HEADER */}
          {/* ================================= */}

          <div
            className="
              sticky
              top-0
              z-10

              flex
              items-center
              justify-between

              border-b
              border-slate-100

              bg-white

              px-6
              py-5

              sm:px-8
              sm:py-6
            "
          >

            <div>

              <h2
                className="
                  text-2xl
                  font-extrabold
                  tracking-tight
                  text-slate-900
                  sm:text-3xl
                "
              >
                {isEditMode
                  ? "Edit Task"
                  : "Add New Task"}
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                {isEditMode
                  ? "Update your task details."
                  : "Create a new task."}
              </p>

            </div>

            {/* CLOSE */}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close task page"
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                text-slate-400
                transition
                hover:bg-slate-100
                hover:text-slate-700
              "
            >
              <X size={21} />
            </button>

          </div>

          {/* ================================= */}
          {/* FORM */}
          {/* ================================= */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="
              space-y-5
              p-6
              sm:p-8
            "
          >

            {/* ================================= */}
            {/* TITLE */}
            {/* ================================= */}

            <div>

              <label
                htmlFor="task-title"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-slate-700
                "
              >
                Task Title

                <span className="text-red-500">
                  {" "}*
                </span>
              </label>

              <input
                id="task-title"
                type="text"
                placeholder="Enter task title"
                autoComplete="off"
                {...register("title")}
                className={`
                  w-full
                  rounded-xl
                  border
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:ring-2

                  ${
                    errors.title
                      ? `
                        border-red-400
                        focus:border-red-500
                        focus:ring-red-100
                      `
                      : `
                        border-slate-200
                        focus:border-blue-500
                        focus:ring-blue-100
                      `
                  }
                `}
              />

              {errors.title && (
                <p
                  className="
                    mt-1
                    text-sm
                    text-red-500
                  "
                >
                  {errors.title.message}
                </p>
              )}

            </div>

            {/* ================================= */}
            {/* DESCRIPTION */}
            {/* ================================= */}

            <div>

              <label
                htmlFor="task-description"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-slate-700
                "
              >
                Description

                <span className="text-red-500">
                  {" "}*
                </span>
              </label>

              <textarea
                id="task-description"
                rows={4}
                placeholder="Enter task description"
                autoComplete="off"
                {...register("description")}
                className={`
                  w-full
                  resize-none
                  rounded-xl
                  border
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:ring-2

                  ${
                    errors.description
                      ? `
                        border-red-400
                        focus:border-red-500
                        focus:ring-red-100
                      `
                      : `
                        border-slate-200
                        focus:border-blue-500
                        focus:ring-blue-100
                      `
                  }
                `}
              />

              {errors.description && (
                <p
                  className="
                    mt-1
                    text-sm
                    text-red-500
                  "
                >
                  {
                    errors.description.message
                  }
                </p>
              )}

            </div>

            {/* ================================= */}
            {/* DATE */}
            {/* ================================= */}

            <div>

              <label
                htmlFor="task-date"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-slate-700
                "
              >
                Date

                <span className="text-red-500">
                  {" "}*
                </span>
              </label>

              <input
                id="task-date"
                type="date"
                autoComplete="off"
                {...register("date")}
                className={`
                  w-full
                  rounded-xl
                  border
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:ring-2

                  ${
                    errors.date
                      ? `
                        border-red-400
                        focus:border-red-500
                        focus:ring-red-100
                      `
                      : `
                        border-slate-200
                        focus:border-blue-500
                        focus:ring-blue-100
                      `
                  }
                `}
              />

              {errors.date && (
                <p
                  className="
                    mt-1
                    text-sm
                    text-red-500
                  "
                >
                  {errors.date.message}
                </p>
              )}

            </div>

            {/* ================================= */}
            {/* STATUS */}
            {/* ================================= */}

            <div>

              <label
                htmlFor="task-status"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-slate-700
                "
              >
                Status

                <span className="text-red-500">
                  {" "}*
                </span>
              </label>

              <select
                id="task-status"
                {...register("status")}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                "
              >

                <option value="pending">
                  Pending
                </option>

                <option value="completed">
                  Completed
                </option>

              </select>

              {errors.status && (
                <p
                  className="
                    mt-1
                    text-sm
                    text-red-500
                  "
                >
                  {errors.status.message}
                </p>
              )}

            </div>

            {/* ================================= */}
            {/* PRIORITY */}
            {/* ================================= */}

            <div>

              <label
                htmlFor="task-priority"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-slate-700
                "
              >
                Priority

                <span className="text-red-500">
                  {" "}*
                </span>
              </label>

              <select
                id="task-priority"
                {...register("priority")}
                className={`
                  w-full
                  rounded-xl
                  border
                  bg-white
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:ring-2

                  ${
                    errors.priority
                      ? `
                        border-red-400
                        focus:border-red-500
                        focus:ring-red-100
                      `
                      : `
                        border-slate-200
                        focus:border-blue-500
                        focus:ring-blue-100
                      `
                  }
                `}
              >

                <option value="low">
                  Low
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="high">
                  High
                </option>

              </select>

              {errors.priority && (
                <p
                  className="
                    mt-1
                    text-sm
                    text-red-500
                  "
                >
                  {
                    errors.priority.message
                  }
                </p>
              )}

            </div>

            {/* ================================= */}
            {/* BUTTONS */}
            {/* ================================= */}

            <div
              className="
                flex
                gap-3
                border-t
                border-slate-100
                pt-5
              "
            >

              {/* CANCEL */}

              <button
                type="button"
                onClick={onClose}
                className="
                  flex-1
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  py-3
                  text-sm
                  font-bold
                  text-slate-700
                  transition
                  hover:bg-slate-50
                "
              >
                Cancel
              </button>

              {/* ADD / UPDATE */}

              <button
                type="submit"
                className="
                  flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-4
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-md
                  shadow-blue-200
                  transition
                  hover:bg-blue-700
                  active:scale-95
                "
              >

                {isEditMode ? (
                  <>
                    <Save size={17} />
                    Update Task
                  </>
                ) : (
                  <>
                    <Plus size={17} />
                    Add Task
                  </>
                )}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddTaskModal;