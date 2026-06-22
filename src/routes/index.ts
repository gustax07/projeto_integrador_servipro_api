import { Router } from "express";
import userRouter from '../routes/user.routes';
import loginRouter from './auth.routes';
import candidaturaRouter from './candidatura.routes';
import servicoRouter from './servico.routes';
import setorRouter from './setor.routes';
import enderecoRouter from './endereco.routes';
import habilidadeRouter from './habilidade.routes';
import cursoRouter from './curso.routes';
import curriculoRouter from './curriculo.routes';
import perfilRouter from './perfil.routes';
import experienciaRouter from './experiencia.routes';
import mensagemRouter from './mensagem.routes';
import telefoneRouter from './telefone.routes';

const router = Router();

router.use('/candidatura', candidaturaRouter);
router.use('/curriculo', curriculoRouter);
router.use('/curso', cursoRouter);
router.use('/endereco', enderecoRouter);
router.use('/experiencia', experienciaRouter);
router.use('/habilidade', habilidadeRouter);
router.use('/login', loginRouter);
router.use('/mensagem', mensagemRouter);
router.use('/perfil', perfilRouter);
router.use('/servico', servicoRouter);
router.use('/setor', setorRouter);
router.use('/telefone', telefoneRouter);
router.use('/user', userRouter);

router.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'API Ok', 
    timestamp: new Date().toISOString() 
  });
});

export default router;
