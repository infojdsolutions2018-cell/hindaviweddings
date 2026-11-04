import ImageKit from "imagekit";

// Server-side ImageKit client singleton
export function getImageKitClient() {
  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  if (!publicKey || !privateKey || !urlEndpoint) {
    throw new Error("Missing ImageKit credentials in environment variables.");
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
  const imagekit = getImageKitClient();

  const response = await imagekit.upload({
    file: params.file,
    fileName: params.fileName,
    folder: params.folder || "/wedding-gallery",
    tags: params.tags || ["wedding", "gallery"],
    useUniqueFileName: true,
  });

  return response;
}

// Delete media file from ImageKit
export async function deleteFromImageKit(fileId: string) {
  try {
    const imagekit = getImageKitClient();
    await imagekit.deleteFile(fileId);
    return { success: true };
  } catch (err: any) {
    console.warn("Could not delete file from ImageKit:", err.message);
    return { success: false, error: err.message };
  }
}
