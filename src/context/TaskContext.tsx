import React, { createContext, useContext, ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import taskService from "../services/taskService";

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

interface TaskContextProps {
  tasks: Task[];
  addTask: (task: { title: string; description: string }) => Promise<void>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();

  // Fetch
  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery<Task[]>("tasks", () => taskService.getTasks());
  //add
  const mutation = useMutation(taskService.addTask, {
    onSuccess: () => {
      // Invalidate and refetch tasks when mutation
      queryClient.invalidateQueries("tasks");
    },
  });

  // Function to add a task
  const addTask = async (task: { title: string; description: string }) => {
    await mutation.mutateAsync(task);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !tasks) {
    return <div>Error fetching tasks.</div>;
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use TaskContext
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
