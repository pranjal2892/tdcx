import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import Task from "../models/Task";
import fetch from "node-fetch";
import { config } from "../config/config";

const CreateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, image } = req.body;
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    password,
    image,
  });

  return user
    .save()
    .then((user) => res.status(201).json({ user }))
    .catch((error) => res.status(500).json({ error }));
};

const ReadUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  return User.findById({ _id: userId })
    .then((user) =>
      user
        ? res.status(200).json({ user })
        : res.status(404).json({ message: "User Not Found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const LoginUser = (req: Request, res: Response, next: NextFunction) => {

  const {email, password } = req.body;

  return User.find({ email: email,password:password })
    .then((user) =>
      user.length>0
        ? res.status(200).json({ message: user })
        : res.status(404).json({ message: "User Not Found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  CreateUser,
  ReadUser,
  LoginUser
};
