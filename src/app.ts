import express from "express";
import cors from "cors";
import transcriptRoutes from "./routes/transcript.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", transcriptRoutes);

export default app;
