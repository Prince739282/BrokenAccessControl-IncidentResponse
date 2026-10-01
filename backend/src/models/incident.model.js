import mongoose, { Schema } from "mongoose";

const incidentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      default: "Unauthorized access attempt",
    },
    status: {
      type: String,
      default: "Blocked",
    },
  },
  {
    timestamps: true,
  },
);

const Incident = mongoose.model("Incident", incidentSchema);

export default Incident;
