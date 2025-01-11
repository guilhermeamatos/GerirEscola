-- CreateTable
CREATE TABLE "RegistroDeDesempenho" (
    "id" TEXT NOT NULL,
    "enrollment_id" TEXT NOT NULL,
    "parecere1Trimestre" TEXT NOT NULL,
    "parecere2Trimestre" TEXT NOT NULL,
    "parecere3Trimestre" TEXT NOT NULL,

    CONSTRAINT "RegistroDeDesempenho_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RegistroDeDesempenho_enrollment_id_key" ON "RegistroDeDesempenho"("enrollment_id");

-- AddForeignKey
ALTER TABLE "RegistroDeDesempenho" ADD CONSTRAINT "RegistroDeDesempenho_enrollment_id_fkey" FOREIGN KEY ("enrollment_id") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
