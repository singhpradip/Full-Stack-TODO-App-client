import React, { createContext, useContext, ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import taskService from "../services/taskService";
import { TaskContextProps, Task } from "../types";



const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery<Task[]>("tasks", taskService.getTasks);

  const addTaskMutation = useMutation(taskService.addTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  const updateTaskMutation = useMutation(
    (updatedData: { taskId: string; updatedData: Partial<Task> }) =>
      taskService.updateTask(updatedData.taskId, updatedData.updatedData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
      },
    }
  );

  const deleteTaskMutation = useMutation(taskService.deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  const addTask = async (task: { title: string; description: string }) => {
    await addTaskMutation.mutateAsync(task);
  };

  const updateTask = async (taskId: string, updatedData: Partial<Task>) => {
    await updateTaskMutation.mutateAsync({ taskId, updatedData });
  };

  const deleteTask = async (taskId: string) => {
    await deleteTaskMutation.mutateAsync(taskId);
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
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
