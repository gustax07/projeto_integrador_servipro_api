/*
  Warnings:

  - A unique constraint covering the columns `[titulo]` on the table `servicos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numero]` on the table `telefones` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "servicos_titulo_key" ON "servicos"("titulo");

-- CreateIndex
CREATE UNIQUE INDEX "telefones_numero_key" ON "telefones"("numero");
