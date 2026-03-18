import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	account: {
		user: r.one.user({
			from: r.account.userId,
			to: r.user.id
		}),
	},
	user: {
		accounts: r.many.account(),
		sessions: r.many.session(),
	},
	session: {
		user: r.one.user({
			from: r.session.userId,
			to: r.user.id
		}),
	},
	foodItems: {
		deliveries: r.many.deliveries({
			from: r.foodItems.id.through(r.deliverItems.foodItemId),
			to: r.deliveries.id.through(r.deliverItems.deliveryId)
		}),
		machinesViaDisposes: r.many.machines({
			from: r.foodItems.id.through(r.disposes.foodItemId),
			to: r.machines.id.through(r.disposes.machineId),
			alias: "foodItems_id_machines_id_via_disposes"
		}),
		shop: r.one.shops({
			from: r.foodItems.shopId,
			to: r.shops.id
		}),
		machinesViaInventories: r.many.machines({
			from: r.foodItems.id.through(r.inventories.foodItemId),
			to: r.machines.id.through(r.inventories.machineId),
			alias: "foodItems_id_machines_id_via_inventories"
		}),
		menus: r.many.menus({
			from: r.foodItems.id.through(r.menusFoodItems.foodItemId),
			to: r.menus.id.through(r.menusFoodItems.menuId)
		}),
		machinesViaSales: r.many.machines({
			from: r.foodItems.id.through(r.sales.foodItemId),
			to: r.machines.id.through(r.sales.machineId),
			alias: "foodItems_id_machines_id_via_sales"
		}),
	},
	deliveries: {
		foodItems: r.many.foodItems(),
	},
	machines: {
		locations: r.many.locations({
			from: r.machines.id.through(r.deliveries.machineId),
			to: r.locations.id.through(r.deliveries.destinationLocationId),
			alias: "machines_id_locations_id_via_deliveries"
		}),
		foodItemsViaDisposes: r.many.foodItems({
			alias: "foodItems_id_machines_id_via_disposes"
		}),
		foodItemsViaInventories: r.many.foodItems({
			alias: "foodItems_id_machines_id_via_inventories"
		}),
		location: r.one.locations({
			from: r.machines.locationId,
			to: r.locations.id,
			alias: "machines_locationId_locations_id"
		}),
		menus: r.many.menus({
			from: r.machines.id.through(r.menusMachines.machineId),
			to: r.menus.id.through(r.menusMachines.menuId)
		}),
		foodItemsViaSales: r.many.foodItems({
			alias: "foodItems_id_machines_id_via_sales"
		}),
	},
	locations: {
		machinesViaDeliveries: r.many.machines({
			alias: "machines_id_locations_id_via_deliveries"
		}),
		machinesLocationId: r.many.machines({
			alias: "machines_locationId_locations_id"
		}),
	},
	shops: {
		foodItems: r.many.foodItems(),
		systemUsers: r.many.systemUsers(),
	},
	menus: {
		foodItems: r.many.foodItems(),
		machines: r.many.machines(),
	},
	systemUsers: {
		shop: r.one.shops({
			from: r.systemUsers.shopId,
			to: r.shops.id
		}),
	},
}))