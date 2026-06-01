import { Router } from "express";
import userRouter from '../routes/user.routes';
import loginRouter from './auth.routes';
import candidaturaRouter from './candidatura.routes';


const router = Router();

router.use('/user', userRouter);
router.use('/login', loginRouter);
router.use('/candidatura', candidaturaRouter);

export default router;