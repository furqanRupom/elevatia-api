import {Router} from "express";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me',checkAuth(Role.ADMIN,Role.SUPER_ADMIN,Role.USER),AuthController.profile)

export const AuthRoutes = router;
