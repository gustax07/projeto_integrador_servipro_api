import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

// Define a pasta onde as imagens serão salvas
const uploadDir = path.join(process.cwd(), 'uploads/icones_perfis');

// Cria a pasta caso não exista
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do armazenamento local (DiskStorage)
const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, uploadDir);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extensao = path.extname(file.originalname);
    cb(null, `icone-${uniqueSuffix}${extensao}`);
  }
});

// Filtro opcional para aceitar apenas imagens (Segurança)
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Apenas arquivos de imagem (JPEG, PNG) são permitidos.'));
  }
};

// Exporta o middleware configurado
export const uploadIcone = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
  fileFilter: fileFilter
});