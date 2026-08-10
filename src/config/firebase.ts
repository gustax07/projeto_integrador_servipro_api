import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { join } from 'path';

// Carrega o arquivo de credenciais da raiz do projeto
const serviceAccountPath = join(process.cwd(), 'firebase-service-account.json');
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;