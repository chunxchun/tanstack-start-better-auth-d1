DROP TABLE IF EXISTS `account`;
DROP TABLE IF EXISTS `session`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `verification`;
DROP TABLE IF EXISTS `deliver_items`;
DROP TABLE IF EXISTS `deliveries`;
DROP TABLE IF EXISTS `disposes`;
DROP TABLE IF EXISTS `food_items`;
DROP TABLE IF EXISTS `inventories`;
DROP TABLE IF EXISTS `locations`;
DROP TABLE IF EXISTS `machines`;
DROP TABLE IF EXISTS `menus_food_items`;	
DROP TABLE IF EXISTS `menus_machines`;
DROP TABLE IF EXISTS `menus`;
DROP TABLE IF EXISTS `sales`;
DROP TABLE IF EXISTS `shops`;	


CREATE TABLE `account` (
	`id` text PRIMARY KEY,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL,
	CONSTRAINT `fk_account_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL UNIQUE,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` text NOT NULL,
	CONSTRAINT `fk_session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY,
	`name` text NOT NULL,
	`email` text NOT NULL UNIQUE,
	`email_verified` integer DEFAULT false NOT NULL,
	`image` text,
	`display_name` text(100) NOT NULL,
	`role` text DEFAULT 'staff' NOT NULL,
	`shop_id` integer,
	`created_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	CONSTRAINT `fk_user_shop_id_shops_id_fk` FOREIGN KEY (`shop_id`) REFERENCES `shops`(`id`) ON UPDATE RESTRICT ON DELETE RESTRICT
);
--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `deliver_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`delivery_id` integer NOT NULL,
	`food_item_id` integer NOT NULL,
	`quantity` integer NOT NULL,
	`created_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	CONSTRAINT `fk_deliver_items_delivery_id_deliveries_id_fk` FOREIGN KEY (`delivery_id`) REFERENCES `deliveries`(`id`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	CONSTRAINT `fk_deliver_items_food_item_id_food_items_id_fk` FOREIGN KEY (`food_item_id`) REFERENCES `food_items`(`id`) ON UPDATE RESTRICT ON DELETE RESTRICT
);
--> statement-breakpoint
CREATE TABLE `deliveries` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`shop_id` integer NOT NULL,
	`destination_location_id` integer NOT NULL,
	`machine_id` integer NOT NULL,
	`courier_reference` text(100),
	`deliver_date` text NOT NULL,
	`deliver_time` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	CONSTRAINT `fk_deliveries_shop_id_shops_id_fk` FOREIGN KEY (`shop_id`) REFERENCES `shops`(`id`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	CONSTRAINT `fk_deliveries_destination_location_id_locations_id_fk` FOREIGN KEY (`destination_location_id`) REFERENCES `locations`(`id`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	CONSTRAINT `fk_deliveries_machine_id_machines_id_fk` FOREIGN KEY (`machine_id`) REFERENCES `machines`(`id`) ON UPDATE RESTRICT ON DELETE RESTRICT
);
--> statement-breakpoint
CREATE TABLE `disposes` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`shop_id` integer NOT NULL,
	`machine_id` integer NOT NULL,
	`food_item_id` integer NOT NULL,
	`dispose_date` text NOT NULL,
	`dispose_time` text NOT NULL,
	`quantity` integer NOT NULL,
	`dispose_reason` text DEFAULT 'other' NOT NULL,
	`created_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	CONSTRAINT `fk_disposes_shop_id_shops_id_fk` FOREIGN KEY (`shop_id`) REFERENCES `shops`(`id`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	CONSTRAINT `fk_disposes_machine_id_machines_id_fk` FOREIGN KEY (`machine_id`) REFERENCES `machines`(`id`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	CONSTRAINT `fk_disposes_food_item_id_food_items_id_fk` FOREIGN KEY (`food_item_id`) REFERENCES `food_items`(`id`) ON UPDATE RESTRICT ON DELETE RESTRICT
);
--> statement-breakpoint
CREATE TABLE `food_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`shop_id` integer NOT NULL,
	`name` text NOT NULL,
	`image_url` text,
	`description` text(200),
	`category` text DEFAULT 'bento' NOT NULL,
	`sku_code` text(100) NOT NULL,
	`price` real NOT NULL,
	`currency` text DEFAULT 'AUD' NOT NULL,
	`created_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	CONSTRAINT `fk_food_items_shop_id_shops_id_fk` FOREIGN KEY (`shop_id`) REFERENCES `shops`(`id`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	CONSTRAINT `food_items_shop_id_sku_code_unique` UNIQUE(`shop_id`,`sku_code`)
);
--> statement-breakpoint
CREATE TABLE `inventories` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`shop_id` integer NOT NULL,
	`machine_id` integer NOT NULL,
	`food_item_id` integer NOT NULL,
	`quantity` integer NOT NULL,
	`date` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	CONSTRAINT `fk_inventories_shop_id_shops_id_fk` FOREIGN KEY (`shop_id`) REFERENCES `shops`(`id`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	CONSTRAINT `fk_inventories_machine_id_machines_id_fk` FOREIGN KEY (`machine_id`) REFERENCES `machines`(`id`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	CONSTRAINT `fk_inventories_food_item_id_food_items_id_fk` FOREIGN KEY (`food_item_id`) REFERENCES `food_items`(`id`) ON UPDATE RESTRICT ON DELETE RESTRICT
);
--> statement-breakpoint
CREATE TABLE `locations` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`shop_id` integer NOT NULL,
	`name` text(100) NOT NULL,
	`description` text(200),
	`status` text DEFAULT 'active' NOT NULL,
	`address_line1` text(255) NOT NULL,
	`address_line2` text(255),
	`address_city` text(100) NOT NULL,
	`address_state` text(100),
	`address_postal_code` text(20),
	`address_country` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	CONSTRAINT `fk_locations_shop_id_shops_id_fk` FOREIGN KEY (`shop_id`) REFERENCES `shops`(`id`) ON UPDATE RESTRICT ON DELETE RESTRICT
);
--> statement-breakpoint
CREATE TABLE `machines` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`location_id` integer,
	`shop_id` integer,
	`name` text(100) NOT NULL,
	`serial_number` text(100) NOT NULL UNIQUE,
	`status` text DEFAULT 'active',
	`version` text NOT NULL,
	`mode` text NOT NULL,
	`day_end_stock_auto_reset` integer DEFAULT false,
	`description` text(200),
	`installation_date` text NOT NULL,
	`start_working_hour` text NOT NULL,
	`close_working_hour` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	CONSTRAINT `fk_machines_location_id_locations_id_fk` FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	CONSTRAINT `fk_machines_shop_id_shops_id_fk` FOREIGN KEY (`shop_id`) REFERENCES `shops`(`id`) ON UPDATE RESTRICT ON DELETE RESTRICT
);
--> statement-breakpoint
CREATE TABLE `menus_food_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`menu_id` integer NOT NULL,
	`food_item_id` integer NOT NULL,
	`created_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	CONSTRAINT `fk_menus_food_items_menu_id_menus_id_fk` FOREIGN KEY (`menu_id`) REFERENCES `menus`(`id`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	CONSTRAINT `fk_menus_food_items_food_item_id_food_items_id_fk` FOREIGN KEY (`food_item_id`) REFERENCES `food_items`(`id`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	CONSTRAINT `menus_food_items_menu_id_food_item_id_unique` UNIQUE(`menu_id`,`food_item_id`)
);
--> statement-breakpoint
CREATE TABLE `menus_machines` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`menu_id` integer NOT NULL,
	`machine_id` integer NOT NULL,
	`created_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	CONSTRAINT `fk_menus_machines_menu_id_menus_id_fk` FOREIGN KEY (`menu_id`) REFERENCES `menus`(`id`) ON DELETE RESTRICT,
	CONSTRAINT `fk_menus_machines_machine_id_machines_id_fk` FOREIGN KEY (`machine_id`) REFERENCES `machines`(`id`) ON DELETE RESTRICT,
	CONSTRAINT `menus_machines_menu_id_machine_id_unique` UNIQUE(`menu_id`,`machine_id`)
);
--> statement-breakpoint
CREATE TABLE `menus` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`shop_id` integer NOT NULL,
	`name` text(100) NOT NULL,
	`description` text(200),
	`cover_photo_url` text,
	`date` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	CONSTRAINT `fk_menus_shop_id_shops_id_fk` FOREIGN KEY (`shop_id`) REFERENCES `shops`(`id`) ON UPDATE RESTRICT ON DELETE RESTRICT
);
--> statement-breakpoint
CREATE TABLE `sales` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`shop_id` integer NOT NULL,
	`machine_id` integer NOT NULL,
	`food_item_id` integer NOT NULL,
	`sale_date` text NOT NULL,
	`sale_time` text NOT NULL,
	`quantity` integer NOT NULL,
	`currency` text DEFAULT 'AUD' NOT NULL,
	`unit_price` real NOT NULL,
	`total_price` real NOT NULL,
	`payment_method` text DEFAULT 'cash' NOT NULL,
	`created_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	CONSTRAINT `fk_sales_shop_id_shops_id_fk` FOREIGN KEY (`shop_id`) REFERENCES `shops`(`id`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	CONSTRAINT `fk_sales_machine_id_machines_id_fk` FOREIGN KEY (`machine_id`) REFERENCES `machines`(`id`) ON UPDATE RESTRICT ON DELETE RESTRICT,
	CONSTRAINT `fk_sales_food_item_id_food_items_id_fk` FOREIGN KEY (`food_item_id`) REFERENCES `food_items`(`id`) ON UPDATE RESTRICT ON DELETE RESTRICT
);
--> statement-breakpoint
CREATE TABLE `shops` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text(100) NOT NULL,
	`description` text(200),
	`banner_url` text,
	`logo_url` text,
	`video_url` text,
	`created_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `account` (`user_id`);--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `session` (`user_id`);--> statement-breakpoint
CREATE INDEX `verification_identifier_idx` ON `verification` (`identifier`);