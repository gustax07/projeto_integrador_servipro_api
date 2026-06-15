/*
  Warnings:

  - Added the required column `instituicao` to the `cursos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `enderecos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cursos" ADD COLUMN     "instituicao" TEXT NOT NULL,
ALTER COLUMN "tipo" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "enderecos" ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "complemento" TEXT,
ADD COLUMN     "principal" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "avaliacoes" (
    "id" SERIAL NOT NULL,
    "nota" DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    "comentario" TEXT,
    "avaliacao_receber_id" INTEGER NOT NULL,
    "avaliacao_enviar_id" INTEGER NOT NULL,

    CONSTRAINT "avaliacoes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_avaliacao_receber_id_fkey" FOREIGN KEY ("avaliacao_receber_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_avaliacao_enviar_id_fkey" FOREIGN KEY ("avaliacao_enviar_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
