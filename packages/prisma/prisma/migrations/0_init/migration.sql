-- CreateTable
CREATE TABLE "u_user" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'CLIENT',
    "phoneNumber" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "avatar" TEXT,
    "birthdate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "u_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "u_wallet" (
    "id" UUID NOT NULL,
    "amount" TEXT NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "u_wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "u_wallet_transaction" (
    "id" UUID NOT NULL,
    "currentStatus" BOOLEAN NOT NULL,
    "validationCode" INTEGER NOT NULL,
    "missionId" UUID NOT NULL,
    "walletId" UUID NOT NULL,

    CONSTRAINT "u_wallet_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "u_notification" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "u_notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "u_partnership" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "u_partnership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "j_job" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "j_job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "m_announcement" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "address" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currentStatus" TEXT NOT NULL,
    "acceptedAt" TIMESTAMP(3) NOT NULL DEFAULT '1970-01-01 00:00:00 +00:00',

    CONSTRAINT "m_announcement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "m_estimation" (
    "id" UUID NOT NULL,
    "announcementId" UUID NOT NULL,
    "prestataireId" UUID NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "currentStatus" TEXT NOT NULL,

    CONSTRAINT "m_estimation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "m_chat" (
    "id" UUID NOT NULL,
    "currentStatus" BOOLEAN NOT NULL,

    CONSTRAINT "m_chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "m_message" (
    "id" UUID NOT NULL,
    "message" TEXT NOT NULL,
    "senderId" UUID NOT NULL,
    "chatId" UUID NOT NULL,
    "read" BOOLEAN NOT NULL,

    CONSTRAINT "m_message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "m_mission" (
    "id" UUID NOT NULL,
    "prestataireId" UUID NOT NULL,
    "announcementId" UUID NOT NULL,
    "currentStatus" TEXT NOT NULL,

    CONSTRAINT "m_mission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "m_review" (
    "id" UUID NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "missionId" UUID NOT NULL,

    CONSTRAINT "m_review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "m_geolocation" (
    "id" UUID NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "z" DOUBLE PRECISION NOT NULL,
    "missionId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "m_geolocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "m_validation_code" (
    "id" UUID NOT NULL,
    "missionId" UUID NOT NULL,
    "code" DOUBLE PRECISION NOT NULL,
    "currentStatus" TEXT NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "m_validation_code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_JobToUser" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "u_user_email_key" ON "u_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "u_wallet_userId_key" ON "u_wallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "u_wallet_transaction_missionId_key" ON "u_wallet_transaction"("missionId");

-- CreateIndex
CREATE UNIQUE INDEX "j_job_title_key" ON "j_job"("title");

-- CreateIndex
CREATE UNIQUE INDEX "m_mission_announcementId_key" ON "m_mission"("announcementId");

-- CreateIndex
CREATE UNIQUE INDEX "m_review_missionId_key" ON "m_review"("missionId");

-- CreateIndex
CREATE UNIQUE INDEX "m_geolocation_missionId_key" ON "m_geolocation"("missionId");

-- CreateIndex
CREATE UNIQUE INDEX "m_validation_code_missionId_key" ON "m_validation_code"("missionId");

-- CreateIndex
CREATE UNIQUE INDEX "_JobToUser_AB_unique" ON "_JobToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_JobToUser_B_index" ON "_JobToUser"("B");

-- AddForeignKey
ALTER TABLE "u_wallet" ADD CONSTRAINT "u_wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "u_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "u_wallet_transaction" ADD CONSTRAINT "u_wallet_transaction_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "m_mission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "u_wallet_transaction" ADD CONSTRAINT "u_wallet_transaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "u_wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "u_notification" ADD CONSTRAINT "u_notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "u_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "u_partnership" ADD CONSTRAINT "u_partnership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "u_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "m_announcement" ADD CONSTRAINT "m_announcement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "u_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "m_estimation" ADD CONSTRAINT "m_estimation_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "m_announcement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "m_estimation" ADD CONSTRAINT "m_estimation_prestataireId_fkey" FOREIGN KEY ("prestataireId") REFERENCES "u_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "m_message" ADD CONSTRAINT "m_message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "u_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "m_message" ADD CONSTRAINT "m_message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "m_chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "m_mission" ADD CONSTRAINT "m_mission_prestataireId_fkey" FOREIGN KEY ("prestataireId") REFERENCES "u_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "m_mission" ADD CONSTRAINT "m_mission_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "m_announcement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "m_review" ADD CONSTRAINT "m_review_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "m_mission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "m_geolocation" ADD CONSTRAINT "m_geolocation_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "m_mission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "m_geolocation" ADD CONSTRAINT "m_geolocation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "u_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "m_validation_code" ADD CONSTRAINT "m_validation_code_missionId_fkey" FOREIGN KEY ("missionId") REFERENCES "m_mission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToUser" ADD CONSTRAINT "_JobToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "j_job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToUser" ADD CONSTRAINT "_JobToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "u_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

