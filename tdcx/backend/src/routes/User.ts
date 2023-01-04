import express from "express";
import controller from "../controllers/User";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();
router.post(
  "/create",
  ValidateSchema(Schemas.user.create),
  controller.CreateUser
);
router.post("/login",controller.LoginUser);
router.get("/get/:userId", controller.ReadUser);
export = router;
