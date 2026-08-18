import {
  BookOpen,
  Rocket,
  CalendarDays,
  MoreVertical,
  Check,
  Circle,
} from "lucide-react";

import type { Task } from "../types/task";

import { useTheme } from "../context/useTheme";

interface TaskCardProps {
  task: Task;
  onToggle: (id: number) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (id: number) => void;
  onTaskClick?: (task: Task) => void;
}

const TaskCard = ({
  task,
  onToggle,
  onEdit,
  onDelete,
  onTaskClick,
}: TaskCardProps) => {
  const { theme } = useTheme();

  const isDark = theme === "dark";
  const isCompleted = task.status === "completed";

  return (
    <div
      className={`
        group
        rounded-2xl
        border
        px-2
        py-2.5
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md
        sm:px-2.5
        sm:py-3
        lg:px-3
        lg:py-3.5

        ${
          isDark
            ? `
              border-slate-800
              bg-slate-900
              shadow-black/10
            `
            : `
              border-slate-200
              bg-white
              shadow-slate-200/50
            `
        }

        ${
          isCompleted
            ? "border-l-4 border-l-green-500"
            : "border-l-4 border-l-red-500"
        }
      `}
    >
      <div className="flex gap-2 sm:gap-2.5">

        {/* TASK ICON */}

        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            transition-transform
            duration-200
            group-hover:scale-105
            sm:h-11
            sm:w-11

            ${
              isCompleted
                ? isDark
                  ? "bg-green-500/10 text-green-400"
                  : "bg-green-100 text-green-600"
                : isDark
                  ? "bg-blue-500/10 text-blue-400"
                  : "bg-blue-100 text-blue-600"
            }
          `}
        >
          {isCompleted ? (
            <Rocket size={21} strokeWidth={2.2} />
          ) : (
            <BookOpen size={21} strokeWidth={2.2} />
          )}
        </div>

        {/* CONTENT */}

        <div className="min-w-0 flex-1">

          {/* TITLE + ACTION */}

          <div className="flex items-start justify-between gap-1.5">

            <button
              type="button"
              onClick={() => onTaskClick?.(task)}
              className="min-w-0 flex-1 text-left"
            >
              <h3
                className={`
                  truncate
                  text-base
                  font-bold
                  leading-5
                  tracking-tight
                  sm:text-[17px]

                  ${
                    isDark
                      ? "text-white"
                      : "text-slate-900"
                  }
                `}
              >
                {task.title}
              </h3>

              <p
                className={`
                  mt-0.5
                  line-clamp-2
                  text-[13px]
                  font-normal
                  leading-5

                  ${
                    isDark
                      ? "text-slate-400"
                      : "text-slate-500"
                  }
                `}
              >
                {task.description}
              </p>
            </button>

            {/* MORE */}

            <button
              type="button"
              aria-label="More options"
              className={`
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                transition

                ${
                  isDark
                    ? `
                      text-slate-500
                      hover:bg-slate-800
                      hover:text-slate-200
                    `
                    : `
                      text-slate-400
                      hover:bg-slate-100
                      hover:text-slate-700
                    `
                }
              `}
            >
              <MoreVertical size={19} />
            </button>
          </div>

          {/* DATE + STATUS */}

          <div
            className={`
              mt-2
              flex
              flex-wrap
              items-center
              justify-between
              gap-1.5
              border-t
              pt-2
              sm:mt-2.5
              sm:pt-2.5

              ${
                isDark
                  ? "border-slate-800"
                  : "border-slate-100"
              }
            `}
          >
            {/* DATE */}

            <div
              className={`
                flex
                items-center
                gap-1
                text-[12px]
                font-medium
                leading-4
                sm:text-[13px]

                ${
                  isDark
                    ? "text-slate-400"
                    : "text-slate-500"
                }
              `}
            >
              <CalendarDays
                size={15}
                className={
                  isDark
                    ? "text-slate-500"
                    : "text-slate-400"
                }
              />

              <span>{task.date}</span>
            </div>

            {/* STATUS */}

            <button
              type="button"
              onClick={() => onToggle(task.id)}
              className={`
                flex
                items-center
                gap-1
                rounded-full
                px-2.5
                py-1
                text-[11px]
                font-semibold
                leading-4
                transition-all
                duration-200
                hover:scale-105
                active:scale-95
                sm:px-3
                sm:text-xs

                ${
                  isCompleted
                    ? isDark
                      ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                    : isDark
                      ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      : "bg-red-100 text-red-700 hover:bg-red-200"
                }
              `}
            >
              {isCompleted ? (
                <>
                  <Check size={13} strokeWidth={3} />
                  Completed
                </>
              ) : (
                <>
                  <Circle
                    size={9}
                    fill="currentColor"
                  />
                  Pending
                </>
              )}
            </button>
          </div>

          {/* OPTIONAL ACTIONS */}

          {(onEdit || onDelete) && (
            <div className="mt-1 flex items-center justify-end gap-1">
              {onEdit && (
                <button
                  type="button"
                  onClick={() => onEdit(task)}
                  className={`
                    rounded-lg
                    px-2
                    py-1
                    text-xs
                    font-semibold
                    leading-4
                    transition

                    ${
                      isDark
                        ? "text-blue-400 hover:bg-blue-500/10"
                        : "text-blue-600 hover:bg-blue-50"
                    }
                  `}
                >
                  Edit
                </button>
              )}

              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(task.id)}
                  className={`
                    rounded-lg
                    px-2
                    py-1
                    text-xs
                    font-semibold
                    leading-4
                    transition

                    ${
                      isDark
                        ? "text-red-400 hover:bg-red-500/10"
                        : "text-red-600 hover:bg-red-50"
                    }
                  `}
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;