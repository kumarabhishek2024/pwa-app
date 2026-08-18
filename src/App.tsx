import { useEffect, useState } from "react";
import { ChevronDown, Check, Plus, Trophy, Search } from "lucide-react";
import { Toaster, toast } from "sonner";
import { useTheme } from "./context/useTheme";

import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import TaskList from "./components/TaskList";
import BottomNav from "./components/BottomNav";
import AddTaskModal from "./components/AddTaskModal";
import ProfileModal, {
  type ProfileData,
} from "./components/ProfileModal";
import TaskDetailsModal from "./components/TaskDetailsModal";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";

import type { Task } from "./types/task";

// ============================================
// DEFAULT TASKS
// ============================================

const defaultTasks: Task[] = [
  {
    id: 1,
    title: "Learn React",
    description:
      "Complete the React basics and practice components.",
    status: "pending",
    date: "2026-08-12",
    priority: "high",
  },

  {
    id: 2,
    title: "Learn PWA",
    description:
      "Understand PWA concepts and build a sample app.",
    status: "pending",
    date: "2026-08-14",
    priority: "medium",
  },

  {
    id: 3,
    title: "Create React Project",
    description:
      "Setup Vite project and structure the application.",
    status: "completed",
    date: "2026-08-15",
    priority: "low",
  },
];

// ============================================
// DEFAULT PROFILE
// ============================================

const defaultProfile: ProfileData = {
  name: "Abhishek",
  image: "",
};

// ============================================
// FILTER TYPE
// ============================================

type FilterStatus =
  | "all"
  | "pending"
  | "completed";

type SortOption =
  | "newest"
  | "oldest"
  | "priority";

// ============================================
// APP
// ============================================

function App() {

  // ==========================================
  // DYNAMIC GREETING
  // ==========================================

  const [currentHour, setCurrentHour] =
    useState(new Date().getHours());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 16
        ? "Good Afternoon"
        : currentHour < 20
          ? "Good Evening"
          : "Good Night";

  // ==========================================
  // TASKS STATE
  // ==========================================

  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks =
      localStorage.getItem("tasks");

    if (!savedTasks) {
      return defaultTasks;
    }

    try {
      const parsedTasks = JSON.parse(
        savedTasks
      );

      if (!Array.isArray(parsedTasks)) {
        return defaultTasks;
      }

      return parsedTasks.map(
        (task: Task) => ({
          ...task,
          priority:
            task.priority ?? "medium",
        })
      );
    } catch {
      return defaultTasks;
    }
  });

  // ==========================================
  // PROFILE STATE
  // ==========================================

  const [profile, setProfile] =
    useState<ProfileData>(() => {
      const savedProfile =
        localStorage.getItem("profile");

      if (!savedProfile) {
        return defaultProfile;
      }

      try {
        const parsedProfile =
          JSON.parse(savedProfile);

        return {
          name:
            typeof parsedProfile.name === "string"
              ? parsedProfile.name
              : defaultProfile.name,

          image:
            typeof parsedProfile.image === "string"
              ? parsedProfile.image
              : defaultProfile.image,
        };
      } catch {
        return defaultProfile;
      }
    });

  // ==========================================
  // TASK MODAL STATE
  // ==========================================

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState<Task | null>(null);

  // ==========================================
  // PROFILE MODAL STATE
  // ==========================================

  const [
    isProfileModalOpen,
    setIsProfileModalOpen,
  ] = useState(false);

  // ==========================================
  // PROFILE SUCCESS MESSAGE
  // ==========================================

  const [showProfileSaved, setShowProfileSaved] =
    useState(false);

  // ==========================================
  // SEARCH STATE
  // ==========================================

  const [searchQuery, setSearchQuery] =
    useState("");

  // ==========================================
  // FILTER STATE
  // ==========================================

  const [filterStatus, setFilterStatus] =
    useState<FilterStatus>("all");

  // ==========================================
  // SORT STATE
  // ==========================================

  const [sortOption, setSortOption] =
    useState<SortOption>("newest");

  // Custom dropdown state.
  // Using custom menus instead of native <select> keeps the dropdown
  // consistent on mobile/tablet/desktop and prevents browser-native
  // menus from opening outside the emulated viewport.
  const [openDropdown, setOpenDropdown] =
    useState<"filter" | "sort" | null>(null);

  // Close the custom dropdown when clicking outside it.
  // This is declared AFTER openDropdown so TypeScript/React
  // never sees the state variable before its declaration.
  useEffect(() => {
    const handleOutsideClick = () => {
      setOpenDropdown(null);
    };

    if (openDropdown === null) {
      return;
    }

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
  // GLOBAL THEME
  // ==========================================

  const { isDark } = useTheme();

  // ==========================================
  // TASK DETAILS MODAL
  // ==========================================

  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);

  // ==========================================
  // DELETE CONFIRMATION MODAL
  // ==========================================

  const [taskToDelete, setTaskToDelete] =
    useState<Task | null>(null);

  // ==========================================
  // SAVE TASKS TO LOCAL STORAGE
  // ==========================================

  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  // ==========================================
  // SAVE PROFILE TO LOCAL STORAGE
  // ==========================================

  useEffect(() => {
    localStorage.setItem(
      "profile",
      JSON.stringify(profile)
    );
  }, [profile]);

  // ==========================================
  // ADD TASK
  // ==========================================

  const addTask = (
    newTask: Omit<Task, "id">
  ) => {
    setTasks((previousTasks) => {
      const highestId =
        previousTasks.length > 0
          ? Math.max(
              ...previousTasks.map(
                (task) => task.id
              )
            )
          : 0;

      const taskWithId: Task = {
        ...newTask,
        id: highestId + 1,
      };

      return [
        ...previousTasks,
        taskWithId,
      ];
    });

    toast.success("Task added successfully!");
    setIsModalOpen(false);
  };

  // ==========================================
  // OPEN EDIT TASK
  // ==========================================

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // ==========================================
  // UPDATE TASK
  // ==========================================

  const updateTask = (
    updatedTask: Task
  ) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === updatedTask.id
          ? updatedTask
          : task
      )
    );

    toast.success("Task updated successfully!");
    setEditingTask(null);
    setIsModalOpen(false);
  };

  // ==========================================
  // DELETE TASK
  // ==========================================

  const openDeleteModal = (id: number) => {
    const task = tasks.find(
      (item) => item.id === id
    );

    if (!task) {
      return;
    }

    setSelectedTask(null);
    setTaskToDelete(task);
  };

  // ==========================================
  // CONFIRM DELETE TASK
  // ==========================================

  const confirmDeleteTask = () => {
    if (!taskToDelete) {
      return;
    }

    const id = taskToDelete.id;

    setTasks((previousTasks) =>
      previousTasks.filter(
        (task) => task.id !== id
      )
    );

    setTaskToDelete(null);

    toast.success("Task deleted successfully!");
  };

  // ==========================================
  // CLOSE TASK MODAL
  // ==========================================

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // ==========================================
  // OPEN PROFILE MODAL
  // ==========================================

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  // ==========================================
  // CLOSE PROFILE MODAL
  // ==========================================

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const handleSaveProfile = (
    updatedProfile: ProfileData
  ) => {
    setProfile(updatedProfile);

    setIsProfileModalOpen(false);

    // PROFILE SUCCESS MESSAGE
    setShowProfileSaved(true);

    setTimeout(() => {
      setShowProfileSaved(false);
    }, 2500);
  };

  // ==========================================
  // OPEN TASK DETAILS
  // ==========================================

  const openTaskDetails = (task: Task) => {
    setSelectedTask(task);
  };

  // ==========================================
  // MARK COMPLETED / PENDING
  // ==========================================

  const toggleTask = (id: number) => {
    const task = tasks.find(
      (item) => item.id === id
    );

    if (!task) {
      return;
    }

    const isCompleting =
      task.status !== "completed";

    setTasks((previousTasks) =>
      previousTasks.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "completed"
                  ? "pending"
                  : "completed",
            }
          : item
      )
    );

    if (isCompleting) {
      toast.success("Task completed successfully!");
    } else {
      toast.success("Task marked as pending.");
    }
  };

  // ==========================================
  // TASK COUNTERS
  // ==========================================

  const totalTasks = tasks.length;

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status === "completed"
    ).length;

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status === "pending"
    ).length;

  // ==========================================
  // SEARCH + FILTER
  // ==========================================

  const filteredTasks = tasks.filter(
    (task) => {
      const searchText =
        searchQuery
          .trim()
          .toLowerCase();

      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(searchText) ||
        task.description
          .toLowerCase()
          .includes(searchText);

      const matchesFilter =
        filterStatus === "all" ||
        task.status === filterStatus;

      return (
        matchesSearch &&
        matchesFilter
      );
    }
  );

  // ==========================================
  // SORT TASKS
  // ==========================================

  const sortedTasks = [...filteredTasks].sort(
    (a, b) => {
      if (sortOption === "newest") {
        return b.id - a.id;
      }

      if (sortOption === "oldest") {
        return a.id - b.id;
      }

      const priorityOrder = {
        high: 3,
        medium: 2,
        low: 1,
      };

      return (
        priorityOrder[b.priority] -
        priorityOrder[a.priority]
      );
    }
  );

  // ==========================================
  // UI
  // ==========================================

  return (
    <>
      <Toaster
        position="bottom-right"
        duration={2500}
        richColors
        closeButton
        theme={isDark ? "dark" : "light"}
        toastOptions={{
          className: "font-semibold",
        }}
      />

      <div
        className={`
          min-h-screen
          w-full
          overflow-x-hidden
          scroll-smooth
          transition-colors
          duration-300
          ${
            isDark
              ? "bg-slate-950 text-white"
              : "bg-slate-50 text-slate-900"
          }
        `}
      >

      <main
        className="
          min-h-screen
          w-full
          pb-24
          lg:ml-64
          lg:w-[calc(100%-16rem)]
          lg:pb-0
        "
      >

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <Header
          profile={profile}
          onProfileClick={
            openProfileModal
          }
        />

        {/* ================================= */}
        {/* GREETING */}
        {/* ================================= */}

        <section
          className="
            px-5
            pb-6
            pt-6
            lg:px-10
            lg:pb-8
            lg:pt-8
          "
        >

          <h2
            className={`
              text-2xl
              font-extrabold
              tracking-tight
              lg:text-3xl
              ${
                isDark
                  ? "text-white"
                  : "text-slate-900"
              }
            `}
          >
            {greeting}, {profile.name}
          </h2>

          <p
            className={`
              mt-2
              text-base
              ${
                isDark
                  ? "text-slate-400"
                  : "text-slate-500"
              }
            `}
          >
            Let's make today productive.
          </p>

        </section>

        {/* ================================= */}
        {/* COUNTERS */}
        {/* ================================= */}

        <SummaryCards
          total={totalTasks}
          pending={pendingTasks}
          completed={completedTasks}
        />

        {/* ================================= */}
        {/* TASK SECTION */}
        {/* ================================= */}

        <section
          className="
            mt-8
            lg:mt-10
          "
        >

          {/* HEADING */}

          <div
            className="
              px-5
              lg:px-10
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
                gap-4
              "
            >

              <div>

                <h2
                  className={`
                    text-2xl
                    font-extrabold
                    lg:text-3xl
                    ${
                      isDark
                        ? "text-white"
                        : "text-slate-900"
                    }
                  `}
                >
                  Your Tasks
                </h2>

                <p
                  className={`
                    mt-1
                    hidden
                    text-sm
                    lg:block
                    ${
                      isDark
                        ? "text-slate-400"
                        : "text-slate-500"
                    }
                  `}
                >
                  Keep track of your daily activities
                </p>

              </div>

              {/* ADD TASK */}

              <button
                type="button"
                onClick={() => {
                  setEditingTask(null);
                  setIsModalOpen(true);
                }}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-4
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-md
                  shadow-blue-500/20
                  transition-all
                  duration-200
                  hover:bg-blue-700
                  hover:shadow-lg
                  active:scale-95
                "
              >

                <Plus size={18} />

                <span className="hidden sm:inline">
                  Add Task
                </span>

              </button>

            </div>

            {/* ================================= */}
            {/* SEARCH + FILTER */}
            {/* ================================= */}

            <div
              className={`
                mt-5
                rounded-2xl
                border
                p-3
                shadow-sm
                transition-colors
                duration-300
                sm:p-4
                ${
                  isDark
                    ? `
                      border-slate-800
                      bg-slate-900
                    `
                    : `
                      border-slate-200
                      bg-white
                    `
                }
              `}
            >

              <div
                className="
                  flex
                  flex-col
                  gap-3
                  sm:flex-row
                  sm:items-center
                "
              >

                {/* SEARCH */}

                <div className="relative min-w-0 flex-1">

                  <Search
                    size={18}
                    className={`
                      pointer-events-none
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      ${
                        isDark
                          ? "text-slate-500"
                          : "text-slate-400"
                      }
                    `}
                  />

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(event.target.value)
                    }
                    placeholder="Search tasks..."
                    aria-label="Search tasks"
                    className={`
                      w-full
                      rounded-xl
                      border
                      py-3
                      pl-11
                      pr-10
                      text-sm
                      font-medium
                      outline-none
                      transition
                      focus:ring-2
                      ${
                        isDark
                          ? `
                            border-slate-800
                            bg-slate-950
                            text-white
                            placeholder:text-slate-500
                            focus:border-blue-500
                            focus:ring-blue-500/10
                          `
                          : `
                            border-slate-200
                            bg-slate-50
                            text-slate-700
                            placeholder:text-slate-400
                            focus:border-blue-500
                            focus:bg-white
                            focus:ring-blue-100
                          `
                      }
                    `}
                  />

                  {/* CLEAR SEARCH */}

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search"
                      className={`
                        absolute
                        right-3
                        top-1/2
                        flex
                        h-7
                        w-7
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-lg
                        text-sm
                        font-bold
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
                              hover:bg-slate-200
                              hover:text-slate-700
                            `
                        }
                      `}
                    >
                      ×
                    </button>
                  )}

                </div>

                {/* FILTER */}

                <div
                  className="
                    relative
                    sm:w-48
                    sm:shrink-0
                  "
                >
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={openDropdown === "filter"}
                    aria-label="Filter tasks by status"
                    onClick={(event) => {
                      event.stopPropagation();
                      setOpenDropdown((current) =>
                        current === "filter"
                          ? null
                          : "filter"
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
                      font-semibold
                      outline-none
                      transition
                      focus:ring-2
                      ${
                        isDark
                          ? `
                            border-slate-800
                            bg-slate-950
                            text-white
                            hover:border-slate-700
                            focus:border-blue-500
                            focus:ring-blue-500/10
                          `
                          : `
                            border-slate-200
                            bg-slate-50
                            text-slate-700
                            hover:border-slate-300
                            focus:border-blue-500
                            focus:bg-white
                            focus:ring-blue-100
                          `
                      }
                    `}
                  >
                    <span>
                      {filterStatus === "all"
                        ? "All Tasks"
                        : filterStatus === "pending"
                          ? "Pending"
                          : "Completed"}
                    </span>

                    <ChevronDown
                      size={17}
                      className={`
                        shrink-0
                        transition-transform
                        duration-200
                        ${
                          openDropdown === "filter"
                            ? "rotate-180"
                            : ""
                        }
                      `}
                    />
                  </button>

                  {openDropdown === "filter" && (
                    <div
                      role="listbox"
                      aria-label="Filter options"
                      onClick={(event) =>
                        event.stopPropagation()
                      }
                      className={`
                        absolute
                        left-0
                        top-[calc(100%+6px)]
                        z-[100]
                        w-full
                        overflow-hidden
                        rounded-xl
                        border
                        p-1.5
                        shadow-xl
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
                    >
                      {[
                        ["all", "All Tasks"],
                        ["pending", "Pending"],
                        ["completed", "Completed"],
                      ].map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          role="option"
                          aria-selected={
                            filterStatus === value
                          }
                          onClick={() => {
                            setFilterStatus(
                              value as FilterStatus
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
                              filterStatus === value
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
                          {filterStatus === value && (
                            <Check size={16} />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* SORT */}

                <div
                  className="
                    relative
                    sm:w-48
                    sm:shrink-0
                  "
                >
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={openDropdown === "sort"}
                    aria-label="Sort tasks"
                    onClick={(event) => {
                      event.stopPropagation();
                      setOpenDropdown((current) =>
                        current === "sort"
                          ? null
                          : "sort"
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
                      font-semibold
                      outline-none
                      transition
                      focus:ring-2
                      ${
                        isDark
                          ? `
                            border-slate-800
                            bg-slate-950
                            text-white
                            hover:border-slate-700
                            focus:border-blue-500
                            focus:ring-blue-500/10
                          `
                          : `
                            border-slate-200
                            bg-slate-50
                            text-slate-700
                            hover:border-slate-300
                            focus:border-blue-500
                            focus:bg-white
                            focus:ring-blue-100
                          `
                      }
                    `}
                  >
                    <span>
                      {sortOption === "newest"
                        ? "Newest"
                        : sortOption === "oldest"
                          ? "Oldest"
                          : "Priority"}
                    </span>

                    <ChevronDown
                      size={17}
                      className={`
                        shrink-0
                        transition-transform
                        duration-200
                        ${
                          openDropdown === "sort"
                            ? "rotate-180"
                            : ""
                        }
                      `}
                    />
                  </button>

                  {openDropdown === "sort" && (
                    <div
                      role="listbox"
                      aria-label="Sort options"
                      onClick={(event) =>
                        event.stopPropagation()
                      }
                      className={`
                        absolute
                        left-0
                        top-[calc(100%+6px)]
                        z-[100]
                        w-full
                        overflow-hidden
                        rounded-xl
                        border
                        p-1.5
                        shadow-xl
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
                    >
                      {[
                        ["newest", "Newest"],
                        ["oldest", "Oldest"],
                        ["priority", "Priority"],
                      ].map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          role="option"
                          aria-selected={
                            sortOption === value
                          }
                          onClick={() => {
                            setSortOption(
                              value as SortOption
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
                              sortOption === value
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
                          {sortOption === value && (
                            <Check size={16} />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* ACTIVE FILTER SUMMARY */}

              {(searchQuery.trim() ||
                filterStatus !== "all") && (
                <div
                  className={`
                    mt-3
                    flex
                    flex-wrap
                    items-center
                    justify-between
                    gap-2
                    border-t
                    pt-3
                    text-xs
                    font-semibold
                    ${
                      isDark
                        ? "border-slate-800 text-slate-400"
                        : "border-slate-100 text-slate-500"
                    }
                  `}
                >

                  <span>
                    {sortedTasks.length}{" "}
                    {sortedTasks.length === 1
                      ? "task"
                      : "tasks"}{" "}
                    found
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setFilterStatus("all");
                    }}
                    className={`
                      rounded-lg
                      px-2.5
                      py-1.5
                      transition
                      ${
                        isDark
                          ? `
                            text-blue-400
                            hover:bg-blue-500/10
                          `
                          : `
                            text-blue-600
                            hover:bg-blue-50
                          `
                      }
                    `}
                  >
                    Clear filters
                  </button>

                </div>
              )}

            </div>

          </div>

          {/* ================================= */}
          {/* TASK LIST */}
          {/* ================================= */}

          <div className="mt-5">

            {sortedTasks.length > 0 ? (

              <TaskList
                tasks={sortedTasks}
                onToggle={toggleTask}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
                onTaskClick={openTaskDetails}
              />

            ) : tasks.length === 0 ? (

              <div
                className={`
                  mx-5
                  overflow-hidden
                  rounded-3xl
                  border
                  p-8
                  text-center
                  shadow-sm
                  lg:mx-10
                  lg:p-12
                  ${
                    isDark
                      ? "border-slate-800 bg-slate-900"
                      : "border-slate-200 bg-white"
                  }
                `}
              >

                <div
                  className={`
                    mx-auto
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    ${isDark ? "bg-blue-500/10" : "bg-blue-50"}
                  `}
                >
                  <Plus
                    size={30}
                    strokeWidth={2.5}
                    className={isDark ? "text-blue-400" : "text-blue-600"}
                  />
                </div>

                <h3
                  className={`
                    mt-5
                    text-xl
                    font-extrabold
                    tracking-tight
                    lg:text-2xl
                    ${isDark ? "text-white" : "text-slate-900"}
                  `}
                >
                  No tasks yet
                </h3>

                <p
                  className={`
                    mx-auto
                    mt-2
                    max-w-md
                    text-sm
                    leading-6
                    lg:text-base
                    ${isDark ? "text-slate-400" : "text-slate-500"}
                  `}
                >
                  You don't have any tasks right now.
                  Create your first task and start getting things done.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedTask(null);
                    setEditingTask(null);
                    setIsModalOpen(true);
                  }}
                  className="
                    mx-auto
                    mt-6
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-3
                    text-sm
                    font-bold
                    text-white
                    shadow-md
                    shadow-blue-500/20
                    transition-all
                    duration-200
                    hover:bg-blue-700
                    hover:shadow-lg
                    active:scale-95
                  "
                >
                  <Plus size={18} />
                  Add Your First Task
                </button>

              </div>

            ) : (

              <div
                className={`
                  mx-5
                  rounded-3xl
                  border
                  border-dashed
                  p-8
                  text-center
                  lg:mx-10
                  lg:p-10
                  ${
                    isDark
                      ? "border-slate-700 bg-slate-900"
                      : "border-slate-300 bg-white"
                  }
                `}
              >

                <div
                  className={`
                    mx-auto
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    ${isDark ? "bg-slate-800" : "bg-slate-100"}
                  `}
                >
                  <Search
                    size={25}
                    className={isDark ? "text-slate-400" : "text-slate-500"}
                  />
                </div>

                <h3
                  className={`
                    mt-4
                    text-lg
                    font-extrabold
                    ${isDark ? "text-slate-200" : "text-slate-800"}
                  `}
                >
                  No tasks found
                </h3>

                <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-500">
                  No tasks match your current search or filter.
                  Try changing your search or filter.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterStatus("all");
                  }}
                  className={`
                    mt-5
                    rounded-xl
                    px-4
                    py-2.5
                    text-sm
                    font-bold
                    transition
                    ${
                      isDark
                        ? "bg-slate-800 text-slate-200 hover:bg-slate-700"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }
                  `}
                >
                  Clear Search & Filter
                </button>

              </div>

            )}

          </div>

        </section>

        {/* ================================= */}
        {/* PROGRESS */}
        {/* ================================= */}

        <section
          className={`
            mx-5
            mt-8
            rounded-2xl
            border
            p-5
            transition-colors
            duration-300
            lg:mx-10
            lg:mt-10
            lg:p-7
            ${
              isDark
                ? `
                  border-blue-500/20
                  bg-blue-500/5
                `
                : `
                  border-blue-100
                  bg-blue-50
                `
            }
          `}
        >

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <div
              className={`
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-full
                ${
                  isDark
                    ? "bg-blue-500/10"
                    : "bg-blue-100"
                }
              `}
            >

              <Trophy
                size={26}
                className={
                  isDark
                    ? "text-blue-400"
                    : "text-blue-600"
                }
              />

            </div>

            <div>

              <h3
                className={`
                  text-lg
                  font-extrabold
                  lg:text-xl
                  ${
                    isDark
                      ? "text-blue-400"
                      : "text-blue-700"
                  }
                `}
              >
                Great Progress!
              </h3>

              <p
                className={`
                  mt-1
                  text-sm
                  ${
                    isDark
                      ? "text-slate-400"
                      : "text-slate-600"
                  }
                `}
              >
                You have completed{" "}
                {completedTasks} tasks.
              </p>

              <p
                className={`
                  mt-1
                  text-sm
                  ${
                    isDark
                      ? "text-slate-400"
                      : "text-slate-600"
                  }
                `}
              >
                Keep going!
              </p>

            </div>

          </div>

        </section>

        {/* ================================= */}
        {/* ADD / EDIT TASK MODAL */}
        {/* ================================= */}

        {isModalOpen && (
  <AddTaskModal
    onClose={closeModal}
    onAddTask={addTask}
    onUpdateTask={updateTask}
    editingTask={editingTask}
  />
)}

        {/* ================================= */}
        {/* PROFILE MODAL */}
        {/* ================================= */}

      {isProfileModalOpen && (
  <ProfileModal
    profile={profile}
    onClose={closeProfileModal}
    onSave={handleSaveProfile}
  />
)}
        {/* ================================= */}
        {/* TASK DETAILS MODAL */}
        {/* ================================= */}

        {selectedTask && (
          <TaskDetailsModal
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onEdit={(task: Task) => {
              setSelectedTask(null);
              openEditModal(task);
            }}
          />
        )}

        {/* ================================= */}
        {/* DELETE CONFIRMATION MODAL */}
        {/* ================================= */}

        {taskToDelete && (
          <DeleteConfirmationModal
            task={taskToDelete}
            onClose={() => setTaskToDelete(null)}
            onConfirm={confirmDeleteTask}
          />
        )}

        {/* ================================= */}
        {/* PROFILE SUCCESS MESSAGE */}
        {/* ================================= */}

        {showProfileSaved && (
          <div
            className="
              fixed
              bottom-6
              right-6
              z-[10000]
              flex
              items-center
              gap-3
              rounded-xl
              bg-green-600
              px-5
              py-3
              text-sm
              font-bold
              text-white
              shadow-xl
              animate-in
              fade-in
              slide-in-from-bottom-3
              duration-300
            "
          >

            <span
              className="
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-full
                bg-white/20
                text-sm
              "
            >
              ✓
            </span>

            <span>
              Profile saved successfully!
            </span>

          </div>
        )}

        {/* ================================= */}
        {/* BOTTOM NAVIGATION */}
        {/* ================================= */}

        <BottomNav
          isModalOpen={
            isModalOpen ||
            isProfileModalOpen ||
            selectedTask !== null ||
            taskToDelete !== null
          }
          onProfileClick={
            openProfileModal
          }
        />

      </main>

    </div>
    </>
  );
}

export default App;