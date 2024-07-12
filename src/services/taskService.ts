import axiosInstance from "../utils/axiosInstance";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const addTask = async (task: { title: string; description: string }) => {
  const response = await axiosInstance.post("/tasks/create-task", task);
  return response.data;
};

const getTasks = async (): Promise<Task[]> => {
  const response = await axiosInstance.get(`/tasks/get-tasks`);
  return response.data.data;
};

export default { addTask, getTasks };
