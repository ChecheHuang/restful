-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(191) NOT NULL,
    `user_password` VARCHAR(191) NOT NULL,
    `user_email` VARCHAR(191) NOT NULL,
    `user_avatar` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cus_profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `create_user_id` INTEGER NOT NULL,
    `cus_name` VARCHAR(191) NOT NULL,
    `cus_number` VARCHAR(191) NOT NULL,
    `cus_email` VARCHAR(191) NOT NULL,
    `cus_idnumber` VARCHAR(191) NOT NULL,
    `cus_birthday` DATETIME(3) NULL,
    `cus_remark` VARCHAR(191) NOT NULL,
    `cus_status` VARCHAR(191) NOT NULL,
    `cus_level` VARCHAR(191) NOT NULL,
    `edit_user_id` INTEGER NULL,
    `update_time` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cus_profile_label` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cus_id` INTEGER NOT NULL,
    `label_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Labels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Labels_label_name_key`(`label_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cus_profile` ADD CONSTRAINT `cus_profile_create_user_id_fkey` FOREIGN KEY (`create_user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cus_profile` ADD CONSTRAINT `cus_profile_edit_user_id_fkey` FOREIGN KEY (`edit_user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cus_profile_label` ADD CONSTRAINT `cus_profile_label_cus_id_fkey` FOREIGN KEY (`cus_id`) REFERENCES `cus_profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cus_profile_label` ADD CONSTRAINT `cus_profile_label_label_id_fkey` FOREIGN KEY (`label_id`) REFERENCES `Labels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
