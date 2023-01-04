import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Task from "../models/Task";
import User from "../models/User";
import fetch from "node-fetch";
import { config } from "../config/config";

const CreateTask = async (req: Request, res: Response, next: NextFunction) => {
  const { taskName, user } = req.body;
  const task = new Task({
    _id: new mongoose.Types.ObjectId(),
    taskName,
    user,
  });

  return await task
    .save()
    .then((task) => res.status(201).json({ task }))
    .catch((error) => res.status(500).json({ error }));
};

const ReadTask = (req: Request, res: Response, next: NextFunction) => {
  const TaskId = req.params.taskId;
  return Task.findById(TaskId)
    .populate("user")
    .select("-__v")
    .then((task) =>
      task
        ? res.status(200).json({ task })
        : res.status(404).json({ message: "Task Not Found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const ReadAllTask = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;
  return await Task.find({ user: userId })
    .populate("user")
    .select("-__v")
    .then((tasks) => res.status(200).json({ tasks }))
    .catch((error) => res.status(500).json({ error }));
};

const SearchTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const Search = req.params.search;

  const tasks = await Task.find(
    {
      $or: [{ taskName: { $regex: Search, $options: "i" } }],
    },
    { _id: 1,taskName:1 }
  )
    .select("-__v")
    .then((tasks) => res.status(200).json({ tasks }))
    .catch((error) => res.status(500).json({ error }));
};

const UpdateTask = (req: Request, res: Response, next: NextFunction) => {
  const taskId = req.params.taskId;
  return Task.findById(taskId)
    .then((task) => {
      if (task) {
        task.set(req.body);
        return task
          .save()
          .then((task) => res.status(201).json({ task }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: "Task Not Found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const DeleteTask = async (req: Request, res: Response, next: NextFunction) => {
  const taskId = req.params.taskId;

  return await Task.findByIdAndDelete(taskId)
    .then((task) =>
      task
        ? res.status(201).json({ message: "Task Deleted Successfully" })
        : res.status(404).json({ message: "Task Not Found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  CreateTask,
  ReadTask,
  ReadAllTask,
  UpdateTask,
  DeleteTask,
  SearchTask,
};
