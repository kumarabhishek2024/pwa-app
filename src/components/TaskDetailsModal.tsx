import {
  X,
  CalendarDays,
  Flag,
  CheckCircle2,
  Clock3,
  Edit3,
} from "lucide-react";

import type { Task } from "../types/task";
import { useTheme } from "../context/useTheme";

interface TaskDetailsModalProps {
  task: Task;
  onClose: () => void;
  onEdit?: (task: Task) => void;
}

function TaskDetailsModal({
  task,
  onClose,
  onEdit,
}: TaskDetailsModalProps) {
  const { isDark } = useTheme();

  const isCompleted =
    task.status === "completed";

  const handleEdit = () => {
    if (onEdit) {
      onEdit(task);
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/60
        p-3
        backdrop-blur-sm
        sm:p-4
      "
      onClick={onClose}
    >
      {/* MODAL */}

      <div
        className={`
          w-full
          max-w-lg
          max-h-[calc(100vh-24px)]
          overflow-y-auto
          rounded-xl
          shadow-2xl
          transition-colors
          duration-300
          sm:max-h-[calc(100vh-48px)]
          sm:rounded-2xl

          ${
            isDark
              ? "border border-slate-800 bg-slate-900"
              : "border border-slate-200 bg-white"
          }
        `}
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div
          className={`
            sticky
            top-0
            z-10
            flex
            items-center
            justify-between
            border-b
            px-4
            py-4
            sm:px-5

            ${
              isDark
                ? "border-slate-800 bg-slate-900"
                : "border-slate-100 bg-white"
            }
          `}
        >
          <div className="min-w-0">

            <h2
              className={`
                text-lg
                font-bold
                leading-tight
                sm:text-xl

                ${
                  isDark
                    ? "text-white"
                    : "text-slate-900"
                }
              `}
            >
              Task Details
            </h2>

            <p
              className={`
                mt-1
                text-[12px]
                leading-4

                ${
                  isDark
                    ? "text-slate-500"
                    : "text-slate-400"
                }
              `}
            >
              View complete task information
            </p>

          </div>

          {/* CLOSE */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close task details"
            className={`
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              transition

              ${
                isDark
                  ? `
                    text-slate-400
                    hover:bg-slate-800
                    hover:text-white
                  `
                  : `
                    text-slate-400
                    hover:bg-slate-100
                    hover:text-slate-700
                  `
              }
            `}
          >
            <X size={20} />
          </button>

        </div>

        {/* ================================= */}
        {/* CONTENT */}
        {/* ================================= */}

        <div className="space-y-5 p-4 sm:p-5">

          {/* ================================= */}
          {/* TITLE */}
          {/* ================================= */}

          <div>

            <p
              className={`
                mb-1
                text-[11px]
                font-semibold
                uppercase
                tracking-wide

                ${
                  isDark
                    ? "text-slate-500"
                    : "text-slate-400"
                }
              `}
            >
              Task
            </p>

            <h3
              className={`
                break-words
                text-xl
                font-bold
                leading-7
                sm:text-[22px]
                sm:leading-8

                ${
                  isDark
                    ? "text-white"
                    : "text-slate-900"
                }
              `}
            >
              {task.title}
            </h3>

          </div>

          {/* ================================= */}
          {/* DESCRIPTION */}
          {/* ================================= */}

          <div>

            <p
              className={`
                mb-2
                text-[11px]
                font-semibold
                uppercase
                tracking-wide

                ${
                  isDark
                    ? "text-slate-500"
                    : "text-slate-400"
                }
              `}
            >
              Description
            </p>

            <div
              className={`
                rounded-xl
                p-3
                sm:p-4

                ${
                  isDark
                    ? "bg-slate-800/70"
                    : "bg-slate-50"
                }
              `}
            >
              <p
                className={`
                  whitespace-pre-wrap
                  break-words
                  text-[13px]
                  leading-5

                  ${
                    isDark
                      ? "text-slate-300"
                      : "text-slate-600"
                  }
                `}
              >
                {task.description ||
                  "No description provided."}
              </p>
            </div>

          </div>

          {/* ================================= */}
          {/* DETAILS */}
          {/* ================================= */}

          <div
            className="
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-3
            "
          >

            {/* STATUS */}

            <div
              className={`
                rounded-xl
                border
                p-3
                sm:p-4

                ${
                  isDark
                    ? "border-slate-800 bg-slate-800/50"
                    : "border-slate-100 bg-slate-50"
                }
              `}
            >
              <div
                className={`
                  flex
                  items-center
                  gap-2
                  text-[11px]
                  font-semibold

                  ${
                    isDark
                      ? "text-slate-400"
                      : "text-slate-500"
                  }
                `}
              >
                {isCompleted ? (
                  <CheckCircle2
                    size={16}
                    className="text-green-500"
                  />
                ) : (
                  <Clock3
                    size={16}
                    className="text-orange-400"
                  />
                )}

                Status
              </div>

              <p
                className={`
                  mt-2
                  text-[13px]
                  font-semibold

                  ${
                    isCompleted
                      ? "text-green-500"
                      : "text-orange-500"
                  }
                `}
              >
                {isCompleted
                  ? "Completed"
                  : "Pending"}
              </p>
            </div>

            {/* PRIORITY */}

            <div
              className={`
                rounded-xl
                border
                p-3
                sm:p-4

                ${
                  isDark
                    ? "border-slate-800 bg-slate-800/50"
                    : "border-slate-100 bg-slate-50"
                }
              `}
            >
              <div
                className={`
                  flex
                  items-center
                  gap-2
                  text-[11px]
                  font-semibold

                  ${
                    isDark
                      ? "text-slate-400"
                      : "text-slate-500"
                  }
                `}
              >
                <Flag
                  size={16}
                  className="text-blue-500"
                />

                Priority
              </div>

              <p
                className={`
                  mt-2
                  text-[13px]
                  font-semibold

                  ${
                    task.priority === "high"
                      ? "text-red-500"
                      : task.priority === "medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                  }
                `}
              >
                {task.priority
                  .charAt(0)
                  .toUpperCase() +
                  task.priority.slice(1)}
              </p>
            </div>

            {/* DATE */}

            <div
              className={`
                rounded-xl
                border
                p-3
                sm:p-4

                ${
                  isDark
                    ? "border-slate-800 bg-slate-800/50"
                    : "border-slate-100 bg-slate-50"
                }
              `}
            >
              <div
                className={`
                  flex
                  items-center
                  gap-2
                  text-[11px]
                  font-semibold

                  ${
                    isDark
                      ? "text-slate-400"
                      : "text-slate-500"
                  }
                `}
              >
                <CalendarDays
                  size={16}
                  className="text-blue-500"
                />

                Due Date
              </div>

              <p
                className={`
                  mt-2
                  break-words
                  text-[13px]
                  font-semibold

                  ${
                    isDark
                      ? "text-slate-200"
                      : "text-slate-700"
                  }
                `}
              >
                {task.date}
              </p>
            </div>

          </div>

          {/* ================================= */}
          {/* ACTIONS */}
          {/* ================================= */}

          <div
            className={`
              flex
              flex-col-reverse
              gap-3
              border-t
              pt-5
              sm:flex-row

              ${
                isDark
                  ? "border-slate-800"
                  : "border-slate-100"
              }
            `}
          >

            {/* CLOSE */}

            <button
              type="button"
              onClick={onClose}
              className={`
                min-h-11
                flex-1
                rounded-xl
                border
                px-4
                py-3
                text-sm
                font-bold
                transition

                ${
                  isDark
                    ? `
                      border-slate-700
                      text-slate-300
                      hover:bg-slate-800
                    `
                    : `
                      border-slate-200
                      text-slate-700
                      hover:bg-slate-50
                    `
                }
              `}
            >
              Close
            </button>

            {/* EDIT */}

            {onEdit && (
              <button
                type="button"
                onClick={handleEdit}
                className="
                  flex
                  min-h-11
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-4
                  py-3
                  text-[13px]
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-blue-700
                  active:scale-[0.98]
                "
              >
                <Edit3 size={17} />
                Edit Task
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default TaskDetailsModal;