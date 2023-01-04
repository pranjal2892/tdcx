import express from "express";
import controller from "../controllers/Task";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();
router.post("/create", controller.CreateTask);
router.get("/get/:taskId", controller.ReadTask);
router.get("/search/:search", controller.SearchTask);
router.post("/getByUser", controller.ReadAllTask);
router.patch("/update/:taskId", controller.UpdateTask);
router.delete("/delete/:taskId", controller.DeleteTask);

export = router;
