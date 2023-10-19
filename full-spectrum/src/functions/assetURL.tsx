import { contentfulClient } from "@/lib/createClient";

const client = contentfulClient

export async function fetchAssetUrl(assetId: string) {
    try {
      const asset = await client.getAsset(assetId);

      if (asset.fields && asset.fields.file) {
        return asset.fields.file.url;
      } else {
        console.error("Asset fields are undefined.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching asset:", error);
      return null;
    }
  }