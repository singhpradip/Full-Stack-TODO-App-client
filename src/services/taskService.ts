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
  console.log("getTasks is called", task);

  const response = await axiosInstance.post("/tasks/create-task", task);
  return response.data;
};

const getTasks = async (): Promise<Task[]> => {
  console.log("getTasks is called");
  const response = await axiosInstance.get(`/tasks/get-tasks`);
  return response.data.data;
};

const updateTask = async (taskId: string, updatedData: Partial<Task>) => {
  console.log("updateTask is called", taskId, updatedData);
  const response = await axiosInstance.put(
    `/tasks/update-task/${taskId}`,
    updatedData
  );
  return response.data;
};

const deleteTask = async (taskId: string) => {
  console.log("deleteTask is called", taskId);
  const response = await axiosInstance.delete(`/tasks/delete-task/${taskId}`);
  return response.data;
};

const taskService = {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
};

export default taskService;
