import { useTaskContext } from "../../context/TaskContext";

export default function AllTasks() {
  const { tasks } = useTaskContext();
  console.log("allTasks", tasks);
  return (
    <div>
      <h1>AllTasks</h1>
    </div>
  );
}
