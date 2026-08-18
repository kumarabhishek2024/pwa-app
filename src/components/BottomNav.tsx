import {
  Home,
  ListTodo,
  User,
} from "lucide-react";

import {
  useTheme,
} from "../context/useTheme";

interface BottomNavProps {
  isModalOpen?: boolean;
  onProfileClick?: () => void;
}

const BottomNav = ({
  isModalOpen = false,
  onProfileClick,
}: BottomNavProps) => {
  const { theme } = useTheme();

  if (isModalOpen) {
    return null;
  }

  const isDark = theme === "dark";

  return (
    <>
      {/* ============================= */}
      {/* DESKTOP SIDEBAR */}
      {/* ============================= */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-40
          hidden
          h-screen
          w-64
          flex-col
          border-r
          p-6
          shadow-sm
          transition-colors
          duration-300
          lg:flex

          ${
            isDark
              ? `
                border-slate-800
                bg-slate-950
                shadow-black/20
              `
              : `
                border-slate-200
                bg-white
                shadow-slate-200/60
              `
          }
        `}
      >
        <div>
          <h1
            className={`
              text-2xl
              font-bold
              leading-tight
              tracking-tight

              ${
                isDark
                  ? "text-blue-400"
                  : "text-blue-600"
              }
            `}
          >
            My Tasks
          </h1>

          <p
            className={`
              mt-1
              text-[13px]
              font-medium
              leading-5

              ${
                isDark
                  ? "text-slate-400"
                  : "text-slate-500"
              }
            `}
          >
            Task Manager
          </p>
        </div>

        <nav className="mt-10 space-y-3">

          {/* HOME */}

          <button
            type="button"
            className={`
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-left
              text-[13px]
              font-semibold
              leading-5
              transition-all

              ${
                isDark
                  ? `
                    bg-blue-500/10
                    text-blue-400
                    shadow-sm
                  `
                  : `
                    bg-blue-50
                    text-blue-600
                    shadow-sm
                  `
              }
            `}
          >
            <Home size={20} />
            Home
          </button>

          {/* TASKS */}

          <button
            type="button"
            className={`
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-left
              text-[13px]
              font-medium
              leading-5
              transition-all

              ${
                isDark
                  ? `
                    text-slate-400
                    hover:bg-slate-900
                    hover:text-blue-400
                  `
                  : `
                    text-slate-600
                    hover:bg-slate-50
                    hover:text-blue-600
                  `
              }
            `}
          >
            <ListTodo size={20} />
            Tasks
          </button>

          {/* PROFILE */}

          <button
            type="button"
            onClick={onProfileClick}
            className={`
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-left
              text-[13px]
              font-medium
              leading-5
              transition-all

              ${
                isDark
                  ? `
                    text-slate-400
                    hover:bg-slate-900
                    hover:text-blue-400
                  `
                  : `
                    text-slate-600
                    hover:bg-slate-50
                    hover:text-blue-600
                  `
              }
            `}
          >
            <User size={20} />
            Profile
          </button>

        </nav>
      </aside>

      {/* ============================= */}
      {/* MOBILE NAVIGATION */}
      {/* ============================= */}

      <nav
        className={`
          fixed
          bottom-0
          left-0
          z-40
          w-full
          border-t
          px-4
          py-3
          shadow-lg
          backdrop-blur-xl
          transition-colors
          duration-300
          lg:hidden
          sm:px-6

          ${
            isDark
              ? `
                border-slate-800
                bg-slate-950/95
              `
              : `
                border-slate-200
                bg-white/95
              `
          }
        `}
      >
        <div className="flex justify-around">

          {/* HOME */}

          <button
            type="button"
            className={`
              flex
              min-w-16
              flex-col
              items-center
              gap-1
              rounded-xl
              px-2
              py-1
              font-semibold
              transition

              ${
                isDark
                  ? "text-blue-400"
                  : "text-blue-600"
              }
            `}
          >
            <Home size={22} />

            <span className="text-[11px] font-medium leading-4">
              Home
            </span>
          </button>

          {/* TASKS */}

          <button
            type="button"
            className={`
              flex
              min-w-16
              flex-col
              items-center
              gap-1
              rounded-xl
              px-2
              py-1
              transition

              ${
                isDark
                  ? `
                    text-slate-500
                    hover:bg-slate-800
                    hover:text-blue-400
                  `
                  : `
                    text-slate-500
                    hover:bg-slate-50
                    hover:text-blue-600
                  `
              }
            `}
          >
            <ListTodo size={22} />

            <span className="text-[11px] font-medium leading-4">
              Tasks
            </span>
          </button>

          {/* PROFILE */}

          <button
            type="button"
            onClick={onProfileClick}
            className={`
              flex
              min-w-16
              flex-col
              items-center
              gap-1
              rounded-xl
              px-2
              py-1
              transition

              ${
                isDark
                  ? `
                    text-slate-500
                    hover:bg-slate-800
                    hover:text-blue-400
                  `
                  : `
                    text-slate-500
                    hover:bg-slate-50
                    hover:text-blue-600
                  `
              }
            `}
          >
            <User size={22} />

            <span className="text-[11px] font-medium leading-4">
              Profile
            </span>
          </button>

        </div>
      </nav>
    </>
  );
};

export default BottomNav;