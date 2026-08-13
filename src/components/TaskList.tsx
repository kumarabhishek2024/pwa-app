import type { Task } from "../types/task";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
}

const TaskList = ({
  tasks,
  onToggle,
}: TaskListProps) => {

  return (
    <div className="grid grid-cols-1 gap-5 px-5 lg:grid-cols-2 lg:gap-6 lg:px-10">

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
        />
      ))}

    </div>
  );
};

export default TaskList;