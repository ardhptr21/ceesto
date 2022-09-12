-- CreateTable
CREATE TABLE `Siswa` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `kelas` VARCHAR(191) NOT NULL,
    `nis` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
