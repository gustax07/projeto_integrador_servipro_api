import { Router } from "express";
import userRouter from '../routes/user.routes';
import loginRouter from './auth.routes';
import candidaturaRouter from './candidatura.routes';
import servicoRouter from './servico.routes';
import setorRouter from './setor.routes';


const router = Router();

router.use('/user', userRouter);
router.use('/login', loginRouter);
router.use('/candidatura', candidaturaRouter);
router.use('/servico', servicoRouter);
router.use('/setor', setorRouter);

export default router;