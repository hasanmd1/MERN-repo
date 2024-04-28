import express from "express";
import MyUserController from "../controllers/MyUserController";
import {jwtCheck, jwtParse} from "../middleware/auth";

const router = express.Router();

router.post("/", jwtCheck, MyUserController.createdCurrentUser);
router.put("/", jwtCheck, jwtParse, MyUserController.updatedCurrentUser);

export default router;