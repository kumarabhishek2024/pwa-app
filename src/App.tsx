import { useEffect, useState } from "react";
import { Plus, Trophy, Search } from "lucide-react";

import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import TaskList from "./components/TaskList";
import BottomNav from "./components/BottomNav";
import AddTaskModal from "./components/AddTaskModal";
import ProfileModal, {
  type ProfileData,
} from "./components/ProfileModal";

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
  // TASK SUCCESS MESSAGE
  // ==========================================

  const [taskSuccessMessage, setTaskSuccessMessage] =
    useState("");

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

    // SUCCESS MESSAGE
    setTaskSuccessMessage(
      "Task added successfully!"
    );

    setIsModalOpen(false);

    setTimeout(() => {
      setTaskSuccessMessage("");
    }, 2500);
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

    // SUCCESS MESSAGE
    setTaskSuccessMessage(
      "Task updated successfully!"
    );

    setEditingTask(null);
    setIsModalOpen(false);

    setTimeout(() => {
      setTaskSuccessMessage("");
    }, 2500);
  };

  // ==========================================
  // DELETE TASK
  // ==========================================

  const deleteTask = (id: number) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this task?"
      );

    if (!confirmed) {
      return;
    }

    setTasks((previousTasks) =>
      previousTasks.filter(
        (task) => task.id !== id
      )
    );

    // SUCCESS MESSAGE
    setTaskSuccessMessage(
      "Task deleted successfully!"
    );

    setTimeout(() => {
      setTaskSuccessMessage("");
    }, 2500);
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
  // MARK COMPLETED / PENDING
  // ==========================================

  const toggleTask = (id: number) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === "completed"
                  ? "pending"
                  : "completed",
            }
          : task
      )
    );
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
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-50">

      <main className="min-h-screen pb-24 lg:ml-64 lg:pb-0">

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <Header
          profile={profile}
          onProfileClick={openProfileModal}
        />

        {/* ================================= */}
        {/* GREETING */}
        {/* ================================= */}

        <section className="px-5 pb-6 pt-6 lg:px-10 lg:pb-8 lg:pt-8">

          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 lg:text-3xl">
            {greeting}, {profile.name}
          </h2>

          <p className="mt-2 text-base text-slate-500">
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

        <section className="mt-8 lg:mt-10">

          {/* HEADING */}

          <div className="px-5 lg:px-10">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-extrabold text-slate-900 lg:text-3xl">
                  Your Tasks
                </h2>

                <p className="mt-1 hidden text-sm text-slate-500 lg:block">
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
                  shadow-blue-200
                  transition
                  hover:bg-blue-700
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

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">

              {/* SEARCH */}

              <div className="relative flex-1">

                <Search
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(
                      event.target.value
                    )
                  }
                  placeholder="Search tasks..."
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    py-3
                    pl-11
                    pr-4
                    text-sm
                    text-slate-700
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                  "
                />

              </div>

              {/* FILTER */}

              <div className="sm:w-48">

                <select
                  value={filterStatus}
                  onChange={(event) =>
                    setFilterStatus(
                      event.target.value as FilterStatus
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-slate-700
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                  "
                >

                  <option value="all">
                    All Tasks
                  </option>

                  <option value="pending">
                    Pending
                  </option>

                  <option value="completed">
                    Completed
                  </option>

                </select>

              </div>

            </div>

          </div>

          {/* ================================= */}
          {/* TASK LIST */}
          {/* ================================= */}

          <div className="mt-5">

            {filteredTasks.length > 0 ? (

              <TaskList
                tasks={filteredTasks}
                onToggle={toggleTask}
                onEdit={openEditModal}
                onDelete={deleteTask}
              />

            ) : (

              <div className="
                mx-5
                rounded-2xl
                border
                border-dashed
                border-slate-300
                bg-white
                p-8
                text-center
                lg:mx-10
              ">

                <h3 className="font-bold text-slate-700">
                  No tasks found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Try a different search or filter.
                </p>

              </div>

            )}

          </div>

        </section>

        {/* ================================= */}
        {/* PROGRESS */}
        {/* ================================= */}

        <section className="
          mx-5
          mt-8
          rounded-2xl
          border
          border-blue-100
          bg-blue-50
          p-5
          lg:mx-10
          lg:mt-10
          lg:p-7
        ">

          <div className="flex items-center gap-4">

            <div className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-blue-100
            ">

              <Trophy
                size={26}
                className="text-blue-600"
              />

            </div>

            <div>

              <h3 className="
                text-lg
                font-extrabold
                text-blue-700
                lg:text-xl
              ">
                Great Progress!
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                You have completed{" "}
                {completedTasks} tasks.
              </p>

              <p className="mt-1 text-sm text-slate-600">
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
        {/* TASK SUCCESS MESSAGE */}
        {/* ================================= */}

        {taskSuccessMessage && (
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
              {taskSuccessMessage}
            </span>

          </div>
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
            isProfileModalOpen
          }
          onProfileClick={
            openProfileModal
          }
        />

      </main>

    </div>
  );
}

export default App;