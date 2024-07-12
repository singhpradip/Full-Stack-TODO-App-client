import { useTaskContext } from "../../context/TaskContext";

export default function CompletedTasks() {
  const { tasks } = useTaskContext();
  const completedTasks = tasks.filter((task) => task.status === "completed");

  console.log("completedTasks", completedTasks);
  return (
    <div>
      <h1>CompletedTasks</h1>
      <h1>{}</h1>
    </div>
  );
}
