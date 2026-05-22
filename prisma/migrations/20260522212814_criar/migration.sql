-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolicitaServicos" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SolicitaServicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrestaServicos" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PrestaServicos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SolicitaServicos_userId_key" ON "SolicitaServicos"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PrestaServicos_userId_key" ON "PrestaServicos"("userId");

-- AddForeignKey
ALTER TABLE "SolicitaServicos" ADD CONSTRAINT "SolicitaServicos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrestaServicos" ADD CONSTRAINT "PrestaServicos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
