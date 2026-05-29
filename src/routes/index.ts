import { Router } from "express";
import userRouter from '../routes/user.routes';
import loginRouter from './auth.routes';

const router = Router();

router.use('/user', userRouter);
router.use('/login', loginRouter);

export default router;