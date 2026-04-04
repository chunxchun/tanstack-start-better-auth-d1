import type { InsertShopType, UpdateShopType } from "@/db/schema/shopTable";
import { getImageUrl } from "../shared.helper";
import { createShopFn, updateShopByIdFn } from "./shop.function";

const getBannerUrl = async (banner: File, shopId: number | string) => {
  if (!banner) return null;
  return getImageUrl(`shops/${String(shopId)}`, "banner", banner);
};

const getLogoUrl = async (logo: File, shopId: number | string) => {
  if (!logo) return null;
  return getImageUrl(`shops/${String(shopId)}`, "logo", logo);
};

export const shopHandleCreateSubmit = async (
  values: InsertShopType,
  banner: File | null = null,
  logo: File | null = null,
) => {
  try {
    const result = await createShopFn({ data: values });
    if (!result || result.length === 0) {
      throw new Error("Failed to create shop");
    }

    const shopId = result[0].id;

    let bannerUrl: string | null = null;
    let logoUrl: string | null = null;

    if (banner) {
      bannerUrl = await getBannerUrl(banner, shopId);
    }

    if (logo) {
      logoUrl = await getLogoUrl(logo, shopId);
    }

    const updatedValues: UpdateShopType = {
      id: shopId,
      bannerUrl: bannerUrl ?? undefined,
      logoUrl: logoUrl ?? undefined,
    };

    return await updateShopByIdFn({ data: updatedValues });
  } catch (error) {
    throw new Error(
      "Failed to create shop",
      error instanceof Error ? { cause: error } : undefined,
    );
  }
};

export const shopHandleUpdateSubmit = async (
  values: UpdateShopType,
  banner: File | null = null,
  logo: File | null = null,
) => {
  try {
    if (banner) {
      values.bannerUrl = await getBannerUrl(banner, values.id as number);
    }

    if (logo) {
      values.logoUrl = await getLogoUrl(logo, values.id as number);
    }

    return await updateShopByIdFn({ data: values });
  } catch (error) {
    throw new Error(
      "Failed to update shop",
      error instanceof Error ? { cause: error } : undefined,
    );
  }
};
