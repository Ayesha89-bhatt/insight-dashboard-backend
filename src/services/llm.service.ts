import OpenAI from "openai";
import { Task } from "../types/task.types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const generateTasks = async (transcript: string): Promise<Task[]> => {
  const prompt = `
  Convert this meeting transcript into a JSON array.

  Each object must contain:
  id (string),
  description (string),
  priority ("Low", "Medium", "High"),
  dependencies (array of IDs).

  Transcript:
  ${transcript}
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-5-nano",
    messages: [{ role: "user", content: prompt }],
    
  });

  const content = response.choices[0].message.content;

  return JSON.parse(content || "[]");
};


// import { Task } from "../types/task.types";

// export const generateTasks = async (transcript: string): Promise<Task[]> => {
//   return [
//     {
//       id: "T1",
//       description: "Requirement Gather",
//       priority: "High",
//       dependencies: []
//     },
//     {
//       id: "T2",
//       description: "Build Architecture",
//       priority: "Medium",
//       dependencies: ["T1"]
//     },
//     {
//       id: "T3",
//       description: "Code Flow Start",
//       priority: "Low",
//       dependencies: ["T2"]
//     }
//   ];
// };
