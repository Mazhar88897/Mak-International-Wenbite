import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  containerNumber: { type: String, required: true },
  formENumbers: { type: [String], required: true },
  company: { type: String, required: true },
  date: { type: String },
  status: { type: Boolean },
  fileUrl: { type: String }, // Ensure this is properly defined
});

// Use `recordSchema` instead of an undefined `RecordSchema`
export default mongoose.models.Record || mongoose.model("Record", recordSchema);
