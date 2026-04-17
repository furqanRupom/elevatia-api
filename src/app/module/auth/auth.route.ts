import {Router} from "express";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);


export const AuthRoutes = router;