import { Router } from "express";
import { createServico, getServicoById, getAllServicos, updateServico, deleteServico} from "../controllers/servico.controller";
import { validateSchema } from "../middleware/validate.middlware";

const router = Router();


