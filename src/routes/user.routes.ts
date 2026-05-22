import { Router } from "express";
import { createUser, getUserById } from "../controllers/user.controller";
import { validateSchema } from "../middleware/validate.middlware";
import { createUserSchema } from "../schemas/user.schema";
import { authLimiter } from '../middleware/rateLimiter.middleware';
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post('/', authLimiter, validateSchema(createUserSchema), createUser);
router.get('/:id',authenticate, getUserById);
    
export default router;