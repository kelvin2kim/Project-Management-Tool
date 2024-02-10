-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "description" TEXT,
ALTER COLUMN "due" DROP NOT NULL;
