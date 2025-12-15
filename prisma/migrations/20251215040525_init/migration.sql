-- CreateTable
CREATE TABLE "Passengers" (
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "profilePic" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Passengers_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Harbor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,

    CONSTRAINT "Harbor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "shipName" TEXT NOT NULL,
    "originHarborId" INTEGER NOT NULL,
    "destinationHarborId" INTEGER NOT NULL,
    "etd" TIMESTAMP(3) NOT NULL,
    "eta" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Passengers_email_key" ON "Passengers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Passengers_phoneNumber_key" ON "Passengers"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_originHarborId_fkey" FOREIGN KEY ("originHarborId") REFERENCES "Harbor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_destinationHarborId_fkey" FOREIGN KEY ("destinationHarborId") REFERENCES "Harbor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
