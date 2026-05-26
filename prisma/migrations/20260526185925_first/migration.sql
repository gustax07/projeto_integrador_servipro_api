/*
  Warnings:

  - You are about to drop the `PrestaServicos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SolicitaServicos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PrestaServicos" DROP CONSTRAINT "PrestaServicos_userId_fkey";

-- DropForeignKey
ALTER TABLE "SolicitaServicos" DROP CONSTRAINT "SolicitaServicos_userId_fkey";

-- DropTable
DROP TABLE "PrestaServicos";

-- DropTable
DROP TABLE "SolicitaServicos";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "data_nascimento" DATE NOT NULL,
    "documento" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enderecos" (
    "id" SERIAL NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" CHAR(2) NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "enderecos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "telefones" (
    "id" SERIAL NOT NULL,
    "ddd" INTEGER NOT NULL,
    "numero" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "telefones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfis" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT,
    "data_postagem" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "avaliacoes" DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    "verificado" BOOLEAN NOT NULL DEFAULT false,
    "nome_social" TEXT,
    "viajar" BOOLEAN NOT NULL DEFAULT false,
    "disponibilidade" TEXT,
    "tipo_servico" TEXT,
    "is_prestador" BOOLEAN NOT NULL DEFAULT false,
    "is_contratante" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER NOT NULL,
    "setor_id" INTEGER,

    CONSTRAINT "perfis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "setores" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "setores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servicos" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "data_postagem" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "formato" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "requisitos" TEXT,
    "salario" DECIMAL(10,2),
    "tipo_salario" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "setor_id" INTEGER NOT NULL,

    CONSTRAINT "servicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidaturas" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "servico_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "candidaturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mensagens" (
    "id" SERIAL NOT NULL,
    "conteudo" TEXT NOT NULL,
    "lida" BOOLEAN NOT NULL DEFAULT false,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "remetente_id" INTEGER NOT NULL,
    "destinatario_id" INTEGER NOT NULL,

    CONSTRAINT "mensagens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curriculos" (
    "id" SERIAL NOT NULL,
    "objetivo" TEXT,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "curriculos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiencias" (
    "id" SERIAL NOT NULL,
    "nome_empresa" TEXT NOT NULL,
    "data_inicio" DATE NOT NULL,
    "data_fim" DATE,
    "status" TEXT NOT NULL,
    "curriculo_id" INTEGER NOT NULL,

    CONSTRAINT "experiencias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cursos" (
    "id" SERIAL NOT NULL,
    "tipo" INTEGER NOT NULL,
    "nome_curso" TEXT NOT NULL,
    "data_inicio" DATE NOT NULL,
    "data_fim" DATE,
    "status" TEXT NOT NULL,
    "curriculo_id" INTEGER NOT NULL,

    CONSTRAINT "cursos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habilidades" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "habilidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "curriculo_habilidades" (
    "curriculo_id" INTEGER NOT NULL,
    "habilidade_id" INTEGER NOT NULL,

    CONSTRAINT "curriculo_habilidades_pkey" PRIMARY KEY ("curriculo_id","habilidade_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_documento_key" ON "users"("documento");

-- CreateIndex
CREATE UNIQUE INDEX "perfis_user_id_key" ON "perfis"("user_id");

-- CreateIndex
CREATE INDEX "perfis_is_prestador_status_idx" ON "perfis"("is_prestador", "status");

-- CreateIndex
CREATE UNIQUE INDEX "setores_nome_key" ON "setores"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "candidaturas_servico_id_user_id_key" ON "candidaturas"("servico_id", "user_id");

-- CreateIndex
CREATE INDEX "mensagens_remetente_id_destinatario_id_idx" ON "mensagens"("remetente_id", "destinatario_id");

-- CreateIndex
CREATE INDEX "mensagens_criado_em_idx" ON "mensagens"("criado_em");

-- CreateIndex
CREATE UNIQUE INDEX "curriculos_user_id_key" ON "curriculos"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "habilidades_nome_key" ON "habilidades"("nome");

-- AddForeignKey
ALTER TABLE "enderecos" ADD CONSTRAINT "enderecos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "telefones" ADD CONSTRAINT "telefones_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfis" ADD CONSTRAINT "perfis_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfis" ADD CONSTRAINT "perfis_setor_id_fkey" FOREIGN KEY ("setor_id") REFERENCES "setores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicos" ADD CONSTRAINT "servicos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicos" ADD CONSTRAINT "servicos_setor_id_fkey" FOREIGN KEY ("setor_id") REFERENCES "setores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidaturas" ADD CONSTRAINT "candidaturas_servico_id_fkey" FOREIGN KEY ("servico_id") REFERENCES "servicos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidaturas" ADD CONSTRAINT "candidaturas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagens" ADD CONSTRAINT "mensagens_remetente_id_fkey" FOREIGN KEY ("remetente_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagens" ADD CONSTRAINT "mensagens_destinatario_id_fkey" FOREIGN KEY ("destinatario_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curriculos" ADD CONSTRAINT "curriculos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiencias" ADD CONSTRAINT "experiencias_curriculo_id_fkey" FOREIGN KEY ("curriculo_id") REFERENCES "curriculos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cursos" ADD CONSTRAINT "cursos_curriculo_id_fkey" FOREIGN KEY ("curriculo_id") REFERENCES "curriculos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curriculo_habilidades" ADD CONSTRAINT "curriculo_habilidades_curriculo_id_fkey" FOREIGN KEY ("curriculo_id") REFERENCES "curriculos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "curriculo_habilidades" ADD CONSTRAINT "curriculo_habilidades_habilidade_id_fkey" FOREIGN KEY ("habilidade_id") REFERENCES "habilidades"("id") ON DELETE CASCADE ON UPDATE CASCADE;
