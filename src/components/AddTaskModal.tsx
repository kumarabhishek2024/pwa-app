import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, ChevronLeft, ChevronRight, Check, X, Save, Plus, CalendarDays } from "lucide-react";
import { useTheme } from "../context/useTheme";

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

  // Already YYYY-MM-DD
  if (
    /^\d{4}-\d{2}-\d{2}$/.test(date)
  ) {
    return date;
  }

  // Old format
  // Example: 12 Aug 2026
  const parsedDate = new Date(date);

  if (
    !Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    const year =
      parsedDate.getFullYear();

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
// DATE PICKER HELPERS
// ============================================

const parseDateValue = (value: string): Date | null => {
  if (!value) return null;

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const [, year, month, day] = match;
  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );

  return Number.isNaN(date.getTime()) ? null : date;
};

const formatDateValue = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const isSameDay = (first: Date | null, second: Date): boolean => {
  if (!first) return false;

  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
};

const getCalendarDays = (year: number, month: number): Date[] => {
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay();
  const startDate = new Date(year, month, 1 - startDay);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return date;
  });
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
  const { theme } = useTheme();

  const isEditMode =
    editingTask !== null;

  const isDark =
    theme === "dark";

  const [openDropdown, setOpenDropdown] =
    useState<"status" | "priority" | null>(
      null
    );

  const [isDatePickerOpen, setIsDatePickerOpen] =
    useState(false);

  const [calendarDate, setCalendarDate] =
    useState(() => {
      const today = new Date();
      return new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
    });

  useEffect(() => {
    if (openDropdown === null) {
      return;
    }

    const handleOutsideClick = () => {
      setOpenDropdown(null);
    };

    document.addEventListener(
      "click",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "click",
        handleOutsideClick
      );
    };
  }, [openDropdown]);

  // ==========================================
  // BACKGROUND SCROLL LOCK
  // ==========================================

  useEffect(() => {
    const previousBodyOverflow =
      document.body.style.overflow;

    const previousHtmlOverflow =
      document.documentElement.style.overflow;

    document.body.style.overflow =
      "hidden";

    document.documentElement.style.overflow =
      "hidden";

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
    setValue,
    watch,
    formState: {
      errors,
    },
  } = useForm<TaskFormData>({
    resolver:
      zodResolver(taskSchema),

    defaultValues: {
      title: "",
      description: "",
      date: "",
      status: "pending",
      priority: "medium",
    },

    mode: "onBlur",
  });

  const statusValue = watch("status");
  const priorityValue = watch("priority");
  const dateValue = watch("date");

  // ==========================================
  // LOAD EDITING TASK
  // ==========================================

  useEffect(() => {
    if (editingTask) {
      reset({
        title:
          editingTask.title,

        description:
          editingTask.description,

        date:
          formatDateForInput(
            editingTask.date
          ),

        status:
          editingTask.status,

        priority:
          editingTask.priority ??
          "medium",
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

  useEffect(() => {
    const selectedDate = parseDateValue(dateValue);

    if (selectedDate) {
      setCalendarDate(
        new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          1
        )
      );
    }
  }, [dateValue]);

  const calendarDays = getCalendarDays(
    calendarDate.getFullYear(),
    calendarDate.getMonth()
  );

  const selectedDate = parseDateValue(dateValue);
  const today = new Date();

  const monthLabel = calendarDate.toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  );

  const displayDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Select a date";

  const goToPreviousMonth = () => {
    setCalendarDate(
      new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth() - 1,
        1
      )
    );
  };

  const goToNextMonth = () => {
    setCalendarDate(
      new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth() + 1,
        1
      )
    );
  };

  const selectDate = (date: Date) => {
    setValue(
      "date",
      formatDateValue(date),
      {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      }
    );

    setCalendarDate(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        1
      )
    );

    setIsDatePickerOpen(false);
  };

  const clearDate = () => {
    setValue("date", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    setIsDatePickerOpen(false);
  };

  const selectToday = () => {
    selectDate(today);
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const onSubmit = (
    data: TaskFormData
  ) => {

    // ========================================
    // UPDATE
    // ========================================

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

      onUpdateTask(
        updatedTask
      );

      return;
    }

    // ========================================
    // ADD
    // ========================================

    const newTask: Omit<
      Task,
      "id"
    > = {
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
      className={`
        fixed
        inset-0
        z-[9999]
        flex
        min-h-screen
        items-stretch
        justify-center
        overflow-y-auto
        overflow-x-hidden
        overscroll-contain
        transition-colors
        duration-300

        ${
          isDark
            ? "bg-slate-950"
            : "bg-white"
        }

        lg:left-64
      `}
    >

      {/* ===================================== */}
      {/* CENTER */}
      {/* ===================================== */}

      <div
        className="
          flex
          min-h-screen
          w-full
          items-center
          justify-center
          px-3
          py-3
          sm:px-6
          sm:py-6
          lg:px-10
        "
      >

        {/* =================================== */}
        {/* MODAL CARD */}
        {/* =================================== */}

        <div
          className={`
            modal-scrollbar
            ${isDark ? "dark-scrollbar" : ""}

            w-full
            max-w-3xl

            max-h-[calc(100dvh-24px)]
            overflow-y-auto
            overscroll-contain

            sm:max-h-[calc(100dvh-48px)]

            rounded-2xl
            border
            shadow-xl

            transition-colors
            duration-300

            ${
              isDark
                ? `
                  border-slate-700
                  bg-slate-900
                  shadow-black/40
                `
                : `
                  border-slate-200
                  bg-white
                  shadow-slate-200/70
                `
            }
          `}
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

              px-6
              py-5

              transition-colors
              duration-300

              sm:px-8
              sm:py-6

              ${
                isDark
                  ? `
                    border-slate-700
                    bg-slate-900
                  `
                  : `
                    border-slate-100
                    bg-white
                  `
              }
            `}
          >

            <div>

              <h2
                className={`
                  text-2xl
                  font-extrabold
                  tracking-tight

                  transition-colors
                  duration-300

                  sm:text-3xl

                  ${
                    isDark
                      ? "text-white"
                      : "text-slate-900"
                  }
                `}
              >
                {isEditMode
                  ? "Edit Task"
                  : "Add New Task"}
              </h2>

              <p
                className={`
                  mt-1
                  text-sm

                  transition-colors
                  duration-300

                  ${
                    isDark
                      ? "text-slate-400"
                      : "text-slate-500"
                  }
                `}
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
              <X size={21} />
            </button>

          </div>

          {/* ================================= */}
          {/* FORM */}
          {/* ================================= */}

          <form
            onSubmit={handleSubmit(
              onSubmit
            )}
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
                className={`
                  mb-2
                  block
                  text-sm
                  font-semibold

                  transition-colors

                  ${
                    isDark
                      ? "text-slate-200"
                      : "text-slate-700"
                  }
                `}
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
                      : isDark
                        ? `
                          border-slate-700
                          bg-slate-800
                          text-white
                          placeholder:text-slate-500
                          focus:border-blue-500
                          focus:ring-blue-900/50
                        `
                        : `
                          border-slate-200
                          bg-white
                          text-slate-700
                          placeholder:text-slate-400
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
                  {
                    errors.title.message
                  }
                </p>
              )}

            </div>

            {/* ================================= */}
            {/* DESCRIPTION */}
            {/* ================================= */}

            <div>

              <label
                htmlFor="task-description"
                className={`
                  mb-2
                  block
                  text-sm
                  font-semibold

                  transition-colors

                  ${
                    isDark
                      ? "text-slate-200"
                      : "text-slate-700"
                  }
                `}
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
                {...register(
                  "description"
                )}
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
                      : isDark
                        ? `
                          border-slate-700
                          bg-slate-800
                          text-white
                          placeholder:text-slate-500
                          focus:border-blue-500
                          focus:ring-blue-900/50
                        `
                        : `
                          border-slate-200
                          bg-white
                          text-slate-700
                          placeholder:text-slate-400
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

            <div className="min-w-0">

              <label
                htmlFor="task-date"
                className={`
                  mb-2
                  block
                  text-sm
                  font-semibold

                  transition-colors

                  ${
                    isDark
                      ? "text-slate-200"
                      : "text-slate-700"
                  }
                `}
              >
                Date

                <span className="text-red-500">
                  {" "}*
                </span>
              </label>

              <input
                type="hidden"
                {...register("date")}
              />

              <button
                id="task-date"
                type="button"
                onClick={() => {
                  setOpenDropdown(null);
                  setIsDatePickerOpen(
                    (current) => !current
                  );
                }}
                aria-haspopup="dialog"
                aria-expanded={isDatePickerOpen}
                className={`
                  flex
                  w-full
                  min-w-0
                  items-center
                  justify-between
                  gap-3
                  rounded-xl
                  border
                  px-4
                  py-3
                  text-left
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
                      : isDark
                        ? `
                          border-slate-700
                          bg-slate-800
                          text-white
                          hover:border-slate-600
                          focus:border-blue-500
                          focus:ring-blue-900/50
                        `
                        : `
                          border-slate-200
                          bg-white
                          text-slate-700
                          hover:border-slate-300
                          focus:border-blue-500
                          focus:ring-blue-100
                        `
                  }
                `}
              >
                <span
                  className={
                    selectedDate
                      ? ""
                      : isDark
                        ? "text-slate-500"
                        : "text-slate-400"
                  }
                >
                  {displayDate}
                </span>

                <CalendarDays
                  size={18}
                  className={`
                    shrink-0
                    ${
                      isDark
                        ? "text-slate-400"
                        : "text-slate-500"
                    }
                  `}
                />
              </button>

              {isDatePickerOpen && (
                <div
                  role="dialog"
                  aria-label="Choose task date"
                  className={`
                    mt-2
                    w-full
                    overflow-hidden
                    rounded-2xl
                    border
                    box-border
                    p-2.5
                    shadow-lg

                    ${
                      isDark
                        ? "border-slate-700 bg-slate-900 shadow-black/30"
                        : "border-slate-200 bg-white shadow-slate-200/70"
                    }
                  `}
                >
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={goToPreviousMonth}
                      aria-label="Previous month"
                      className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        transition

                        ${
                          isDark
                            ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }
                      `}
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <div
                      className={`
                        text-sm
                        font-bold

                        ${
                          isDark
                            ? "text-white"
                            : "text-slate-800"
                        }
                      `}
                    >
                      {monthLabel}
                    </div>

                    <button
                      type="button"
                      onClick={goToNextMonth}
                      aria-label="Next month"
                      className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        transition

                        ${
                          isDark
                            ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }
                      `}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  <div className="mt-3 grid w-full grid-cols-7 gap-0.5 sm:gap-1">
                    {[
                      "Su",
                      "Mo",
                      "Tu",
                      "We",
                      "Th",
                      "Fr",
                      "Sa",
                    ].map((day) => (
                      <div
                        key={day}
                        className={`
                          flex
                          h-8
                          items-center
                          justify-center
                          text-[11px]
                          font-bold

                          ${
                            isDark
                              ? "text-slate-500"
                              : "text-slate-400"
                          }
                        `}
                      >
                        {day}
                      </div>
                    ))}

                    {calendarDays.map((date) => {
                      const isCurrentMonth =
                        date.getMonth() ===
                        calendarDate.getMonth();

                      const isSelected =
                        isSameDay(
                          selectedDate,
                          date
                        );

                      const isToday =
                        isSameDay(today, date);

                      return (
                        <button
                          key={formatDateValue(date)}
                          type="button"
                          onClick={() =>
                            selectDate(date)
                          }
                          className={`
                            flex
                            h-8
                            w-full
                            min-w-0
                            sm:h-9
                            items-center
                            justify-center
                            rounded-lg
                            text-xs
                            font-semibold
                            transition

                            ${
                              isSelected
                                ? "bg-blue-600 text-white shadow-sm"
                                : isCurrentMonth
                                  ? isDark
                                    ? "text-slate-200 hover:bg-slate-800"
                                    : "text-slate-700 hover:bg-slate-100"
                                  : isDark
                                    ? "text-slate-700 hover:bg-slate-800/60"
                                    : "text-slate-300 hover:bg-slate-50"
                            }

                            ${
                              isToday &&
                              !isSelected
                                ? isDark
                                  ? "ring-1 ring-blue-500"
                                  : "ring-1 ring-blue-400"
                                : ""
                            }
                          `}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>

                  <div
                    className={`
                      mt-3
                      flex
                      items-center
                      justify-between
                      border-t
                      pt-3

                      ${
                        isDark
                          ? "border-slate-800"
                          : "border-slate-100"
                      }
                    `}
                  >
                    <button
                      type="button"
                      onClick={clearDate}
                      className={`
                        rounded-lg
                        px-3
                        py-2
                        text-xs
                        font-bold
                        transition

                        ${
                          isDark
                            ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                        }
                      `}
                    >
                      Clear
                    </button>

                    <button
                      type="button"
                      onClick={selectToday}
                      className="
                        rounded-lg
                        px-3
                        py-2
                        text-xs
                        font-bold
                        text-blue-600
                        transition
                        hover:bg-blue-50
                        dark:text-blue-400
                        dark:hover:bg-blue-500/10
                      "
                    >
                      Today
                    </button>
                  </div>
                </div>
              )}

              {errors.date && (
                <p
                  className="
                    mt-1
                    text-sm
                    text-red-500
                  "
                >
                  {
                    errors.date.message
                  }
                </p>
              )}

            </div>

            {/* ================================= */}
            {/* STATUS */}
            {/* ================================= */}

            <div>

              <label
                htmlFor="task-status"
                className={`
                  mb-2
                  block
                  text-sm
                  font-semibold

                  transition-colors

                  ${
                    isDark
                      ? "text-slate-200"
                      : "text-slate-700"
                  }
                `}
              >
                Status

                <span className="text-red-500">
                  {" "}*
                </span>
              </label>

              <div className="min-w-0">
                <input
                  type="hidden"
                  {...register("status")}
                />

                <button
                  id="task-status"
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={openDropdown === "status"}
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsDatePickerOpen(false);
                    setOpenDropdown((current) =>
                      current === "status"
                        ? null
                        : "status"
                    );
                  }}
                  className={`
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    border
                    px-4
                    py-3
                    text-left
                    text-sm
                    font-medium
                    outline-none
                    transition
                    focus:ring-2

                    ${
                      isDark
                        ? `
                          border-slate-700
                          bg-slate-800
                          text-white
                          hover:border-slate-600
                          focus:border-blue-500
                          focus:ring-blue-900/50
                        `
                        : `
                          border-slate-200
                          bg-white
                          text-slate-700
                          hover:border-slate-300
                          focus:border-blue-500
                          focus:ring-blue-100
                        `
                    }
                  `}
                >
                  <span>
                    {statusValue === "completed"
                      ? "Completed"
                      : "Pending"}
                  </span>

                  <ChevronDown
                    size={17}
                    className={`
                      shrink-0
                      transition-transform
                      duration-200
                      ${
                        openDropdown === "status"
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  />
                </button>

                {openDropdown === "status" && (
                  <div
                    role="listbox"
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                    className={`
                      mt-2
                      w-full
                      max-h-48
                      overflow-y-auto
                      overflow-x-hidden
                      rounded-xl
                      border
                      p-1.5
                      shadow-xl
                      ${
                        isDark
                          ? "border-slate-700 bg-slate-900 shadow-black/40"
                          : "border-slate-200 bg-white shadow-slate-300/40"
                      }
                    `}
                  >
                    {[
                      ["pending", "Pending"],
                      ["completed", "Completed"],
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        role="option"
                        aria-selected={
                          statusValue === value
                        }
                        onClick={() => {
                          setValue(
                            "status",
                            value as TaskFormData["status"],
                            {
                              shouldValidate: true,
                              shouldDirty: true,
                            }
                          );
                          setOpenDropdown(null);
                        }}
                        className={`
                          flex
                          w-full
                          items-center
                          justify-between
                          rounded-lg
                          px-3
                          py-2.5
                          text-left
                          text-sm
                          font-semibold
                          transition
                          ${
                            statusValue === value
                              ? isDark
                                ? "bg-blue-500/10 text-blue-400"
                                : "bg-blue-50 text-blue-700"
                              : isDark
                                ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }
                        `}
                      >
                        <span>{label}</span>
                        {statusValue === value && (
                          <Check size={16} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {errors.status && (
                <p
                  className="
                    mt-1
                    text-sm
                    text-red-500
                  "
                >
                  {
                    errors.status.message
                  }
                </p>
              )}

            </div>

            {/* ================================= */}
            {/* PRIORITY */}
            {/* ================================= */}

            <div>

              <label
                htmlFor="task-priority"
                className={`
                  mb-2
                  block
                  text-sm
                  font-semibold

                  transition-colors

                  ${
                    isDark
                      ? "text-slate-200"
                      : "text-slate-700"
                  }
                `}
              >
                Priority

                <span className="text-red-500">
                  {" "}*
                </span>
              </label>

              <div className="min-w-0">
                <input
                  type="hidden"
                  {...register("priority")}
                />

                <button
                  id="task-priority"
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={openDropdown === "priority"}
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsDatePickerOpen(false);
                    setOpenDropdown((current) =>
                      current === "priority"
                        ? null
                        : "priority"
                    );
                  }}
                  className={`
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    border
                    px-4
                    py-3
                    text-left
                    text-sm
                    font-medium
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
                        : isDark
                          ? `
                            border-slate-700
                            bg-slate-800
                            text-white
                            hover:border-slate-600
                            focus:border-blue-500
                            focus:ring-blue-900/50
                          `
                          : `
                            border-slate-200
                            bg-white
                            text-slate-700
                            hover:border-slate-300
                            focus:border-blue-500
                            focus:ring-blue-100
                          `
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`
                        h-2
                        w-2
                        rounded-full
                        ${
                          priorityValue === "high"
                            ? "bg-red-500"
                            : priorityValue === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }
                      `}
                    />
                    {priorityValue.charAt(0).toUpperCase() +
                      priorityValue.slice(1)}
                  </span>

                  <ChevronDown
                    size={17}
                    className={`
                      shrink-0
                      transition-transform
                      duration-200
                      ${
                        openDropdown === "priority"
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  />
                </button>

                {openDropdown === "priority" && (
                  <div
                    role="listbox"
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                    className={`
                      mt-2
                      w-full
                      max-h-48
                      overflow-y-auto
                      overflow-x-hidden
                      rounded-xl
                      border
                      p-1.5
                      shadow-xl
                      ${
                        isDark
                          ? "border-slate-700 bg-slate-900 shadow-black/40"
                          : "border-slate-200 bg-white shadow-slate-300/40"
                      }
                    `}
                  >
                    {[
                      ["low", "Low"],
                      ["medium", "Medium"],
                      ["high", "High"],
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        role="option"
                        aria-selected={
                          priorityValue === value
                        }
                        onClick={() => {
                          setValue(
                            "priority",
                            value as TaskFormData["priority"],
                            {
                              shouldValidate: true,
                              shouldDirty: true,
                            }
                          );
                          setOpenDropdown(null);
                        }}
                        className={`
                          flex
                          w-full
                          items-center
                          justify-between
                          rounded-lg
                          px-3
                          py-2.5
                          text-left
                          text-sm
                          font-semibold
                          transition
                          ${
                            priorityValue === value
                              ? isDark
                                ? "bg-blue-500/10 text-blue-400"
                                : "bg-blue-50 text-blue-700"
                              : isDark
                                ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }
                        `}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={`
                              h-2
                              w-2
                              rounded-full
                              ${
                                value === "high"
                                  ? "bg-red-500"
                                  : value === "medium"
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                              }
                            `}
                          />
                          {label}
                        </span>

                        {priorityValue === value && (
                          <Check size={16} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

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
              className={`
                flex
                gap-3
                border-t
                pt-5

                ${
                  isDark
                    ? "border-slate-700"
                    : "border-slate-100"
                }
              `}
            >

              {/* CANCEL */}

              <button
                type="button"
                onClick={onClose}
                className={`
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
                        hover:text-white
                      `
                      : `
                        border-slate-200
                        text-slate-700
                        hover:bg-slate-50
                      `
                  }
                `}
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
                  shadow-blue-200/30
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