export interface Task {
  id: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  dependencies: string[];
  status?: string;
}
