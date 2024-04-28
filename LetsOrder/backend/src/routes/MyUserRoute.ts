import express from "express";
import MyUserController from "../controllers/MyUserController";
import {jwtCheck, jwtParse} from "../middleware/auth";
import {validateMyUserRequest} from "../middleware/validation";

const router = express.Router();

router.post("/",
    jwtCheck,
    MyUserController.createdCurrentUser);
router.get("/",
    jwtCheck,
    jwtParse,
    MyUserController.getCurrentUser);
router.put("/",
    jwtCheck,
    jwtParse,
    validateMyUserRequest,
    MyUserController.updatedCurrentUser);

export default router;