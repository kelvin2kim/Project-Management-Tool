/*
  Warnings:

  - A unique constraint covering the columns `[ownerId,name,deleted]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Project_ownerId_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Project_ownerId_name_deleted_key" ON "Project"("ownerId", "name", "deleted");
