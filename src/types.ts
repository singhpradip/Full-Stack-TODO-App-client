export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TaskContainerProps {
  status: string;
  tasks: Task[];
}
export interface TaskItemProps {
  task: Task;
}
