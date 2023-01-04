import mongoose, { Document, Schema } from "mongoose";
export interface ITask {
  taskName: string;
  user: string;
  status: number;
  isDelete: number;
  isComplete: number;
}

export interface ITaskModel extends ITask, Document {}

const TaskSchema: Schema = new Schema(
  {
    taskName: { type: String},
    user: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: Number, default: 1 },
    isDelete: { type: Number, default: 0 },
    isComplete: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITaskModel>("Task", TaskSchema);
