/*
  Warnings:

  - You are about to drop the column `data_postagem` on the `perfis` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "perfis" DROP COLUMN "data_postagem",
ADD COLUMN     "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "exibir_perfil" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "disponibilidade" SET DEFAULT 'não definida',
ALTER COLUMN "tipo_servico" SET DEFAULT 'não definida';
