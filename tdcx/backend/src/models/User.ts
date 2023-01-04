import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  image: string;
  status: number;
  isDelete: number;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String},
    image: { type: String},
    status: { type: Number, default: 1 },
    isDelete: { type: Number, default: 0 },
  },
  { versionKey: false }
);

export default mongoose.model<IUserModel>("User", UserSchema);
