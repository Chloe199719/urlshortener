-- CreateTable
CREATE TABLE "url" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,

    CONSTRAINT "url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "url_url_key" ON "url"("url");

-- CreateIndex
CREATE UNIQUE INDEX "url_shortUrl_key" ON "url"("shortUrl");
