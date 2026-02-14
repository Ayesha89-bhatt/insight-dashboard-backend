import mongoose from "mongoose";

const TranscriptSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    graph: {
      type: Object,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("transcripts", TranscriptSchema);
