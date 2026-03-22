import { uploadImage } from "@/lib/imageUpload";
import { buildR2AccessKey } from "@/lib/utils";

export const getBannerUrl = async (banner: File, shopId: number) => {
  if (!banner) return null;
  const bannerKey = buildR2AccessKey("shops", shopId, "banner", banner);
  const result = await uploadImage(banner, bannerKey);

  if (!result) {
    throw new Error("Failed to upload banner image");
  }
  return result.url;
};

export const getLogoUrl = async (logo: File, shopId: number) => {
  if (!logo) return null;
  const logoKey = buildR2AccessKey("shops", shopId, "logo", logo);
  const result = await uploadImage(logo, logoKey);

  if (!result) {
    throw new Error("Failed to upload logo image");
  }
  return result.url;
};
