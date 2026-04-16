import {Router} from "express"
import { AuthRoutes } from "../module/auth";

const router = Router()

router.use('/auth',AuthRoutes)

export const indexRoutes = router;