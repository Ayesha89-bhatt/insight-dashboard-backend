import { Router } from "express";
import { processTranscript } from "../controllers/transcript.controller";

const router = Router();

router.post("/transcript", processTranscript);

export default router;
