import { Router } from "express";
import { login } from "../controllers/login.controller";
import { validateSchema } from "../middleware/validate.middlware";
import { loginContaSchema } from "../schemas/auth.schema";
import { authLimiter } from '../middleware/rateLimiter.middleware';

const router = Router();

router.post('/', authLimiter,validateSchema(loginContaSchema), login);

export default router;
