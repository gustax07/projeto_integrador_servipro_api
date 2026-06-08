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

router.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'API Ok', 
    timestamp: new Date().toISOString() 
  });
});

export default router;
