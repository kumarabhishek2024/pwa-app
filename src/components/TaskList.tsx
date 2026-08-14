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

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

function TaskList({
  tasks,
  onToggle,
  onEdit,
  onDelete,
}: TaskListProps) {
  return (
    <div className="space-y-4 px-5 lg:px-10">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-start gap-4">

            {/* ========================= */}
            {/* COMPLETE / PENDING ICON */}
            {/* ========================= */}

            <button
              type="button"
              onClick={() => onToggle(task.id)}
              aria-label={
                task.status === "completed"
                  ? "Mark as pending"
                  : "Mark as completed"
              }
              className="mt-1 shrink-0"
            >
              {task.status === "completed" ? (
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500">
                  <Check
                    size={17}
                    strokeWidth={3}
                    className="text-white"
                  />
                </div>
              ) : (
                <Circle
                  size={27}
                  strokeWidth={1.8}
                  className="text-slate-300 transition hover:text-blue-500"
                />
              )}
            </button>

            {/* ========================= */}
            {/* CONTENT */}
            {/* ========================= */}

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">

                {/* TITLE + DESCRIPTION */}
                <div className="min-w-0 flex-1">

                  {/* TITLE + STATUS ICON */}
                  <div className="flex min-w-0 items-start gap-2">

                    {task.status === "completed" ? (
                      <CircleCheck
                        size={18}
                        strokeWidth={2}
                        className="mt-1 shrink-0 text-green-500"
                      />
                    ) : (
                      <Clock3
                        size={18}
                        strokeWidth={2}
                        className="mt-1 shrink-0 text-orange-500"
                      />
                    )}

                    <h3
                      className={`min-w-0 break-words text-lg font-bold ${
                        task.status === "completed"
                          ? "text-slate-400 line-through"
                          : "text-slate-900"
                      }`}
                    >
                      {task.title}
                    </h3>

                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    {task.description}
                  </p>
                </div>

                {/* ========================= */}
                {/* EDIT + DELETE */}
                {/* ========================= */}

                <div className="flex shrink-0 items-center gap-1">

                  {/* EDIT */}
                  <button
                    type="button"
                    onClick={() => onEdit(task)}
                    aria-label={`Edit ${task.title}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-blue-600 transition hover:bg-blue-50"
                  >
                    <Edit3 size={17} />
                  </button>

                  {/* DELETE */}
                  <button
                    type="button"
                    onClick={() => onDelete(task.id)}
                    aria-label={`Delete ${task.title}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>
              </div>

              {/* ========================= */}
              {/* TASK DETAILS */}
              {/* ========================= */}

              <div className="mt-4 flex flex-wrap items-center gap-3">

                {/* STATUS */}
                <span
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {task.status === "completed" ? (
                    <Check
                      size={13}
                      strokeWidth={3}
                    />
                  ) : (
                    <Clock3 size={13} />
                  )}

                  {task.status === "completed"
                    ? "Completed"
                    : "Pending"}
                </span>

                {/* PRIORITY */}
                <span
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                    task.priority === "high"
                      ? "bg-red-100 text-red-700"
                      : task.priority === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                  }`}
                >
                  <Flag
                    size={13}
                    fill="currentColor"
                  />

                  {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)}
                </span>

                {/* DATE */}
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <CalendarDays size={14} />
                  {task.date}
                </span>

              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;