import Joi, { ObjectSchema } from "joi";
import { NextFunction, Response, Request } from "express";
import { IUser } from "../models/User";
import { ITask } from "../models/Task";

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      console.log(error);
      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  user: {
    create: Joi.object<IUser>({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      image: Joi.string().required(),
    })
   
  },
  task: {
    create: Joi.object<ITask>({
      user: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      taskName: Joi.string().required(),
    }),
    update: Joi.object<ITask>({
      user: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      taskName: Joi.string().required(),
    }),
  },
};
