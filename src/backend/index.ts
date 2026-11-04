import { 
  saveEnquiry, 
  getAllEnquiries, 
  updateEnquiryStatus, 
  deleteEnquiry,
  initDatabaseSchema,
  saveGalleryMedia,
  getCustomGalleryMedia,
  updateGalleryMedia,
  deleteGalleryMedia 
} from "./database";
import { uploadToImageKit, deleteFromImageKit } from "./imagekit";

export const WeddingBackend = {
  // Database health & connectivity
  checkHealth: async () => {
    return await initDatabaseSchema();
  },

  // Enquiry Management
  enquiries: {
    create: saveEnquiry,
    list: getAllEnquiries,
    updateStatus: updateEnquiryStatus,
    delete: deleteEnquiry,
  },

  // Media & Gallery Management with ImageKit
  gallery: {
    upload: uploadToImageKit,
    save: saveGalleryMedia,
    list: getCustomGalleryMedia,
    update: updateGalleryMedia,
    delete: async (id: string | number, fileId?: string) => {
      if (fileId) {
        await deleteFromImageKit(fileId);
      }
      return await deleteGalleryMedia(id);
    },
  },
};

export default WeddingBackend;
