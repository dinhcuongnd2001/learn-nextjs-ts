-- CreateEnum
CREATE TYPE "TypeOrder" AS ENUM ('PENDING', 'CREATED', 'FULL_CREATED', 'CANCEL');

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cod" DOUBLE PRECISION NOT NULL,
    "feeShip" DOUBLE PRECISION NOT NULL DEFAULT 15000,
    "partialPaid" DOUBLE PRECISION NOT NULL DEFAULT 50000,
    "total" DOUBLE PRECISION NOT NULL,
    "tracking" TEXT,
    "type" "TypeOrder" NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "supplier" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "product" TEXT NOT NULL,
    "note" TEXT,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statistical" (
    "id" TEXT NOT NULL,
    "revenue" DOUBLE PRECISION NOT NULL,
    "refund" DOUBLE PRECISION NOT NULL,
    "investment" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Statistical_pkey" PRIMARY KEY ("id")
);
