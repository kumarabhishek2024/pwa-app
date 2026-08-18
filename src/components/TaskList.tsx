import {
  Check,
  Circle,
  Edit3,
  Trash2,
  CalendarDays,
  Flag,
  CircleCheck,
  Clock3,
} from "lucide-react";

import type { Task } from "../types/task";
import { useTheme } from "../context/useTheme";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onTaskClick: (task: Task) => void;
}

function TaskList({
  tasks,
  onToggle,
  onEdit,
  onDelete,
  onTaskClick,
}: TaskListProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="space-y-3 px-3 sm:space-y-4 sm:px-5 lg:px-10">
      {tasks.map((task) => (
        <article
          key={task.id}
          onClick={() => onTaskClick(task)}
          className={`
            group
            cursor-pointer
            rounded-2xl
            border
            p-4
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:shadow-lg
            sm:p-5
            lg:rounded-3xl
            lg:p-6
            ${
              isDark
                ? "border-slate-800 bg-slate-900 shadow-black/10 hover:border-slate-700"
                : "border-slate-200 bg-white hover:border-slate-300"
            }
          `}
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onToggle(task.id);
              }}
              aria-label={
                task.status === "completed"
                  ? "Mark as pending"
                  : "Mark as completed"
              }
              className="mt-0.5 shrink-0 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              {task.status === "completed" ? (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 shadow-sm sm:h-8 sm:w-8">
                  <Check size={16} strokeWidth={3} className="text-white" />
                </div>
              ) : (
                <Circle
                  size={26}
                  strokeWidth={1.8}
                  className={`transition sm:h-7 sm:w-7 ${
                    isDark
                      ? "text-slate-600 hover:text-blue-400"
                      : "text-slate-300 hover:text-blue-500"
                  }`}
                />
              )}
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2 sm:gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 items-start gap-1.5 sm:gap-2">
                    {task.status === "completed" ? (
                      <CircleCheck
                        size={17}
                        className="mt-0.5 shrink-0 text-green-500 sm:h-[18px] sm:w-[18px]"
                      />
                    ) : (
                      <Clock3
                        size={17}
                        className="mt-0.5 shrink-0 text-orange-400 sm:h-[18px] sm:w-[18px]"
                      />
                    )}

                    <h3
                      className={`
                        min-w-0
                        break-words
                        text-[15px]
                        font-semibold
                        leading-5
                        sm:text-base
                        sm:leading-6
                        ${
                          task.status === "completed"
                            ? isDark
                              ? "text-slate-500 line-through"
                              : "text-slate-400 line-through"
                            : isDark
                              ? "text-white"
                              : "text-slate-900"
                        }
                      `}
                    >
                      {task.title}
                    </h3>
                  </div>

                  <p
                    className={`
                      mt-1.5
                      line-clamp-2
                      break-words
                      text-[13px]
                      font-normal
                      leading-5
                      sm:text-sm
                      sm:leading-6
                      ${isDark ? "text-slate-400" : "text-slate-500"}
                    `}
                  >
                    {task.description}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onEdit(task);
                    }}
                    aria-label={`Edit ${task.title}`}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg transition sm:h-9 sm:w-9 ${
                      isDark
                        ? "text-blue-400 hover:bg-blue-500/10"
                        : "text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <Edit3 size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onDelete(task.id);
                    }}
                    aria-label={`Delete ${task.title}`}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg transition sm:h-9 sm:w-9 ${
                      isDark
                        ? "text-red-400 hover:bg-red-500/10"
                        : "text-red-500 hover:bg-red-50"
                    }`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-4 sm:gap-3">
                <span
                  className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold leading-4 sm:px-3 sm:text-xs ${
                    task.status === "completed"
                      ? isDark
                        ? "bg-green-500/10 text-green-400"
                        : "bg-green-100 text-green-700"
                      : isDark
                        ? "bg-orange-500/10 text-orange-400"
                        : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {task.status === "completed" ? (
                    <Check size={12} strokeWidth={3} />
                  ) : (
                    <Clock3 size={12} />
                  )}
                  {task.status === "completed" ? "Completed" : "Pending"}
                </span>

                <span
                  className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold leading-4 sm:px-3 sm:text-xs ${
                    task.priority === "high"
                      ? isDark
                        ? "bg-red-500/10 text-red-400"
                        : "bg-red-100 text-red-700"
                      : task.priority === "medium"
                        ? isDark
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-yellow-100 text-yellow-700"
                        : isDark
                          ? "bg-green-500/10 text-green-400"
                          : "bg-green-100 text-green-700"
                  }`}
                >
                  <Flag size={12} fill="currentColor" />
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>

                <span
                  className={`flex items-center gap-1.5 text-[11px] font-medium leading-4 sm:text-xs ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  <CalendarDays size={13} />
                  {task.date}
                </span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default TaskList;