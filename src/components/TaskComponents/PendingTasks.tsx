import { useTaskContext } from "../../context/TaskContext";
export default function PendingTasks() {
  const { tasks } = useTaskContext();
  const pendingTasks = tasks.filter((task) => task.status === "pending");
  console.log("pendingTasks", pendingTasks);
  return (
    <div>
      <h1>PendingTasks</h1>
    </div>
  );
}
