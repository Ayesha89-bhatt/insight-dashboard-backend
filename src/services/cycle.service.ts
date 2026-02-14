import { Task } from "../types/task.types";

export const detectCycles = (tasks: Task[]): string[] => {
  const graph: Record<string, string[]> = {};
  const visited = new Set<string>();
  const stack = new Set<string>();
  const cycleNodes: string[] = [];

  tasks.forEach(task => {
    graph[task.id] = task.dependencies;
  });

  const dfs = (node: string) => {
    if (stack.has(node)) {
      cycleNodes.push(node);
      return;
    }

    if (visited.has(node)) return;

    visited.add(node);
    stack.add(node);

    for (const neighbor of graph[node] || []) {
      dfs(neighbor);
    }

    stack.delete(node);
  };

  for (const task of tasks) {
    dfs(task.id);
  }

  return cycleNodes;
};
