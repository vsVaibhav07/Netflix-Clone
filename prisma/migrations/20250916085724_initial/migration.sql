-- CreateTable
CREATE TABLE "public"."content" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "genres" TEXT[],
    "thumbnailurl" TEXT,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "videoUrl" TEXT,

    CONSTRAINT "content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."episodes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "thumbnailurl" TEXT,
    "seasonNumber" INTEGER NOT NULL,
    "episodeNumber" INTEGER NOT NULL,
    "contentId" UUID NOT NULL,

    CONSTRAINT "episodes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_content_title_category" ON "public"."content"("title", "category");

-- CreateIndex
CREATE INDEX "episodes_contentId_idx" ON "public"."episodes"("contentId");

-- AddForeignKey
ALTER TABLE "public"."episodes" ADD CONSTRAINT "episodes_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "public"."content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
