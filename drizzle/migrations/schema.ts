import { sqliteTable, foreignKey, index, unique, text, integer, real } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export const account = sqliteTable("account", {
	id: text().primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: integer("access_token_expires_at"),
	refreshTokenExpiresAt: integer("refresh_token_expires_at"),
	scope: text(),
	password: text(),
	createdAt: integer("created_at").default(sql`cast(unixepoch('subsecond') * 1000 as integer)`).notNull(),
	updatedAt: integer("updated_at").notNull(),
},
(table) => [index("account_userId_idx").on(table.userId),
]);

export const session = sqliteTable("session", {
	id: text().primaryKey(),
	expiresAt: integer("expires_at").notNull(),
	token: text().notNull(),
	createdAt: integer("created_at").default(sql`cast(unixepoch('subsecond') * 1000 as integer)`).notNull(),
	updatedAt: integer("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
},
(table) => [index("session_userId_idx").on(table.userId),
unique("session_token_unique").on(table.token),
]);

export const user = sqliteTable("user", {
	id: text().primaryKey(),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: integer("email_verified", {"mode":"boolean"}).default(false).notNull(),
	image: text(),
	createdAt: integer("created_at").default(sql`cast(unixepoch('subsecond') * 1000 as integer)`).notNull(),
	updatedAt: integer("updated_at").default(sql`cast(unixepoch('subsecond') * 1000 as integer)`).notNull(),
},
(table) => [unique("user_email_unique").on(table.email),
]);

export const verification = sqliteTable("verification", {
	id: text().primaryKey(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: integer("expires_at").notNull(),
	createdAt: integer("created_at").default(sql`cast(unixepoch('subsecond') * 1000 as integer)`).notNull(),
	updatedAt: integer("updated_at").default(sql`cast(unixepoch('subsecond') * 1000 as integer)`).notNull(),
},
(table) => [index("verification_identifier_idx").on(table.identifier),
]);

export const deliverItems = sqliteTable("deliver_items", {
	id: integer().primaryKey({ autoIncrement: true }),
	deliveryId: integer("delivery_id").notNull().references(() => deliveries.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	foodItemId: integer("food_item_id").notNull().references(() => foodItems.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	quantity: integer().notNull(),
	createdAt: integer("created_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
	updatedAt: integer("updated_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
});

export const deliveries = sqliteTable("deliveries", {
	id: integer().primaryKey({ autoIncrement: true }),
	destinationLocationId: integer("destination_location_id").notNull().references(() => locations.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	machineId: integer("machine_id").notNull().references(() => machines.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	courierReference: text("courier_reference"),
	deliverDate: text("deliver_date").notNull(),
	deliverTime: text("deliver_time").notNull(),
	status: text().default("pending").notNull(),
	createdAt: integer("created_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
	updatedAt: integer("updated_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
});

export const disposes = sqliteTable("disposes", {
	id: integer().primaryKey({ autoIncrement: true }),
	machineId: integer("machine_id").notNull().references(() => machines.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	foodItemId: integer("food_item_id").notNull().references(() => foodItems.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	disposeDate: text("dispose_date").notNull(),
	disposeTime: text("dispose_time").notNull(),
	quantity: integer().notNull(),
	disposeReason: text("dispose_reason").default("other").notNull(),
	createdAt: integer("created_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
	updatedAt: integer("updated_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
});

export const foodItems = sqliteTable("food_items", {
	id: integer().primaryKey({ autoIncrement: true }),
	shopId: integer("shop_id").notNull().references(() => shops.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	name: text().notNull(),
	imageUrl: text("image_url"),
	description: text(),
	category: text().default("bento").notNull(),
	skuCode: text("sku_code").notNull(),
	price: real().notNull(),
	currency: text().default("AUD").notNull(),
	createdAt: integer("created_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
	updatedAt: integer("updated_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
},
(table) => [unique("food_items_shop_id_sku_code_unique").on(table.shopId, table.skuCode),
]);

export const inventories = sqliteTable("inventories", {
	id: integer().primaryKey({ autoIncrement: true }),
	machineId: integer("machine_id").notNull().references(() => machines.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	foodItemId: integer("food_item_id").notNull().references(() => foodItems.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	quantity: integer().notNull(),
	date: text().notNull(),
	createdAt: integer("created_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
	updatedAt: integer("updated_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
});

export const locations = sqliteTable("locations", {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	description: text(),
	address: text().notNull(),
	status: text().default("active").notNull(),
	createdAt: integer("created_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
	updatedAt: integer("updated_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
});

export const machines = sqliteTable("machines", {
	id: integer().primaryKey({ autoIncrement: true }),
	locationId: integer("location_id").references(() => locations.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	name: text().notNull(),
	serialNumber: text("serial_number").notNull(),
	status: text().default("active"),
	description: text(),
	installationDate: text("installation_date").notNull(),
	startWorkingHour: text("start_working_hour").notNull(),
	closeWorkingHour: text("close_working_hour").notNull(),
	createdAt: integer("created_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
	updatedAt: integer("updated_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
},
(table) => [unique("machines_serial_number_unique").on(table.serialNumber),
]);

export const menusFoodItems = sqliteTable("menus_food_items", {
	id: integer().primaryKey({ autoIncrement: true }),
	menuId: integer("menu_id").notNull().references(() => menus.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	foodItemId: integer("food_item_id").notNull().references(() => foodItems.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	createdAt: integer("created_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
	updatedAt: integer("updated_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
},
(table) => [unique("menus_food_items_menu_id_food_item_id_unique").on(table.menuId, table.foodItemId),
]);

export const menusMachines = sqliteTable("menus_machines", {
	id: integer().primaryKey({ autoIncrement: true }),
	menuId: integer("menu_id").notNull().references(() => menus.id, { onDelete: "restrict" } ),
	machineId: integer("machine_id").notNull().references(() => machines.id, { onDelete: "restrict" } ),
	createdAt: integer("created_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
	updatedAt: integer("updated_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
},
(table) => [unique("menus_machines_menu_id_machine_id_unique").on(table.menuId, table.machineId),
]);

export const menus = sqliteTable("menus", {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	description: text(),
	coverPhotoUrl: text("cover_photo_url"),
	date: text().notNull(),
	createdAt: integer("created_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
	updatedAt: integer("updated_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
});

export const sales = sqliteTable("sales", {
	id: integer().primaryKey({ autoIncrement: true }),
	machineId: integer("machine_id").notNull().references(() => machines.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	foodItemId: integer("food_item_id").notNull().references(() => foodItems.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	saleDate: text("sale_date").notNull(),
	saleTime: text("sale_time").notNull(),
	quantity: integer().notNull(),
	currency: text().default("AUD").notNull(),
	unitPrice: real("unit_price").notNull(),
	totalPrice: real("total_price").notNull(),
	paymentMethod: text("payment_method").default("cash").notNull(),
	createdAt: integer("created_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
	updatedAt: integer("updated_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
});

export const shop = sqliteTable("shop", {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	logoUrl: text("logo_url"),
	createdAt: integer("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: integer("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const shops = sqliteTable("shops", {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	description: text(),
	bannerUrl: text("banner_url"),
	logoUrl: text("logo_url"),
	videoUrl: text("video_url"),
	createdAt: integer("created_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
	updatedAt: integer("updated_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
});

export const systemUsers = sqliteTable("system_users", {
	id: integer().primaryKey({ autoIncrement: true }),
	shopId: integer("shop_id").references(() => shops.id, { onDelete: "restrict", onUpdate: "restrict" } ),
	name: text().notNull(),
	displayName: text("display_name").notNull(),
	role: text(),
	createdAt: integer("created_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
	updatedAt: integer("updated_at").default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`).notNull(),
},
(table) => [unique("system_users_shop_id_display_name_unique").on(table.shopId, table.displayName),
]);

