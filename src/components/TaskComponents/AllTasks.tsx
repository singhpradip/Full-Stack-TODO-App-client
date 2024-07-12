import { useTaskContext } from "../../context/TaskContext";

export default function AllTasks() {
  const { tasks } = useTaskContext();
  console.log("allTasks", tasks);
  return (
    <div>
      <h1>AllTasks</h1>
      <h2>Please open and view console.. :) </h2>
    </div>
  );
}
