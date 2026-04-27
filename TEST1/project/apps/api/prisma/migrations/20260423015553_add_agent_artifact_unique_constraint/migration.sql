/*
  Warnings:

  - A unique constraint covering the columns `[project_id,agent_name,filename]` on the table `agent_artifacts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "agent_artifacts_project_id_agent_name_filename_key" ON "agent_artifacts"("project_id", "agent_name", "filename");
