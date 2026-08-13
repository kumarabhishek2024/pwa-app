import { useEffect, useState } from "react";
import { Plus, Trophy } from "lucide-react";

import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import TaskList from "./components/TaskList";
import BottomNav from "./components/BottomNav";
import AddTaskModal from "./components/AddTaskModel";

import type { Task } from "./types/task";

const defaultTasks: Task[] = [
  {
    id: 1,
    title: "Learn React",
    description:
      "Complete the React basics and practice components.",
    status: "pending",
    date: "12 Aug 2026",
  },
  {
    id: 2,
    title: "Learn PWA",
    description:
      "Understand PWA concepts and build a sample app.",
    status: "pending",
    date: "14 Aug 2026",
  },
  {
    id: 3,
    title: "Create React Project",
    description:
      "Setup Vite project and structure the application.",
    status: "completed",
    date: "15 Aug 2026",
  },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return defaultTasks;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask: Task) => {
    setTasks((previousTasks) => [
      ...previousTasks,
      newTask,
    ]);
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

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

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

      <main className="min-h-screen pb-24 lg:ml-64 lg:pb-0">

        <Header />

        {/* Greeting */}
        <section className="px-5 pb-6 pt-6 lg:px-10 lg:pb-8 lg:pt-10">

          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Good Morning, buddy
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
            Let's make today productive.
          </p>

        </section>

        {/* Summary */}
        <SummaryCards
          total={tasks.length}
          pending={pendingTasks}
          completed={completedTasks}
        />

        {/* Tasks */}
        <section className="mt-8 lg:mt-10">

          <div className="mb-5 flex items-center justify-between px-5 lg:px-10">

            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Your Tasks
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Keep track of your daily activities
              </p>
            </div>

            {/* Add Task */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-200 transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-95"
            >
              <Plus
                size={18}
                strokeWidth={2.5}
              />

              <span className="hidden sm:inline">
                Add Task
              </span>
            </button>

          </div>

          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
          />

        </section>

        {/* Progress */}
        <section className="mx-5 mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5 shadow-sm lg:mx-10 lg:mt-10 lg:p-7">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100">
              <Trophy
                size={26}
                className="text-blue-600"
                strokeWidth={2.2}
              />
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-blue-700 lg:text-xl">
                Great Progress!
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                You have completed {completedTasks} tasks.
              </p>

              <p className="mt-1 text-sm text-slate-600">
                Keep going!
              </p>
            </div>

          </div>

        </section>

        {/* Modal */}
        {isModalOpen && (
          <AddTaskModal
            onClose={() => setIsModalOpen(false)}
            onAddTask={addTask}
          />
        )}

        <BottomNav />

      </main>

    </div>
  );
}

export default App;