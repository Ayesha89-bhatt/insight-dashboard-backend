import { Task } from "../types/task.types";

export const validateDependencies = (tasks: Task[]): Task[] => {
  const validIds = new Set(tasks.map(task => task.id));

  return tasks.map(task => ({
    ...task,
    dependencies: task.dependencies.filter(dep => validIds.has(dep))
  }));
};
