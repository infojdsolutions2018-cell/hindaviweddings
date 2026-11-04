import ImageKit from "imagekit";

// Server-side ImageKit client singleton
export function getImageKitClient() {
  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  const envStatus = {
    hasPublicKey: !!publicKey,
    hasPrivateKey: !!privateKey,
    hasUrlEndpoint: !!urlEndpoint,
  };
  console.log(`[IMAGEKIT] Auth verification: public_key=${envStatus.hasPublicKey}, private_key=${envStatus.hasPrivateKey}, endpoint=${envStatus.hasUrlEndpoint}`);

  if (!publicKey || !privateKey || !urlEndpoint) {
    const missing = [
      !publicKey && "NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY",
      !privateKey && "IMAGEKIT_PRIVATE_KEY",
      !urlEndpoint && "NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT",
    ].filter(Boolean).join(", ");
    throw new Error(`Missing ImageKit credentials in environment variables: ${missing}`);
  }

  return new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint,
  });
}

// Upload buffer/file directly to ImageKit
export async function uploadToImageKit(params: {
  file: Buffer | string; // Buffer or base64 string
  fileName: string;
  folder?: string;
  tags?: string[];
}) {
  const startTime = Date.now();
  console.log(`[IMAGEKIT] Upload started | File: ${params.fileName} | Folder: ${params.folder || "/wedding-gallery"}`);

  try {
    const imagekit = getImageKitClient();

    const response = await imagekit.upload({
      file: params.file,
      fileName: params.fileName,
      folder: params.folder || "/wedding-gallery",
      tags: params.tags || ["wedding", "gallery"],
      useUniqueFileName: true,
    });

    console.log(`[IMAGEKIT] Upload successful (${Date.now() - startTime}ms) | FileID: ${response.fileId} | URL: ${response.url}`);
    return response;
  } catch (error: any) {
    console.error(`[IMAGEKIT] Upload failed (${Date.now() - startTime}ms) | Error: ${error.message || error}`);
    throw error;
  }
}

// Delete media file from ImageKit
export async function deleteFromImageKit(fileId: string) {
  const startTime = Date.now();
  console.log(`[IMAGEKIT] Delete started | FileID: ${fileId}`);
  try {
    const imagekit = getImageKitClient();
    await imagekit.deleteFile(fileId);
    console.log(`[IMAGEKIT] Delete successful (${Date.now() - startTime}ms) | FileID: ${fileId}`);
    return { success: true };
  } catch (err: any) {
    console.warn(`[IMAGEKIT] Delete warning (${Date.now() - startTime}ms) | FileID: ${fileId} | Error: ${err.message || err}`);
    return { success: false, error: err.message };
  }
}
