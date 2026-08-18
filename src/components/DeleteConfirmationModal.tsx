import {
  AlertTriangle,
  Trash2,
  X,
} from "lucide-react";

import { useTheme } from "../context/useTheme";
import type { Task } from "../types/task";

interface DeleteConfirmationModalProps {
  task: Task | null;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteConfirmationModal({
  task,
  onClose,
  onConfirm,
}: DeleteConfirmationModalProps) {
  const { isDark } = useTheme();

  if (!task) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[10000]
        flex
        items-center
        justify-center
        bg-black/60
        p-3
        backdrop-blur-sm
        sm:p-5
        md:p-6
        lg:p-8
      "
      onClick={onClose}
    >
      {/* ========================================= */}
      {/* DELETE MODAL */}
      {/* ========================================= */}

      <div
        className={`
          w-[calc(100vw-24px)]
          max-w-[560px]
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          border
          shadow-2xl
          transition-colors
          duration-300

          sm:w-[calc(100vw-40px)]
          md:max-w-[600px]
          lg:max-w-[620px]

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
                shadow-slate-300/40
              `
          }
        `}
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-3
            px-4
            py-4

            sm:gap-4
            sm:px-6
            sm:py-5

            lg:px-7
            lg:py-6
          "
        >
          <div
            className="
              flex
              min-w-0
              items-center
              gap-3

              sm:gap-4
            "
          >
            {/* WARNING ICON */}

            <div
              className={`
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl

                sm:h-12
                sm:w-12

                ${
                  isDark
                    ? "bg-red-500/10"
                    : "bg-red-100"
                }
              `}
            >
              <AlertTriangle
                size={22}
                strokeWidth={2.2}
                className={
                  isDark
                    ? "text-red-400"
                    : "text-red-600"
                }
              />
            </div>

            {/* TITLE */}

            <div className="min-w-0">
              <h2
                className={`
                  text-lg
                  font-bold
                  leading-6

                  sm:text-xl

                  ${
                    isDark
                      ? "text-white"
                      : "text-slate-900"
                  }
                `}
              >
                Delete Task
              </h2>

              <p
                className={`
                  mt-1
                  text-[12px]
                  leading-4

                  sm:text-[13px]

                  ${
                    isDark
                      ? "text-slate-500"
                      : "text-slate-400"
                  }
                `}
              >
                Confirmation required
              </p>
            </div>
          </div>

          {/* CLOSE */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close delete confirmation"
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

        {/* ========================================= */}
        {/* CONTENT */}
        {/* ========================================= */}

        <div
          className="
            px-4
            pb-4

            sm:px-6
            sm:pb-6

            lg:px-7
            lg:pb-7
          "
        >
          {/* MESSAGE */}

          <p
            className={`
              text-[13px]
              leading-5

              sm:text-sm
              sm:leading-6

              ${
                isDark
                  ? "text-slate-300"
                  : "text-slate-600"
              }
            `}
          >
            Are you sure you want to delete this task?
            This action cannot be undone.
          </p>

          {/* ========================================= */}
          {/* TASK PREVIEW */}
          {/* ========================================= */}

          <div
            className={`
              mt-4
              rounded-xl
              border
              p-4

              sm:mt-5
              sm:p-5

              ${
                isDark
                  ? `
                    border-slate-700
                    bg-slate-800/60
                  `
                  : `
                    border-slate-200
                    bg-slate-50
                  `
              }
            `}
          >
            <p
              className={`
                break-words
                text-[13px]
                font-semibold
                leading-5

                sm:text-sm

                ${
                  isDark
                    ? "text-white"
                    : "text-slate-900"
                }
              `}
            >
              {task.title}
            </p>

            {task.description && (
              <p
                className={`
                  mt-1.5
                  line-clamp-2
                  break-words
                  text-[12px]
                  leading-5

                  sm:text-[13px]
                  sm:leading-5

                  ${
                    isDark
                      ? "text-slate-400"
                      : "text-slate-500"
                  }
                `}
              >
                {task.description}
              </p>
            )}
          </div>

          {/* ========================================= */}
          {/* ACTION BUTTONS */}
          {/* ========================================= */}

          <div
            className="
              mt-5
              flex
              flex-col-reverse
              gap-3

              sm:mt-6
              sm:flex-row
              sm:justify-end
            "
          >
            {/* CANCEL */}

            <button
              type="button"
              onClick={onClose}
              className={`
                flex
                min-h-11
                w-full
                items-center
                justify-center
                rounded-xl
                border
                px-5
                py-3
                text-[13px]
                font-semibold
                leading-5
                transition

                sm:w-auto

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

            {/* DELETE */}

            <button
              type="button"
              onClick={onConfirm}
              className="
                flex
                min-h-11
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-red-600
                px-5
                py-3
                text-[13px]
                font-semibold
                leading-5
                text-white
                shadow-md
                shadow-red-500/20
                transition

                hover:bg-red-700
                active:scale-[0.98]

                sm:w-auto
              "
            >
              <Trash2
                size={17}
                strokeWidth={2.4}
              />

              Delete Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;