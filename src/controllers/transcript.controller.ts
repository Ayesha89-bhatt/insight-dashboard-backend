import { Request, Response } from "express";
import { generateTasks } from "../services/llm.service";
import { validateDependencies } from "../services/validation.service";
import { detectCycles } from "../services/cycle.service";
import Transcript from "../model/transcript.model";

export const processTranscript = async (req: Request, res: Response) => {
  try {
    const { transcript } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: "Transcript is required" });
    }

    // 1. Generate tasks
    let tasks = await generateTasks(transcript);

    // 2. Sanitize dependencies
    tasks = validateDependencies(tasks);

    // 3. Detect cycles
    const cycleNodes = detectCycles(tasks);

    if (cycleNodes.length > 0) {
      tasks = tasks.map(task =>
        cycleNodes.includes(task.id)
          ? { ...task, status: "Blocked/Error" }
          : task
      );
    }

    // 4. Save to MongoDB
    const saved = await Transcript.create({
      content: transcript,
      graph: tasks
    });

    return res.json({
      id: saved._id,
      tasks
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
