import { BookOpen, Rocket, CalendarDays } from "lucide-react";
import type { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
  onToggle: (id: number) => void;
}

const TaskCard = ({ task, onToggle }: TaskCardProps) => {
  const isCompleted = task.status === "completed";

  return (
    <div
      className={`group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg lg:p-6 ${
        isCompleted
          ? "border-l-4 border-l-green-500"
          : "border-l-4 border-l-red-500"
      }`}
    >
      <div className="flex gap-4">

        {/* Task Icon */}
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-105 ${
            isCompleted
              ? "bg-green-100 text-green-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {isCompleted ? (
            <Rocket size={26} strokeWidth={2.2} />
          ) : (
            <BookOpen size={26} strokeWidth={2.2} />
          )}
        </div>

        {/* Task Content */}
        <div className="min-w-0 flex-1">

          {/* Title + Menu */}
          <div className="flex items-start justify-between gap-3">

            <div className="min-w-0">

              <h3
                className={`truncate text-lg font-extrabold tracking-tight ${
                  isCompleted
                    ? "text-slate-700"
                    : "text-slate-900"
                }`}
              >
                {task.title}
              </h3>

              <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-slate-500">
                {task.description}
              </p>

            </div>

            {/* More Button */}
            <button
              type="button"
              aria-label="More options"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xl font-bold text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              ⋮
            </button>

          </div>

          {/* Date + Status */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">

            {/* Date */}
            <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
              <CalendarDays
                size={16}
                className="text-slate-400"
              />
              <span>{task.date}</span>
            </div>

            {/* Status */}
            <button
              type="button"
              onClick={() => onToggle(task.id)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95 ${
                isCompleted
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-red-100 text-red-700 hover:bg-red-200"
              }`}
            >
              {isCompleted ? "✓ Completed" : "● Pending"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default TaskCard;