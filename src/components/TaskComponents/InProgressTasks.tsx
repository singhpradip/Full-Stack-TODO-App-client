import { useTaskContext } from "../../context/TaskContext";

export default function InProgressTasks() {
  const { tasks } = useTaskContext();
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  console.log("inProgressTasks", inProgressTasks);
  return (
    <div>
      <h1>InProgressTasks</h1>
    </div>
  );
}
