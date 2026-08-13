import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
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

  // Tasks state
  const [tasks, setTasks] = useState<Task[]>(() => {

    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return defaultTasks;
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  // Add new task
  const addTask = (newTask: Task) => {

    setTasks((previousTasks) => [
      ...previousTasks,
      newTask,
    ]);
  };

  // Completed tasks
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  // Pending tasks
  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  // Change task status
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
    <div className="min-h-screen bg-[#F8F8FC]">

      <main className="min-h-screen pb-24 lg:ml-64 lg:pb-0">

        {/* Header */}
        <Header />

        {/* Greeting */}
        <section className="px-5 pb-6 pt-2 lg:px-10 lg:pb-8 lg:pt-8">

          <h2 className="text-2xl font-bold text-slate-900 lg:text-3xl">
            Good Morning, buddy 
          </h2>

          <p className="mt-2 text-base text-slate-500">
            Let's make today productive.
          </p>

        </section>

        {/* Summary */}
        <SummaryCards
          total={tasks.length}
          pending={pendingTasks}
          completed={completedTasks}
        />

        {/* Task Section */}
        <section className="mt-8 lg:mt-10">

          {/* Task Heading + Add Button */}
          <div className="mb-5 flex items-center justify-between px-5 lg:px-10">

            <div>

              <h2 className="text-2xl font-bold text-slate-900 lg:text-3xl">
                Your Tasks
              </h2>

              <p className="mt-1 hidden text-sm text-slate-500 lg:block">
                Keep track of your daily activities
              </p>

            </div>

            {/* Add Task Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-purple-700"
            >

              <span className="hidden sm:inline">
                + Add Task
              </span>

              <span className="sm:hidden">
                +
              </span>

            </button>

          </div>

          {/* Task List */}
          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
          />

        </section>

        {/* Progress */}
        <section className="mx-5 mt-8 rounded-2xl bg-purple-50 p-5 lg:mx-10 lg:mt-10 lg:p-7">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-purple-100">
  <Trophy size={26} className="text-purple-600" />
</div>

            <div>

              <h3 className="text-lg font-bold text-purple-700 lg:text-xl">
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

        {/* Add Task Modal */}
        {isModalOpen && (
          <AddTaskModal
            onClose={() => setIsModalOpen(false)}
            onAddTask={addTask}
          />
        )}

        {/* Navigation */}
        <BottomNav />

      </main>

    </div>
  );
}

export default App;