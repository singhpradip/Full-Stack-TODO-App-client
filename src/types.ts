import { ReactNode } from "react";

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

export interface TaskContextProps {
  tasks: Task[];
  addTask: (task: { title: string; description: string }) => Promise<void>;
  updateTask: (taskId: string, updatedData: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

export interface TaskContainerProps {
  status: string;
  tasks: Task[];
}
export interface TaskItemProps {
  task: Task;
}

// -------------------------------------------------- Auth
export interface UserData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null;
  isDarkMode: boolean;
  isVerified: boolean;
}

export interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  setUser: (user: UserData | null) => void;
  updateUser: (updatedData: FormData) => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
