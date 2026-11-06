"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Users, Calendar, Mail, Phone, Clock, CheckCircle2, 
  Search, Filter, RefreshCw, Eye, ArrowLeft, Shield, AlertCircle,
  Upload, Film, ImageIcon, Plus, Check, Loader2, Trash2, ExternalLink,
  Edit2, Save, X, Play, LogOut
} from "lucide-react";
import { useRouter } from "next/navigation";
import { BUSINESS_CONFIG } from "@/config/business";

export type MilestoneCategory = "Marriage" | "Engagement" | "Halad" | "Sangit" | "Vidhi" | "Other";

interface EnquiryItem {
  id: number;
  fullName?: string;
  fullname?: string;
  phone: string;
  email: string;
  eventDate?: string;
  eventdate?: string;
  tentativeMonthYear?: string;
  tentativemonthyear?: string;
  weddingDates?: string;
  weddingdates?: string;
  guestCount?: string;
  guestcount?: string;
  estimatedBudget?: string;
  estimatedbudget?: string;
  location?: string;
  message?: string;
  remark?: string;
  status: "new" | "contacted" | "confirmed" | "closed";
  created_at: string;
}

interface GalleryItem {
  id: string;
  type: "image" | "reel";
  src: string;
  title: string;
  aspect: "square" | "tall" | "wide";
  category: MilestoneCategory;
  fileId?: string;
}

// Helper to format ISO date strings (e.g. "2026-11-28") to readable Indian/Wedding format (e.g. "28 Nov 2026")
function formatWeddingDate(rawDate?: string): string {
  if (!rawDate) return "Not finalised yet";
  // If it's a standard YYYY-MM-DD from HTML date picker
  if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
    const [year, month, day] = rawDate.split("-");
    const d = new Date(Number(year), Number(month) - 1, Number(day));
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  return rawDate;
}
const DEFAULT_CAPTIONS: Record<MilestoneCategory, string[]> = {
  Marriage: [
    "Sacred Royal Mandap Architecture & Muhurat",
    "Grand Royal Varmala Ceremony Stage Design",
    "Luminous Wedding Reception Banquet & Crystal Chandeliers",
    "Bespoke Maharashtrian Royal Wedding Celebration",
    "Dreamy Floral Mandap with Intricate Vedic Pillar Carvings",
  ],
  Engagement: [
    "Romantic Ring Ceremony & Floral Arch Decor",
    "Bespoke Royal Engagement Celebration Setup",
    "Intimate Ring Exchange Moments & Golden Ambience",
    "Modern Pastel Floral Engagement Backdrop",
    "Grand Ring Ceremony Stage & Lighting Architecture",
  ],
  Halad: [
    "Traditional Marigold Halad Courtyard Celebration",
    "Joyful Yellow Halad Rituals & Brass Urlis Setup",
    "Festive Halad Floral Shower & Sunlit Backdrop",
    "Vibrant Maharashtrian Halad Ceremony Styling",
    "Heritage Yellow & Orange Haldi Event Production",
  ],
  Sangit: [
    "High-Energy Sangit Concert Stage Production & Trussing",
    "Intelligent Beam Lighting & LED Dance Floor",
    "Lavish Sangit Musical Night & Fairy-Lit Backdrop",
    "Grand Sangit DJ Night & Acoustic Sound Architecture",
    "Bespoke Sangit Performances Stage Setup",
  ],
  Vidhi: [
    "Sacred Vedic Homa & Heritage Vidhi Canopy Setup",
    "Traditional Vedic Chants, Pooja & Sacred Rituals",
    "Auspicious Floral Gateway & Toran for Vidhi",
    "Authentic Maharashtrian Vedic Ceremony Architecture",
    "Ornate Mandap Rituals with Traditional Brass Bells",
  ],
  Other: [
    "Hindavi Weddings Exclusive Event Production",
    "Luxury Floral Architecture & Celebration Styling",
    "Grand Welcome Entrance & Tunnel Lighting",
    "Bespoke Wedding Hospitality & Decor Highlights",
    "Special Celebration Highlights & Production Decor",
  ],
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authChecking, setAuthChecking] = useState(true);
  const [activeTab, setActiveTab] = useState<"enquiries" | "gallery" | "upload">("enquiries");
  
  // Enquiries state
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateRangeFilter, setDateRangeFilter] = useState<"all" | "today" | "week" | "month" | "custom">("all");
  const [customStartDate, setCustomStartDate] = useState<string>("");
  const [customEndDate, setCustomEndDate] = useState<string>("");
  const [budgetFilter, setBudgetFilter] = useState<string>("all");
  const [customMinBudget, setCustomMinBudget] = useState<string>("");
  const [customMaxBudget, setCustomMaxBudget] = useState<string>("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);

  // Status & Remark Update Modal State
  const [statusModalEnquiry, setStatusModalEnquiry] = useState<EnquiryItem | null>(null);
  const [targetStatus, setTargetStatus] = useState<"new" | "contacted" | "confirmed" | "closed">("contacted");
  const [statusRemark, setStatusRemark] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Gallery items state
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState<string>("all");
  const [galleryTypeFilter, setGalleryTypeFilter] = useState<"all" | "image" | "reel">("all");

  // Edit Gallery Item State
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState<MilestoneCategory>("Other");
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Video / Image Preview Player Modal State
  const [previewMedia, setPreviewMedia] = useState<GalleryItem | null>(null);

  // ImageKit Media Upload State (Multiple Selection Support)
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [mediaTitle, setMediaTitle] = useState("");
  const [mediaCategory, setMediaCategory] = useState<MilestoneCategory>("Marriage");
  const [mediaType, setMediaType] = useState<"all" | "image" | "reel">("all");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Load Enquiries
  const fetchEnquiries = async () => {
    setLoadingEnquiries(true);
    try {
      const res = await fetch(`/api/enquiries?t=${Date.now()}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setEnquiries(json.data);
      }
    } catch (err) {
      console.error("Failed to load enquiries", err);
    } finally {
      setLoadingEnquiries(false);
    }
  };

  // Load Gallery Media
  const fetchGallery = async () => {
    setLoadingGallery(true);
    try {
      const res = await fetch(`/api/gallery?t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Pragma": "no-cache", "Cache-Control": "no-cache" }
      });
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setGalleryItems(json.data);
      }
    } catch (err) {
      console.error("Failed to load gallery items", err);
    } finally {
      setLoadingGallery(false);
    }
  };

  // Silent background sync for real-time live data
  const syncEnquiriesSilent = async () => {
    try {
      const res = await fetch(`/api/enquiries?t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Pragma": "no-cache", "Cache-Control": "no-cache" }
      });
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setEnquiries(json.data);
      }
    } catch {}
  };

  const syncGallerySilent = async () => {
    try {
      const res = await fetch(`/api/gallery?t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Pragma": "no-cache", "Cache-Control": "no-cache" }
      });
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setGalleryItems(json.data);
      }
    } catch {}
  };

  useEffect(() => {
    // Check if admin is authenticated
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        if (!res.ok || !data.authenticated) {
          router.replace("/admin/login");
          return;
        }
        setAuthChecking(false);
      } catch {
        router.replace("/admin/login");
      }
    };

    checkAuth();
  }, [router]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.replace("/admin/login");
    } catch {
      router.replace("/admin/login");
    }
  };

  useEffect(() => {
    if (authChecking) return;

    fetchEnquiries();
    fetchGallery();

    // Auto-refresh enquiries and gallery every 5 seconds so admin sees customer submissions automatically without clicking load
    const interval = setInterval(() => {
      syncEnquiriesSilent();
      syncGallerySilent();
    }, 5000);

    return () => clearInterval(interval);
  }, [authChecking]);

  // Open Status + Remark Update Modal
  const handleOpenStatusModal = (enquiry: EnquiryItem, newStatus: string) => {
    setStatusModalEnquiry(enquiry);
    setTargetStatus(newStatus as any);
    setStatusRemark(enquiry.remark || "");
  };

  // Submit Status Change with Optional Remark
  const handleConfirmStatusChange = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!statusModalEnquiry) return;

    setIsUpdatingStatus(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: statusModalEnquiry.id,
          status: targetStatus,
          remark: statusRemark.trim() || null,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setEnquiries((prev) =>
          prev.map((item) =>
            item.id === statusModalEnquiry.id
              ? { ...item, status: targetStatus, remark: statusRemark.trim() || undefined }
              : item
          )
        );
        if (selectedEnquiry && selectedEnquiry.id === statusModalEnquiry.id) {
          setSelectedEnquiry((prev: any) => ({
            ...prev,
            status: targetStatus,
            remark: statusRemark.trim() || undefined,
          }));
        }
        setStatusModalEnquiry(null);
      }
    } catch (err) {
      console.error("Failed to update status and remark", err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Update enquiry status directly
  const handleStatusChange = async (id: number, newStatus: string) => {
    const item = enquiries.find((e) => e.id === id);
    if (item) {
      handleOpenStatusModal(item, newStatus);
    }
  };

  // Delete enquiry
  const handleDeleteEnquiry = async (id: number) => {
    if (!confirm("Are you sure you want to permanently delete this client enquiry?")) return;
    try {
      const res = await fetch(`/api/enquiries?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete enquiry", err);
    }
  };

  // Delete Gallery item
  const handleDeleteGalleryItem = async (id: string, fileId?: string) => {
    if (!confirm("Are you sure you want to delete this media item?")) return;
    try {
      const res = await fetch(`/api/gallery/manage?id=${encodeURIComponent(id)}&fileId=${encodeURIComponent(fileId || "")}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setGalleryItems((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete media item", err);
    }
  };

  // Open Edit Modal for Gallery Media
  const handleOpenEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditCategory(item.category);
  };

  // Save Edits for Category & Description/Title
  const handleSaveMediaEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsSavingEdit(true);
    try {
      const res = await fetch("/api/gallery/manage", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingItem.id,
          title: editTitle.trim() || editingItem.title,
          category: editCategory,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setGalleryItems((prev) =>
          prev.map((item) =>
            item.id === editingItem.id
              ? { ...item, title: editTitle.trim() || item.title, category: editCategory }
              : item
          )
        );
        setEditingItem(null);
      } else {
        alert(json.error || "Failed to update media details");
      }
    } catch (err: any) {
      alert(err.message || "Network error updating media details");
    } finally {
      setIsSavingEdit(false);
    }
  };

  // ImageKit Multiple File Upload Handler
  const handleUploadMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadFiles.length === 0) {
      setUploadError("Please choose one or more images, reels, or video files to upload.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    // If user didn't input title, leave it completely empty (do not force default captions or filenames)
    const finalTitle = mediaTitle.trim();

    const effectiveCategory = mediaCategory || "Other";

    try {
      const formData = new FormData();
      uploadFiles.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("title", finalTitle);
      formData.append("category", effectiveCategory);
      if (mediaType !== "all") {
        formData.append("type", mediaType);
      }

      const res = await fetch("/api/gallery/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (json.success) {
        const count = json.totalUploaded || uploadFiles.length;
        setUploadSuccess(
          `Successfully uploaded ${count} media item${count > 1 ? "s" : ""} to ImageKit CDN under "${effectiveCategory}"!`
        );
        setUploadFiles([]);
        setMediaTitle("");

        // Optimistically prepend newly uploaded records immediately so UI updates instantly without waiting for network re-fetch
        if (Array.isArray(json.data) && json.data.length > 0) {
          const formattedNewItems = json.data.map((item: any) => ({
            id: String(item.id),
            type: item.type,
            src: item.src,
            title: item.title,
            aspect: item.aspect || (item.type === "reel" ? "tall" : "square"),
            category: item.category || effectiveCategory,
            fileId: item.fileId || item.file_id,
            created_at: item.created_at || new Date().toISOString(),
          }));
          setGalleryItems((prev) => [...formattedNewItems, ...prev]);
        }

        await fetchGallery();
        setActiveTab("gallery");
      } else {
        setUploadError(json.error || "Failed to upload to ImageKit CDN.");
      }
    } catch (err: any) {
      setUploadError(err.message || "Network error uploading to ImageKit.");
    } finally {
      setIsUploading(false);
    }
  };

  const filteredEnquiries = enquiries.filter((item) => {
    const clientName = item.fullName || item.fullname || "";
    const clientEmail = item.email || "";
    const clientPhone = item.phone || "";
    const clientCity = item.location || "";
    const clientRemark = item.remark || "";

    const matchesSearch =
      clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clientPhone.includes(searchTerm) ||
      clientCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clientRemark.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" ? true : item.status === statusFilter;

    // Filter by Submission Date Range
    let matchesDate = true;
    if (dateRangeFilter !== "all" && item.created_at) {
      const createdDate = new Date(item.created_at);
      const now = new Date();
      if (dateRangeFilter === "today") {
        matchesDate = createdDate.toDateString() === now.toDateString();
      } else if (dateRangeFilter === "week") {
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        matchesDate = createdDate >= oneWeekAgo;
      } else if (dateRangeFilter === "month") {
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        matchesDate = createdDate >= oneMonthAgo;
      } else if (dateRangeFilter === "custom") {
        if (customStartDate) {
          const start = new Date(customStartDate);
          start.setHours(0, 0, 0, 0);
          if (createdDate < start) matchesDate = false;
        }
        if (customEndDate) {
          const end = new Date(customEndDate);
          end.setHours(23, 59, 59, 999);
          if (createdDate > end) matchesDate = false;
        }
      }
    }

    // Filter by Budget Range
    let matchesBudget = true;
    if (budgetFilter !== "all") {
      const bRaw = (item.estimatedBudget || item.estimatedbudget || "").toLowerCase();
      // Extract numeric value from budget string (e.g., "12", "₹15 Lakhs", "25", "10,0000")
      const numMatch = bRaw.match(/(\d+(?:\.\d+)?)/);
      const numVal = numMatch ? parseFloat(numMatch[1]) : 0;

      if (budgetFilter === "under10") {
        matchesBudget = (numVal > 0 && numVal < 10) || bRaw.includes("5") || bRaw.includes("8") || bRaw.includes("under");
      } else if (budgetFilter === "10to25") {
        matchesBudget = (numVal >= 10 && numVal <= 25) || bRaw.includes("10") || bRaw.includes("12") || bRaw.includes("15") || bRaw.includes("20") || bRaw.includes("25");
      } else if (budgetFilter === "above25") {
        matchesBudget = numVal > 25 || bRaw.includes("above") || bRaw.includes("crore") || bRaw.includes("30") || bRaw.includes("50");
      } else if (budgetFilter === "custom") {
        const min = customMinBudget ? parseFloat(customMinBudget) : 0;
        const max = customMaxBudget ? parseFloat(customMaxBudget) : Infinity;
        if (numVal > 0) {
          matchesBudget = numVal >= min && numVal <= max;
        } else {
          // If no parsed number, keep unless filters strictly exclude
          matchesBudget = true;
        }
      }
    }

    return matchesSearch && matchesStatus && matchesDate && matchesBudget;
  });

  const filteredGallery = galleryItems.filter((item) => {
    const matchesCategory = galleryFilter === "all" ? true : item.category === galleryFilter;
    const matchesType =
      galleryTypeFilter === "all" ? true : item.type === galleryTypeFilter;
    return matchesCategory && matchesType;
  });

  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#FDF9F8] flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 border-3 border-[#801C30] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-serif text-lg text-charcoal">Verifying Admin Access...</p>
        <p className="font-sans text-xs text-charcoal/60 mt-1">Checking session credentials</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF9F8] text-charcoal font-sans selection:bg-[#F9CFCA] selection:text-[#801C30]">
      {/* Top Header styled in signature Pink / Blush Palette */}
      <header className="sticky top-0 z-40 bg-[#F9CFCA]/95 backdrop-blur-md border-b border-[#F4ABA2]/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-0 sm:h-20 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
          
          {/* Logo & Brand title (Back button removed as requested) */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-[#F4ABA2] bg-white p-0.5 shadow-sm flex-shrink-0">
                <Image
                  src="/logo.jpg"
                  alt="Hindavi Weddings Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h1 className="font-serif text-base sm:text-xl font-bold tracking-wide text-charcoal">
                    {BUSINESS_CONFIG.displayName}
                  </h1>
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-white text-[#801C30] border border-[#F4ABA2] shadow-xs">
                    Admin
                  </span>
                </div>
                <p className="hidden sm:block text-[11px] text-charcoal/70 font-medium">
                  Enquiries, Milestones &amp; ImageKit Media Management
                </p>
              </div>
            </div>

            {/* Mobile Refresh shortcut */}
            <button
              onClick={() => {
                fetchEnquiries();
                fetchGallery();
              }}
              className="sm:hidden p-2 rounded-xl bg-white border border-[#F4ABA2] text-charcoal hover:text-[#801C30] shadow-xs"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingEnquiries || loadingGallery ? "animate-spin text-[#801C30]" : ""}`} />
            </button>
          </div>

          {/* Navigation Tab Pills & Desktop Refresh */}
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2">
            <div className="inline-flex w-full sm:w-auto justify-around p-1 rounded-xl bg-white/90 border border-[#F4ABA2] text-xs font-semibold shadow-xs">
              <button
                onClick={() => setActiveTab("enquiries")}
                className={`flex-1 sm:flex-initial px-2.5 sm:px-4 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs ${
                  activeTab === "enquiries"
                    ? "bg-[#801C30] text-white shadow-sm font-bold"
                    : "text-charcoal/70 hover:text-charcoal"
                }`}
              >
                <Users className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Enquiries</span>
                <span className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[9px] sm:text-[10px] ${activeTab === "enquiries" ? "bg-white/25 text-white" : "bg-[#F9CFCA] text-charcoal"}`}>
                  {enquiries.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("gallery")}
                className={`flex-1 sm:flex-initial px-2.5 sm:px-4 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs ${
                  activeTab === "gallery"
                    ? "bg-[#801C30] text-white shadow-sm font-bold"
                    : "text-charcoal/70 hover:text-charcoal"
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Gallery</span>
                <span className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[9px] sm:text-[10px] ${activeTab === "gallery" ? "bg-white/25 text-white" : "bg-[#F9CFCA] text-charcoal"}`}>
                  {galleryItems.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("upload")}
                className={`flex-1 sm:flex-initial px-2.5 sm:px-4 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs ${
                  activeTab === "upload"
                    ? "bg-[#801C30] text-white shadow-sm font-bold"
                    : "text-charcoal/70 hover:text-charcoal"
                }`}
              >
                <Upload className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Upload</span>
              </button>
            </div>

            {/* Desktop Refresh Button */}
            <button
              onClick={() => {
                fetchEnquiries();
                fetchGallery();
              }}
              className="hidden sm:block p-2.5 rounded-xl bg-white border border-[#F4ABA2] hover:border-[#801C30] text-charcoal hover:text-[#801C30] transition-all shadow-xs shrink-0"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loadingEnquiries || loadingGallery ? "animate-spin text-[#801C30]" : ""}`} />
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 sm:p-2.5 rounded-xl bg-white border border-[#F4ABA2] hover:border-red-500 text-charcoal hover:text-red-600 transition-all shadow-xs shrink-0 flex items-center gap-1.5"
              title="Logout from Admin"
            >
              <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600" />
              <span className="hidden sm:inline text-xs font-sans font-bold text-red-600">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* ========================================================
            TAB 1: CLIENT ENQUIRIES MANAGEMENT
            ======================================================== */}
        {activeTab === "enquiries" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* KPI Stat Cards in Warm Signature Palette (5 Columns to include Closed Leads) */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
              <div 
                onClick={() => setStatusFilter("all")}
                className={`bg-white p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer shadow-xs space-y-1 ${
                  statusFilter === "all" ? "border-[#801C30] ring-2 ring-[#801C30]/20" : "border-[#F4ABA2]/50 hover:border-[#801C30]/60"
                }`}
              >
                <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-charcoal/60">
                  Total Leads
                </span>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">{enquiries.length}</div>
              </div>

              <div 
                onClick={() => setStatusFilter("new")}
                className={`bg-white p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer shadow-xs space-y-1 ${
                  statusFilter === "new" ? "border-sky-500 ring-2 ring-sky-300" : "border-sky-300 hover:border-sky-500"
                }`}
              >
                <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-sky-700">
                  New Uncontacted
                </span>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-sky-700">
                  {enquiries.filter((e) => e.status === "new").length}
                </div>
              </div>

              <div 
                onClick={() => setStatusFilter("contacted")}
                className={`bg-white p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer shadow-xs space-y-1 ${
                  statusFilter === "contacted" ? "border-amber-500 ring-2 ring-amber-300" : "border-amber-300 hover:border-amber-500"
                }`}
              >
                <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-amber-700">
                  In Discussion
                </span>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-700">
                  {enquiries.filter((e) => e.status === "contacted").length}
                </div>
              </div>

              <div 
                onClick={() => setStatusFilter("confirmed")}
                className={`bg-white p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer shadow-xs space-y-1 ${
                  statusFilter === "confirmed" ? "border-emerald-500 ring-2 ring-emerald-300" : "border-emerald-300 hover:border-emerald-500"
                }`}
              >
                <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-emerald-700">
                  Confirmed (Booked)
                </span>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-700">
                  {enquiries.filter((e) => e.status === "confirmed").length}
                </div>
              </div>

              <div 
                onClick={() => setStatusFilter("closed")}
                className={`col-span-2 sm:col-span-1 bg-white p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer shadow-xs space-y-1 ${
                  statusFilter === "closed" ? "border-gray-500 ring-2 ring-gray-300" : "border-gray-300 hover:border-gray-500"
                }`}
              >
                <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-gray-700">
                  Closed / Archived
                </span>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-gray-700">
                  {enquiries.filter((e) => e.status === "closed").length}
                </div>
              </div>
            </div>

            {/* Enhanced Filter and Search Bar with Date & Budget Filters */}
            <div className="bg-white p-4 rounded-2xl border border-[#F4ABA2]/60 shadow-xs space-y-3">
              <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
                {/* Search input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search client name, phone, email, city, or remark..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#FDF9F8] border border-[#F4ABA2]/60 rounded-xl text-xs text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-[#801C30] transition-colors"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal text-xs"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter Selectors Grid */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Status Filter */}
                  <div className="flex items-center gap-1.5 bg-[#FDF9F8] border border-[#F4ABA2]/60 rounded-xl px-2.5 py-1.5 text-xs">
                    <Filter className="w-3.5 h-3.5 text-charcoal/40 shrink-0" />
                    <span className="text-[10px] uppercase font-bold text-charcoal/50">Status:</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-transparent text-xs text-charcoal font-medium focus:outline-none cursor-pointer"
                    >
                      <option value="all">All Statuses ({enquiries.length})</option>
                      <option value="new">New ({enquiries.filter((e) => e.status === "new").length})</option>
                      <option value="contacted">Contacted ({enquiries.filter((e) => e.status === "contacted").length})</option>
                      <option value="confirmed">Confirmed ({enquiries.filter((e) => e.status === "confirmed").length})</option>
                      <option value="closed">Closed ({enquiries.filter((e) => e.status === "closed").length})</option>
                    </select>
                  </div>

                  {/* Date Range Filter */}
                  <div className="flex items-center gap-1.5 bg-[#FDF9F8] border border-[#F4ABA2]/60 rounded-xl px-2.5 py-1.5 text-xs">
                    <Calendar className="w-3.5 h-3.5 text-charcoal/40 shrink-0" />
                    <span className="text-[10px] uppercase font-bold text-charcoal/50">Received:</span>
                    <select
                      value={dateRangeFilter}
                      onChange={(e) => setDateRangeFilter(e.target.value as any)}
                      className="bg-transparent text-xs text-charcoal font-medium focus:outline-none cursor-pointer"
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">Past 7 Days</option>
                      <option value="month">Past 30 Days</option>
                      <option value="custom">Custom Date Range...</option>
                    </select>
                  </div>

                  {/* Budget Filter */}
                  <div className="flex items-center gap-1.5 bg-[#FDF9F8] border border-[#F4ABA2]/60 rounded-xl px-2.5 py-1.5 text-xs">
                    <span className="text-[10px] uppercase font-bold text-charcoal/50">Budget:</span>
                    <select
                      value={budgetFilter}
                      onChange={(e) => setBudgetFilter(e.target.value)}
                      className="bg-transparent text-xs text-charcoal font-medium focus:outline-none cursor-pointer"
                    >
                      <option value="all">All Budgets</option>
                      <option value="under10">Under ₹10 Lakhs</option>
                      <option value="10to25">₹10 - 25 Lakhs</option>
                      <option value="above25">₹25+ Lakhs</option>
                      <option value="custom">Custom Budget Range...</option>
                    </select>
                  </div>

                  {/* Reset Filters shortcut if filtered */}
                  {(searchTerm || statusFilter !== "all" || dateRangeFilter !== "all" || budgetFilter !== "all" || customStartDate || customEndDate || customMinBudget || customMaxBudget) && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("all");
                        setDateRangeFilter("all");
                        setCustomStartDate("");
                        setCustomEndDate("");
                        setBudgetFilter("all");
                        setCustomMinBudget("");
                        setCustomMaxBudget("");
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white border border-[#F4ABA2] text-[#801C30] hover:bg-[#F9CFCA]/30 text-xs font-bold transition-colors"
                      title="Clear all filters"
                    >
                      Reset ({filteredEnquiries.length} results)
                    </button>
                  )}
                </div>
              </div>

              {/* Custom Date / Budget Range Pickers Row (Visible when Custom is Selected) */}
              {(dateRangeFilter === "custom" || budgetFilter === "custom") && (
                <div className="pt-2 border-t border-[#F4ABA2]/30 flex flex-wrap items-center gap-3 text-xs bg-[#FDF9F8] p-2.5 rounded-xl">
                  {dateRangeFilter === "custom" && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold text-charcoal/70">From:</span>
                      <input
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        className="px-2 py-1 rounded-lg border border-[#F4ABA2]/60 bg-white text-xs text-charcoal focus:outline-none focus:border-[#801C30]"
                      />
                      <span className="text-[11px] font-bold text-charcoal/70">To:</span>
                      <input
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        className="px-2 py-1 rounded-lg border border-[#F4ABA2]/60 bg-white text-xs text-charcoal focus:outline-none focus:border-[#801C30]"
                      />
                    </div>
                  )}

                  {budgetFilter === "custom" && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold text-charcoal/70">Min Budget (Lakhs):</span>
                      <input
                        type="number"
                        placeholder="e.g. 5"
                        value={customMinBudget}
                        onChange={(e) => setCustomMinBudget(e.target.value)}
                        className="w-20 px-2 py-1 rounded-lg border border-[#F4ABA2]/60 bg-white text-xs text-charcoal focus:outline-none focus:border-[#801C30]"
                      />
                      <span className="text-[11px] font-bold text-charcoal/70">Max (Lakhs):</span>
                      <input
                        type="number"
                        placeholder="e.g. 35"
                        value={customMaxBudget}
                        onChange={(e) => setCustomMaxBudget(e.target.value)}
                        className="w-20 px-2 py-1 rounded-lg border border-[#F4ABA2]/60 bg-white text-xs text-charcoal focus:outline-none focus:border-[#801C30]"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Responsive Client Enquiries: Mobile Cards + Desktop Table */}
            {/* Desktop Table View (Hidden on small mobile) */}
            <div className="hidden md:block bg-white rounded-2xl border border-[#F4ABA2]/60 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#F9CFCA]/40 border-b border-[#F4ABA2]/60 text-charcoal/70 uppercase font-bold text-[10px] tracking-wider">
                      <th className="py-3.5 px-4">Client</th>
                      <th className="py-3.5 px-4">Contact</th>
                      <th className="py-3.5 px-4">Event Date &amp; Type</th>
                      <th className="py-3.5 px-4">Budget / Guests</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F4ABA2]/30 text-charcoal">
                    {loadingEnquiries ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-charcoal/60">
                          <Loader2 className="w-6 h-6 animate-spin text-[#801C30] mx-auto mb-2" />
                          Loading enquiry database...
                        </td>
                      </tr>
                    ) : filteredEnquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-charcoal/60">
                          No enquiries found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      filteredEnquiries.map((enquiry) => (
                        <tr key={enquiry.id} className="hover:bg-[#FDF9F8] transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-charcoal">
                            <div>{enquiry.fullName || enquiry.fullname || "Client"}</div>
                            <div className="text-[10px] text-charcoal/50 font-normal">
                              {new Date(enquiry.created_at).toLocaleDateString("en-IN", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5 font-medium text-charcoal">
                              <Phone className="w-3 h-3 text-[#801C30]" />
                              <a href={`tel:${enquiry.phone}`} className="hover:underline hover:text-[#801C30]">
                                {enquiry.phone}
                              </a>
                            </div>
                            <div className="flex items-center gap-1.5 text-charcoal/60 text-[11px] mt-0.5">
                              <Mail className="w-3 h-3 text-charcoal/40" />
                              <a href={`mailto:${enquiry.email}`} className="hover:underline">
                                {enquiry.email}
                              </a>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-charcoal font-medium">
                              {enquiry.weddingDates || enquiry.weddingdates 
                                ? formatWeddingDate(enquiry.weddingDates || enquiry.weddingdates)
                                : enquiry.tentativeMonthYear || enquiry.tentativemonthyear || enquiry.eventDate || enquiry.eventdate || "Date TBD"}
                            </div>
                            <div className="text-charcoal/60 text-[11px]">
                              {enquiry.location || "Pune / Maharashtra"}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-emerald-700 font-semibold">
                              {enquiry.estimatedBudget || enquiry.estimatedbudget
                                ? (enquiry.estimatedBudget || enquiry.estimatedbudget)?.includes("₹") || (enquiry.estimatedBudget || enquiry.estimatedbudget)?.toLowerCase().includes("lakh")
                                  ? (enquiry.estimatedBudget || enquiry.estimatedbudget)
                                  : `₹${enquiry.estimatedBudget || enquiry.estimatedbudget} Lakhs`
                                : "Not specified"}
                            </div>
                            <div className="text-charcoal/60 text-[11px]">
                              {enquiry.guestCount || enquiry.guestcount ? `${enquiry.guestCount || enquiry.guestcount} guests` : "Guests TBD"}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={enquiry.status}
                              onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                                enquiry.status === "new"
                                  ? "bg-sky-50 text-sky-700 border-sky-300"
                                  : enquiry.status === "contacted"
                                  ? "bg-amber-50 text-amber-700 border-amber-300"
                                  : enquiry.status === "confirmed"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                  : "bg-gray-100 text-gray-700 border-gray-300"
                              }`}
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="closed">Closed</option>
                            </select>
                            {enquiry.remark && (
                              <div
                                onClick={() => handleOpenStatusModal(enquiry, enquiry.status)}
                                className="text-[10px] text-charcoal/70 bg-[#FDF9F8] border border-[#F4ABA2]/50 rounded-md px-1.5 py-0.5 mt-1 max-w-[130px] truncate cursor-pointer hover:border-[#801C30]"
                                title={`Remark: ${enquiry.remark} (Click to edit)`}
                              >
                                📝 {enquiry.remark}
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedEnquiry(enquiry)}
                                className="p-1.5 rounded-lg bg-[#FDF9F8] hover:bg-white text-charcoal/70 hover:text-charcoal transition-colors border border-[#F4ABA2]/60"
                                title="View details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <a
                                href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Namaskar ${enquiry.fullName}, this is from Hindavi Wedding Family regarding your enquiry for ${enquiry.eventDate || "your wedding"}!`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 transition-colors border border-green-300"
                                title="Open WhatsApp chat"
                              >
                                <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                              </a>
                              <button
                                onClick={() => handleDeleteEnquiry(enquiry.id)}
                                className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors border border-red-200"
                                title="Delete enquiry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards View (Optimized for Phones) */}
            <div className="block md:hidden space-y-3">
              {loadingEnquiries ? (
                <div className="bg-white p-8 rounded-2xl border border-[#F4ABA2]/60 text-center text-charcoal/60">
                  <Loader2 className="w-6 h-6 animate-spin text-[#801C30] mx-auto mb-2" />
                  Loading enquiries...
                </div>
              ) : filteredEnquiries.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-[#F4ABA2]/60 text-center text-charcoal/60 text-xs">
                  No enquiries found matching filters.
                </div>
              ) : (
                filteredEnquiries.map((enquiry) => (
                  <div
                    key={enquiry.id}
                    className="bg-white p-4 rounded-2xl border border-[#F4ABA2]/60 shadow-xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-sm text-charcoal">{enquiry.fullName || enquiry.fullname || "Client"}</h4>
                        <span className="text-[10px] text-charcoal/50">
                          {new Date(enquiry.created_at).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      
                      {/* Status Selector */}
                      <div className="flex flex-col items-end gap-1">
                        <select
                          value={enquiry.status}
                          onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                          className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border cursor-pointer ${
                            enquiry.status === "new"
                              ? "bg-sky-50 text-sky-700 border-sky-300"
                              : enquiry.status === "contacted"
                              ? "bg-amber-50 text-amber-700 border-amber-300"
                              : enquiry.status === "confirmed"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                              : "bg-gray-100 text-gray-700 border-gray-300"
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="closed">Closed</option>
                        </select>
                        {enquiry.remark && (
                          <div
                            onClick={() => handleOpenStatusModal(enquiry, enquiry.status)}
                            className="text-[9px] text-charcoal/70 bg-[#FDF9F8] border border-[#F4ABA2]/50 rounded-md px-1.5 py-0.5 max-w-[120px] truncate cursor-pointer hover:border-[#801C30]"
                            title={`Remark: ${enquiry.remark}`}
                          >
                            📝 {enquiry.remark}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-[#F4ABA2]/30 text-charcoal/80">
                      <div>
                        <span className="text-[10px] text-charcoal/50 uppercase block font-semibold">Phone</span>
                        <a href={`tel:${enquiry.phone}`} className="font-bold text-[#801C30] hover:underline">
                          {enquiry.phone}
                        </a>
                      </div>
                      <div>
                        <span className="text-[10px] text-charcoal/50 uppercase block font-semibold">Dates</span>
                        <span className="font-medium">
                          {enquiry.weddingDates || enquiry.weddingdates 
                            ? formatWeddingDate(enquiry.weddingDates || enquiry.weddingdates)
                            : enquiry.tentativeMonthYear || enquiry.tentativemonthyear || enquiry.eventDate || enquiry.eventdate || "TBD"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-charcoal/50 uppercase block font-semibold">Budget</span>
                        <span className="font-bold text-emerald-700">
                          {enquiry.estimatedBudget || enquiry.estimatedbudget
                            ? (enquiry.estimatedBudget || enquiry.estimatedbudget)?.includes("₹") || (enquiry.estimatedBudget || enquiry.estimatedbudget)?.toLowerCase().includes("lakh")
                              ? (enquiry.estimatedBudget || enquiry.estimatedbudget)
                              : `₹${enquiry.estimatedBudget || enquiry.estimatedbudget} Lakhs`
                            : "TBD"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-charcoal/50 uppercase block font-semibold">City / Location</span>
                        <span className="font-medium">{enquiry.location || "Pune"}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#F4ABA2]/30">
                      <button
                        onClick={() => setSelectedEnquiry(enquiry)}
                        className="px-3 py-1.5 rounded-xl bg-[#F9CFCA]/40 hover:bg-[#F9CFCA] text-[#801C30] text-xs font-bold flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View All Details</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <a
                          href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Namaskar ${enquiry.fullName || enquiry.fullname || ""}, this is from Hindavi Wedding Family regarding your enquiry!`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-green-50 text-green-700 border border-green-300"
                          title="WhatsApp"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                        </a>
                        <button
                          onClick={() => handleDeleteEnquiry(enquiry.id)}
                          className="p-2 rounded-xl bg-red-50 text-red-600 border border-red-200"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: GALLERY MEDIA INVENTORY (WITH EDIT CATEGORY & DESCRIPTION)
            ======================================================== */}
        {activeTab === "gallery" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Filter Pills in Pink Theme with Format Toggle */}
            <div className="bg-white p-4 rounded-2xl border border-[#F4ABA2]/60 shadow-xs space-y-3.5">
              {/* Milestone Filter Pills */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {["all", "Marriage", "Engagement", "Halad", "Sangit", "Vidhi", "Other"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setGalleryFilter(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                        galleryFilter === cat
                          ? "bg-[#801C30] text-white font-bold shadow-xs"
                          : "bg-[#FDF9F8] text-charcoal/70 hover:text-charcoal border border-[#F4ABA2]/50"
                      }`}
                    >
                      {cat === "all" ? `All Categories (${galleryItems.length})` : cat}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setActiveTab("upload")}
                  className="px-3.5 py-1.5 rounded-xl bg-[#801C30] hover:bg-[#6F1829] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Media</span>
                </button>
              </div>

              {/* Media Format Filter: All / Photos / Reels (Responsive for Mobile & Desktop) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-3 border-t border-[#F4ABA2]/30">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-[11px] font-bold text-charcoal/70 uppercase tracking-wider">Format Filter:</span>
                  <div className="grid grid-cols-3 sm:inline-flex p-1 rounded-xl bg-[#FDF9F8] border border-[#F4ABA2]/50 text-xs font-semibold gap-1 sm:gap-0">
                    <button
                      onClick={() => setGalleryTypeFilter("all")}
                      className={`px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-lg text-center transition-all ${
                        galleryTypeFilter === "all"
                          ? "bg-[#801C30] text-white font-bold shadow-xs"
                          : "text-charcoal/70 hover:text-charcoal"
                      }`}
                    >
                      All ({galleryItems.length})
                    </button>
                    <button
                      onClick={() => setGalleryTypeFilter("image")}
                      className={`px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-lg transition-all flex items-center justify-center gap-1 ${
                        galleryTypeFilter === "image"
                          ? "bg-[#801C30] text-white font-bold shadow-xs"
                          : "text-charcoal/70 hover:text-charcoal"
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5 shrink-0" />
                      <span>Photos ({galleryItems.filter((i) => i.type === "image").length})</span>
                    </button>
                    <button
                      onClick={() => setGalleryTypeFilter("reel")}
                      className={`px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-lg transition-all flex items-center justify-center gap-1 ${
                        galleryTypeFilter === "reel"
                          ? "bg-[#801C30] text-white font-bold shadow-xs"
                          : "text-charcoal/70 hover:text-charcoal"
                      }`}
                    >
                      <Film className="w-3.5 h-3.5 shrink-0" />
                      <span>Reels ({galleryItems.filter((i) => i.type === "reel").length})</span>
                    </button>
                  </div>
                </div>

                <div className="text-[11px] sm:text-xs text-charcoal/60">
                  Showing <span className="font-bold text-[#801C30]">{filteredGallery.length}</span> media item{filteredGallery.length !== 1 ? "s" : ""}
                </div>
              </div>
            </div>

            {/* Media Grid with Edit Option */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-white rounded-2xl border border-[#F4ABA2]/60 overflow-hidden shadow-xs flex flex-col"
                >
                  <div 
                    onClick={() => setPreviewMedia(item)}
                    className="relative aspect-square w-full bg-[#F9CFCA]/30 overflow-hidden cursor-pointer group"
                  >
                    {item.type === "reel" ? (
                      <>
                        <video
                          src={item.src}
                          className="w-full h-full object-cover"
                          playsInline
                          muted
                          loop
                          onMouseOver={(e) => (e.target as HTMLVideoElement).play().catch(() => {})}
                          onMouseOut={(e) => {
                            const v = e.target as HTMLVideoElement;
                            v.pause();
                            v.currentTime = 0;
                          }}
                        />
                        {/* Centered Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/10 transition-colors">
                          <div className="w-11 h-11 rounded-full bg-[#801C30]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        sizes="250px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}

                    <div className="absolute top-2 left-2 bg-white/95 text-[#801C30] text-[9px] font-sans font-bold px-2 py-0.5 rounded-full uppercase border border-[#F4ABA2]/80 shadow-xs z-10">
                      {item.category}
                    </div>

                    {item.type === "reel" && (
                      <div className="absolute top-2 right-2 bg-[#801C30] text-white p-1 rounded-md shadow-xs z-10">
                        <Film className="w-3 h-3" />
                      </div>
                    )}
                  </div>

                  <div className="p-3 space-y-2 flex-grow flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold text-charcoal line-clamp-2" title={item.title}>
                        {item.title}
                      </p>
                      <span className="text-[10px] text-charcoal/50 font-medium capitalize">
                        Milestone: {item.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#F4ABA2]/30">
                      <div className="flex items-center gap-2">
                        <a
                          href={item.src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-[#801C30] hover:underline flex items-center gap-1 font-semibold"
                        >
                          <span>View</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="flex items-center gap-1">
                        {/* Edit Button */}
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1 rounded-lg text-charcoal/60 hover:text-[#801C30] hover:bg-[#F9CFCA]/40 transition-colors"
                          title="Edit category and description"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteGalleryItem(item.id, item.fileId)}
                          className="p-1 rounded-lg text-charcoal/50 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete media"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: IMAGEKIT MEDIA UPLOAD (PINK PALETTE)
            ======================================================== */}
        {activeTab === "upload" && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl border border-[#F4ABA2]/60 p-6 sm:p-10 shadow-sm space-y-6">
              <div className="flex items-center gap-4 pb-4 border-b border-[#F4ABA2]/40">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F9CFCA] to-[#801C30] flex items-center justify-center text-white shadow-md shadow-[#801C30]/20 flex-shrink-0">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-charcoal">
                    Upload Photos &amp; Reels
                  </h2>
                  <p className="text-xs text-charcoal/60 font-medium">
                    Automated ImageKit CDN Cloud Ingestion &amp; Live Gallery Publishing
                  </p>
                </div>
              </div>

              {uploadSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{uploadSuccess}</span>
                </div>
              )}

              {uploadError && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              <form onSubmit={handleUploadMedia} className="space-y-5 text-xs">
                {/* Media Format Toggle */}
                <div>
                  <label className="block font-bold text-charcoal mb-2">Media Format Filter</label>
                  <div className="grid grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setMediaType("all")}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        mediaType === "all"
                          ? "bg-[#F9CFCA]/40 border-[#801C30] text-[#801C30] font-bold shadow-xs"
                          : "bg-[#FDF9F8] border-[#F4ABA2]/50 text-charcoal/70"
                      }`}
                    >
                      <div className="font-bold">Photos &amp; Reels</div>
                      <div className="text-[10px] text-charcoal/50">Any Format</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMediaType("image")}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        mediaType === "image"
                          ? "bg-[#F9CFCA]/40 border-[#801C30] text-[#801C30] font-bold shadow-xs"
                          : "bg-[#FDF9F8] border-[#F4ABA2]/50 text-charcoal/70"
                      }`}
                    >
                      <div className="font-bold">Photos Only</div>
                      <div className="text-[10px] text-charcoal/50">JPG, PNG, WEBP</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMediaType("reel")}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        mediaType === "reel"
                          ? "bg-[#F9CFCA]/40 border-[#801C30] text-[#801C30] font-bold shadow-xs"
                          : "bg-[#FDF9F8] border-[#F4ABA2]/50 text-charcoal/70"
                      }`}
                    >
                      <div className="font-bold">Reels Only</div>
                      <div className="text-[10px] text-charcoal/50">MP4, WEBM, MOV</div>
                    </button>
                  </div>
                </div>

                {/* Multi-File Dropzone */}
                <div>
                  <label className="block font-bold text-charcoal mb-2">
                    Select File(s) from Computer (Multiple Selection Enabled)
                  </label>
                  <label 
                    htmlFor="adminFileInput"
                    className="flex flex-col items-center justify-center border-2 border-dashed border-[#F4ABA2] hover:border-[#801C30] rounded-2xl p-6 sm:p-8 cursor-pointer bg-[#FDF9F8] hover:bg-white transition-all group"
                  >
                    <Upload className="w-8 h-8 text-[#801C30] mb-2 group-hover:scale-110 transition-transform" />
                    <span className="font-bold text-charcoal text-sm text-center">
                      {uploadFiles.length > 0
                        ? `${uploadFiles.length} file${uploadFiles.length > 1 ? "s" : ""} selected`
                        : "Click here to choose multiple photos, reels, or videos"}
                    </span>
                    <span className="text-[11px] text-charcoal/50 mt-1 text-center">
                      {uploadFiles.length > 0
                        ? `Total Size: ${(uploadFiles.reduce((acc, f) => acc + f.size, 0) / (1024 * 1024)).toFixed(2)} MB • Ready to batch upload`
                        : "You can select multiple photos and reels at the same time (Hold Ctrl/Shift to pick multiple)"}
                    </span>

                    {/* Preview list of selected files */}
                    {uploadFiles.length > 0 && (
                      <div className="mt-3.5 max-h-36 overflow-y-auto w-full max-w-md bg-white border border-[#F4ABA2]/60 rounded-xl p-2.5 divide-y divide-[#F4ABA2]/20">
                        {uploadFiles.map((file, idx) => (
                          <div key={idx} className="flex items-center justify-between py-1 px-1.5 text-[11px]">
                            <span className="truncate max-w-[240px] font-medium text-charcoal">{file.name}</span>
                            <span className="text-charcoal/50">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <input
                      id="adminFileInput"
                      type="file"
                      multiple
                      accept={mediaType === "image" ? "image/*" : mediaType === "reel" ? "video/*" : "image/*,video/*"}
                      className="sr-only"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const fileArray = Array.from(e.target.files);
                          setUploadFiles(fileArray);
                          setUploadError(null);
                        }
                      }}
                    />
                  </label>
                </div>

                {/* Milestone Category Selector with 'Other' */}
                <div>
                  <label className="block font-bold text-charcoal mb-1.5">
                    Wedding Ritual / Milestone
                  </label>
                  <select
                    value={mediaCategory}
                    onChange={(e: any) => setMediaCategory(e.target.value)}
                    className="w-full max-w-full truncate p-2.5 sm:p-3 bg-[#FDF9F8] border border-[#F4ABA2]/60 rounded-xl text-charcoal font-medium text-xs sm:text-sm focus:outline-none focus:border-[#801C30]"
                  >
                    <option value="Marriage">1. Marriage (Mandap &amp; Reception)</option>
                    <option value="Engagement">2. Engagement (Ring Ceremony)</option>
                    <option value="Halad">3. Halad (Haldi Courtyard)</option>
                    <option value="Sangit">4. Sangit (Sangeet &amp; Stage)</option>
                    <option value="Vidhi">5. Vidhi (Vedic Rituals)</option>
                    <option value="Other">6. Other / Highlights</option>
                  </select>
                </div>

                {/* Display Title / Caption with Smart Presets */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-bold text-charcoal">Display Title / Caption</label>
                    <span className="text-[10px] text-charcoal/50 italic">
                      Leave empty to auto-set 4-5 smart ritual captions
                    </span>
                  </div>
                  <input
                    type="text"
                    value={mediaTitle}
                    onChange={(e) => setMediaTitle(e.target.value)}
                    placeholder={`e.g. ${DEFAULT_CAPTIONS[mediaCategory]?.[0] || "Bespoke Royal Wedding Moment"}`}
                    className="w-full p-3 bg-[#FDF9F8] border border-[#F4ABA2]/60 rounded-xl text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-[#801C30]"
                  />

                  {/* Quick Smart Caption Suggestion Pills */}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="text-[10px] text-charcoal/60 self-center mr-1">Quick Suggestions:</span>
                    {DEFAULT_CAPTIONS[mediaCategory]?.map((cap, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setMediaTitle(cap)}
                        className="text-[10px] px-2.5 py-1 rounded-lg bg-[#F9CFCA]/30 hover:bg-[#F9CFCA] text-[#801C30] border border-[#F4ABA2]/50 transition-colors font-medium"
                      >
                        {cap}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isUploading || uploadFiles.length === 0}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#801C30] to-[#A82835] hover:from-[#6F1829] hover:to-[#801C30] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#801C30]/20 transition-all mt-4"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading {uploadFiles.length} item{uploadFiles.length > 1 ? "s" : ""} to ImageKit CDN &amp; Saving...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>
                        Upload {uploadFiles.length > 0 ? `${uploadFiles.length} Selected Media` : "& Save Media"}
                      </span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* EDIT MODAL: Update Category & Description */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#F4ABA2] w-full max-w-md my-auto max-h-[92vh] sm:max-h-[88vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-[#F4ABA2]/40 bg-[#F9CFCA]/30 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <Edit2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#801C30]" />
                <h3 className="font-serif text-lg sm:text-xl font-bold text-charcoal">
                  Edit Media Information
                </h3>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 sm:p-2 rounded-xl bg-white text-charcoal/60 hover:text-charcoal border border-[#F4ABA2]/60 hover:border-[#801C30] transition-colors shadow-xs flex-shrink-0"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMediaEdit} className="p-4 sm:p-6 space-y-4 text-xs font-sans overflow-y-auto flex-1">
              {/* Preview Thumbnail - Fully constrained to prevent overflowing on mobile */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FDF9F8] border border-[#F4ABA2]/40 min-w-0">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-black/10 flex-shrink-0 border border-[#F4ABA2]/40">
                  {editingItem.type === "reel" ? (
                    <video src={editingItem.src} className="w-full h-full object-cover" muted />
                  ) : (
                    <Image src={editingItem.src} alt={editingItem.title} fill className="object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold text-[#801C30] block">
                    {editingItem.type.toUpperCase()}
                  </span>
                  <div className="font-medium text-charcoal/80 text-[11px] truncate w-full" title={editingItem.title}>
                    {editingItem.title || "Untitled Media"}
                  </div>
                </div>
              </div>

              {/* Edit Category (Marriage #1 and Other #6) */}
              <div>
                <label className="block font-bold text-charcoal mb-1.5">
                  Change Ritual / Category
                </label>
                <select
                  value={editCategory}
                  onChange={(e: any) => setEditCategory(e.target.value)}
                  className="w-full max-w-full truncate p-2 sm:p-2.5 bg-[#FDF9F8] border border-[#F4ABA2]/60 rounded-xl text-charcoal font-medium text-xs focus:outline-none focus:border-[#801C30]"
                >
                  <option value="Marriage">1. Marriage (Mandap &amp; Reception)</option>
                  <option value="Engagement">2. Engagement (Ring Ceremony)</option>
                  <option value="Halad">3. Halad (Haldi Courtyard)</option>
                  <option value="Sangit">4. Sangit (Sangeet &amp; Stage)</option>
                  <option value="Vidhi">5. Vidhi (Vedic Rituals)</option>
                  <option value="Other">6. Other / Highlights</option>
                </select>
              </div>

              {/* Edit Title / Caption */}
              <div>
                <label className="block font-bold text-charcoal mb-1.5">
                  Change Description / Caption
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Enter custom title or caption..."
                  className="w-full p-2.5 bg-[#FDF9F8] border border-[#F4ABA2]/60 rounded-xl text-charcoal focus:outline-none focus:border-[#801C30]"
                />

                {/* Quick suggestions for selected edit category */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {DEFAULT_CAPTIONS[editCategory]?.slice(0, 3).map((cap, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEditTitle(cap)}
                      className="text-[9px] px-2 py-0.5 rounded-md bg-[#F9CFCA]/30 hover:bg-[#F9CFCA] text-[#801C30] border border-[#F4ABA2]/40"
                    >
                      {cap}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-[#F4ABA2]/30">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl bg-white border border-[#F4ABA2] text-charcoal font-semibold hover:bg-[#FDF9F8] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="px-4 py-2 rounded-xl bg-[#801C30] hover:bg-[#6F1829] text-white font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  {isSavingEdit ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#F4ABA2] w-full max-w-lg my-auto max-h-[92vh] sm:max-h-[88vh] flex flex-col shadow-2xl transition-all overflow-hidden">
            {/* Modal Header */}
            <div className="px-4 py-3.5 sm:px-6 sm:py-5 border-b border-[#F4ABA2]/40 bg-[#F9CFCA]/30 flex items-center justify-between flex-shrink-0">
              <div className="pr-2">
                <h3 className="font-serif text-base sm:text-xl font-bold text-charcoal tracking-tight truncate max-w-[250px] sm:max-w-sm">
                  {selectedEnquiry.fullName || selectedEnquiry.fullname || "Client Enquiry"}
                </h3>
                <p className="text-[10px] sm:text-xs text-charcoal/60 mt-0.5">
                  Received on {new Date(selectedEnquiry.created_at).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 sm:p-2 rounded-xl bg-white text-charcoal/60 hover:text-charcoal border border-[#F4ABA2]/60 hover:border-[#801C30] transition-colors shadow-xs flex-shrink-0"
                title="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable with bottom padding) */}
            <div className="p-4 sm:p-6 space-y-3.5 sm:space-y-4 text-xs overflow-y-auto flex-1">
              {/* Primary Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FDF9F8] border border-[#F4ABA2]/40 space-y-1">
                  <span className="text-[10px] text-charcoal/50 uppercase font-bold tracking-wider block">
                    Full Name
                  </span>
                  <div className="font-bold text-sm sm:text-base text-charcoal break-words">
                    {selectedEnquiry.fullName || selectedEnquiry.fullname || "Not specified"}
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FDF9F8] border border-[#F4ABA2]/40 space-y-1">
                  <span className="text-[10px] text-charcoal/50 uppercase font-bold tracking-wider block">
                    Phone Number
                  </span>
                  <div className="font-bold text-sm sm:text-base text-[#801C30] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    <a href={`tel:${selectedEnquiry.phone}`} className="hover:underline">
                      {selectedEnquiry.phone}
                    </a>
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FDF9F8] border border-[#F4ABA2]/40 space-y-1 sm:col-span-2">
                  <span className="text-[10px] text-charcoal/50 uppercase font-bold tracking-wider block">
                    Email Address
                  </span>
                  <div className="font-semibold text-xs sm:text-sm text-charcoal flex items-center gap-1.5 break-all">
                    <Mail className="w-3.5 h-3.5 text-charcoal/40 shrink-0" />
                    <a href={`mailto:${selectedEnquiry.email}`} className="hover:underline">
                      {selectedEnquiry.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Event Timing & Planning Details */}
              <div className="border-t border-[#F4ABA2]/30 pt-3">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#801C30] mb-2.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Wedding Event Specifications</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <div className="p-3 rounded-xl bg-[#FDF9F8] border border-[#F4ABA2]/40 space-y-1">
                    <span className="text-[10px] text-charcoal/50 uppercase font-bold block">
                      Tentative Month &amp; Year
                    </span>
                    <div className="font-semibold text-charcoal text-xs sm:text-sm">
                      {selectedEnquiry.tentativeMonthYear || selectedEnquiry.tentativemonthyear || selectedEnquiry.eventDate || selectedEnquiry.eventdate || "Not selected"}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FDF9F8] border border-[#F4ABA2]/40 space-y-1">
                    <span className="text-[10px] text-charcoal/50 uppercase font-bold block">
                      Exact Wedding Dates
                    </span>
                    <div className="font-semibold text-charcoal text-xs sm:text-sm">
                      {formatWeddingDate(selectedEnquiry.weddingDates || selectedEnquiry.weddingdates)}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FDF9F8] border border-[#F4ABA2]/40 space-y-1">
                    <span className="text-[10px] text-charcoal/50 uppercase font-bold block">
                      Event Location / City
                    </span>
                    <div className="font-semibold text-charcoal text-xs sm:text-sm">
                      {selectedEnquiry.location || "Pune / Maharashtra"}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FDF9F8] border border-[#F4ABA2]/40 space-y-1">
                    <span className="text-[10px] text-charcoal/50 uppercase font-bold block">
                      Expected Number of Guests
                    </span>
                    <div className="font-semibold text-charcoal text-xs sm:text-sm">
                      {selectedEnquiry.guestCount || selectedEnquiry.guestcount
                        ? `${selectedEnquiry.guestCount || selectedEnquiry.guestcount} Guests`
                        : "Not specified"}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FDF9F8] border border-[#F4ABA2]/40 space-y-1">
                    <span className="text-[10px] text-charcoal/50 uppercase font-bold block">
                      Estimated Budget
                    </span>
                    <div className="font-bold text-emerald-700 text-xs sm:text-sm">
                      {selectedEnquiry.estimatedBudget || selectedEnquiry.estimatedbudget
                        ? (selectedEnquiry.estimatedBudget || selectedEnquiry.estimatedbudget)?.includes("₹") || (selectedEnquiry.estimatedBudget || selectedEnquiry.estimatedbudget)?.toLowerCase().includes("lakh")
                          ? (selectedEnquiry.estimatedBudget || selectedEnquiry.estimatedbudget)
                          : `₹${selectedEnquiry.estimatedBudget || selectedEnquiry.estimatedbudget} Lakhs`
                        : "Not specified"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Notes & Envisioned Details */}
              {selectedEnquiry.message && (
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FDF9F8] border border-[#F4ABA2]/40 space-y-1">
                  <span className="text-[10px] text-charcoal/50 uppercase font-bold tracking-wider block">
                    Additional Notes / Envisioned Details
                  </span>
                  <p className="text-charcoal leading-relaxed whitespace-pre-wrap font-medium text-xs sm:text-sm">
                    {selectedEnquiry.message}
                  </p>
                </div>
              )}

              {/* Internal Admin Remark */}
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-1.5">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <span className="text-[10px] text-amber-800 uppercase font-bold tracking-wider block">
                    Admin Status &amp; Remark Note
                  </span>
                  <button
                    onClick={() => {
                      const cur = selectedEnquiry;
                      handleOpenStatusModal(cur, cur.status);
                    }}
                    className="text-[11px] font-bold text-[#801C30] hover:underline flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Change Status / Add Remark</span>
                  </button>
                </div>
                {selectedEnquiry.remark ? (
                  <p className="text-charcoal font-medium text-xs sm:text-sm whitespace-pre-wrap bg-white/70 p-2.5 rounded-lg border border-amber-200/60">
                    {selectedEnquiry.remark}
                  </p>
                ) : (
                  <p className="text-charcoal/50 italic text-xs">
                    No admin remarks added yet. Click &quot;Change Status / Add Remark&quot; to log follow-up notes, discussion points, or dates.
                  </p>
                )}
              </div>
            </div>

            {/* Modal Footer (Sticky at bottom, always fully accessible) */}
            <div className="p-3 sm:p-4 bg-[#F9CFCA]/20 border-t border-[#F4ABA2]/40 flex flex-wrap items-center justify-between gap-2 flex-shrink-0">
              <a
                href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Namaskar ${selectedEnquiry.fullName || selectedEnquiry.fullname || ""}, this is from Hindavi Wedding Family regarding your wedding enquiry!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 font-semibold text-xs border border-green-300 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Client</span>
              </a>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const cur = selectedEnquiry;
                    handleOpenStatusModal(cur, cur.status);
                  }}
                  className="px-3 py-2 rounded-xl bg-amber-100/70 hover:bg-amber-100 border border-amber-300 text-amber-900 font-semibold text-xs transition-colors"
                >
                  Edit Status / Remark
                </button>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 sm:px-5 py-2 rounded-xl bg-white border border-[#F4ABA2] hover:border-[#801C30] hover:bg-[#FDF9F8] text-charcoal font-semibold text-xs transition-colors shadow-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Status & Optional Remark Modal */}
      {statusModalEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#F4ABA2] w-full max-w-md overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#F4ABA2]/40 bg-[#F9CFCA]/30 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-charcoal">
                  Update Enquiry Status
                </h3>
                <p className="text-xs text-charcoal/60 mt-0.5">
                  Client: <span className="font-bold text-charcoal">{statusModalEnquiry.fullName || statusModalEnquiry.fullname}</span>
                </p>
              </div>
              <button
                onClick={() => setStatusModalEnquiry(null)}
                className="p-1.5 rounded-lg bg-white text-charcoal/60 hover:text-charcoal border border-[#F4ABA2]/60 hover:border-[#801C30] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleConfirmStatusChange} className="p-5 space-y-4">
              {/* Status Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal/70 block">
                  Select Status:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { val: "new", label: "New Lead", bg: "hover:border-sky-400 checked:bg-sky-50" },
                    { val: "contacted", label: "Contacted", bg: "hover:border-amber-400" },
                    { val: "confirmed", label: "Confirmed (Booked)", bg: "hover:border-emerald-400" },
                    { val: "closed", label: "Closed", bg: "hover:border-gray-400" },
                  ].map((s) => (
                    <button
                      key={s.val}
                      type="button"
                      onClick={() => setTargetStatus(s.val as any)}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                        targetStatus === s.val
                          ? s.val === "new"
                            ? "bg-sky-50 text-sky-700 border-sky-400 ring-2 ring-sky-300"
                            : s.val === "contacted"
                            ? "bg-amber-50 text-amber-700 border-amber-400 ring-2 ring-amber-300"
                            : s.val === "confirmed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-400 ring-2 ring-emerald-300"
                            : "bg-gray-100 text-gray-700 border-gray-400 ring-2 ring-gray-300"
                          : "bg-[#FDF9F8] border-[#F4ABA2]/50 text-charcoal/70 hover:border-[#801C30]"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Admin Remark Textarea */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-charcoal/70 block">
                    Admin Remark / Note:
                  </label>
                  <span className="text-[10px] text-charcoal/50 font-normal">Optional</span>
                </div>
                <textarea
                  rows={3}
                  value={statusRemark}
                  onChange={(e) => setStatusRemark(e.target.value)}
                  placeholder="e.g. Called client on WhatsApp. Budget approved. Advance meeting scheduled for Saturday."
                  className="w-full p-3 bg-[#FDF9F8] border border-[#F4ABA2]/60 rounded-xl text-xs text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-[#801C30] transition-colors resize-none"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-2 flex justify-end gap-2 border-t border-[#F4ABA2]/30">
                <button
                  type="button"
                  onClick={() => setStatusModalEnquiry(null)}
                  className="px-4 py-2 rounded-xl bg-white border border-[#F4ABA2] text-charcoal text-xs font-semibold hover:bg-[#FDF9F8] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingStatus}
                  className="px-5 py-2 rounded-xl bg-[#801C30] hover:bg-[#6F1829] text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                >
                  {isUpdatingStatus ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Save Status &amp; Remark</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Fullscreen Video / Image Player Modal */}
      {previewMedia && (
        <div 
          onClick={() => setPreviewMedia(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#1F1B1A] border border-[#F4ABA2]/40 rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl relative"
          >
            {/* Modal Header */}
            <div className="p-4 bg-[#F9CFCA]/20 border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#F4ABA2] tracking-wider">
                  {previewMedia.category} • {previewMedia.type.toUpperCase()}
                </span>
                <h3 className="font-serif text-base sm:text-lg text-white font-semibold truncate max-w-md">
                  {previewMedia.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewMedia(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Player Container */}
            <div className="relative flex items-center justify-center bg-black flex-grow overflow-hidden min-h-[300px] max-h-[70vh]">
              {previewMedia.type === "reel" ? (
                <video
                  src={previewMedia.src}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[68vh] max-w-full object-contain mx-auto"
                />
              ) : (
                <div className="relative w-full h-[60vh]">
                  <Image
                    src={previewMedia.src}
                    alt={previewMedia.title}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>

            {/* Footer with links */}
            <div className="p-3.5 bg-black/40 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-white/60 truncate max-w-xs">{previewMedia.src}</span>
              <a
                href={previewMedia.src}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-[#801C30] hover:bg-[#6F1829] text-white font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Open in Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
