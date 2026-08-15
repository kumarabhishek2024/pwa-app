import {
  Home,
  ListTodo,
  User,
} from "lucide-react";

interface BottomNavProps {
  isModalOpen?: boolean;
  onProfileClick?: () => void;
}

const BottomNav = ({
  isModalOpen = false,
  onProfileClick,
}: BottomNavProps) => {

  // Modal open hai to navigation hide rahega
  if (isModalOpen) {
    return null;
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="
          fixed
          left-0
          top-0
          z-40
          hidden
          h-screen
          w-64
          border-r
          border-slate-100
          bg-white
          p-6
          shadow-sm
          lg:flex
          lg:flex-col
        "
      >

        <div>

          <h1
            className="
              text-2xl
              font-extrabold
              tracking-tight
              text-blue-600
            "
          >
            My Tasks
          </h1>

          <p
            className="
              mt-1
              text-sm
              font-medium
              text-slate-500
            "
          >
            Task Manager
          </p>

        </div>

        <nav
          className="
            mt-10
            space-y-3
          "
        >

          {/* Home */}
          <button
            type="button"
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              bg-blue-50
              px-4
              py-3
              text-left
              font-semibold
              text-blue-600
              shadow-sm
            "
          >
            <Home size={20} />
            Home
          </button>

          {/* Tasks */}
          <button
            type="button"
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-left
              font-medium
              text-slate-600
              transition
              hover:bg-slate-50
              hover:text-blue-600
            "
          >
            <ListTodo size={20} />
            Tasks
          </button>

          {/* Profile */}
          <button
            type="button"
            onClick={onProfileClick}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-left
              font-medium
              text-slate-600
              transition
              hover:bg-slate-50
              hover:text-blue-600
            "
          >
            <User size={20} />
            Profile
          </button>

        </nav>

      </aside>

      {/* Mobile Navigation */}
      <nav
        className="
          fixed
          bottom-0
          left-0
          z-40
          w-full
          border-t
          border-slate-100
          bg-white/95
          px-6
          py-3
          shadow-lg
          backdrop-blur-md
          lg:hidden
        "
      >

        <div
          className="
            flex
            justify-around
          "
        >

          {/* Home */}
          <button
            type="button"
            className="
              flex
              flex-col
              items-center
              gap-1
              font-semibold
              text-blue-600
            "
          >
            <Home size={22} />

            <span className="text-xs">
              Home
            </span>
          </button>

          {/* Tasks */}
          <button
            type="button"
            className="
              flex
              flex-col
              items-center
              gap-1
              text-slate-500
              transition
              hover:text-blue-600
            "
          >
            <ListTodo size={22} />

            <span className="text-xs">
              Tasks
            </span>
          </button>

          {/* Profile */}
          <button
            type="button"
            onClick={onProfileClick}
            className="
              flex
              flex-col
              items-center
              gap-1
              text-slate-500
              transition
              hover:text-blue-600
            "
          >
            <User size={22} />

            <span className="text-xs">
              Profile
            </span>
          </button>

        </div>

      </nav>
    </>
  );
};

export default BottomNav;