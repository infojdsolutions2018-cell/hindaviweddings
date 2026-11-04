"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Users, Calendar, Mail, Phone, Clock, CheckCircle2, 
  Search, Filter, RefreshCw, Eye, ArrowLeft, Shield, AlertCircle,
  Upload, Film, ImageIcon, Plus, Check, Loader2, Trash2, ExternalLink,
  Edit2, Save, X
} from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";

export type MilestoneCategory = "Engagement" | "Halad" | "Sangit" | "Vidhi" | "Marriage" | "Other";

interface EnquiryItem {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  eventDate?: string;
  eventType?: string;
  guestCount?: string;
  estimatedBudget?: string;
  message?: string;
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

// 4-5 Pre-set wedding captions according to milestone
const DEFAULT_CAPTIONS: Record<MilestoneCategory, string[]> = {
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
  Marriage: [
    "Sacred Royal Mandap Architecture & Muhurat",
    "Grand Royal Varmala Ceremony Stage Design",
    "Luminous Wedding Reception Banquet & Crystal Chandeliers",
    "Bespoke Maharashtrian Royal Wedding Celebration",
    "Dreamy Floral Mandap with Intricate Vedic Pillar Carvings",
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
  const [activeTab, setActiveTab] = useState<"enquiries" | "gallery" | "upload">("enquiries");
  
  // Enquiries state
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);

  // Gallery items state
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState<string>("all");

  // Edit Gallery Item State
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState<MilestoneCategory>("Other");
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // ImageKit Media Upload State
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [mediaTitle, setMediaTitle] = useState("");
  const [mediaCategory, setMediaCategory] = useState<MilestoneCategory>("Other");
  const [mediaType, setMediaType] = useState<"image" | "reel">("image");
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
      const res = await fetch(`/api/gallery?t=${Date.now()}`);
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

  useEffect(() => {
    fetchEnquiries();
    fetchGallery();
  }, []);

  // Update enquiry status
  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus as any } : item))
        );
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry((prev: any) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error("Failed to update status", err);
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

  // ImageKit File Upload Handler
  const handleUploadMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) {
      setUploadError("Please choose an image, reel, or video file to upload.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    // Pick effective title: if user didn't input title, pick a random smart default for the selected milestone
    let finalTitle = mediaTitle.trim();
    if (!finalTitle) {
      const presets = DEFAULT_CAPTIONS[mediaCategory] || DEFAULT_CAPTIONS["Other"];
      finalTitle = presets[Math.floor(Math.random() * presets.length)];
    }

    const effectiveCategory = mediaCategory || "Other";

    try {
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("title", finalTitle);
      formData.append("category", effectiveCategory);
      formData.append("type", mediaType);

      const res = await fetch("/api/gallery/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (json.success) {
        setUploadSuccess(`Uploaded successfully with caption: "${finalTitle}" under "${effectiveCategory}"!`);
        setUploadFile(null);
        setMediaTitle("");
        fetchGallery();
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
    const matchesSearch =
      item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone?.includes(searchTerm);
    const matchesStatus = statusFilter === "all" ? true : item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredGallery = galleryItems.filter((item) => {
    if (galleryFilter === "all") return true;
    return item.category === galleryFilter;
  });

  return (
    <div className="min-h-screen bg-[#FDF9F8] text-charcoal font-sans selection:bg-[#F9CFCA] selection:text-[#801C30]">
      {/* Top Header styled in signature Pink / Blush Palette */}
      <header className="sticky top-0 z-40 bg-[#F9CFCA]/95 backdrop-blur-md border-b border-[#F4ABA2]/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <Link
              href="/"
              className="w-10 h-10 rounded-xl bg-white border border-[#F4ABA2] flex items-center justify-center text-charcoal hover:text-[#801C30] hover:border-[#801C30] transition-all shadow-xs"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#F4ABA2] bg-white p-0.5 shadow-sm flex-shrink-0">
                <Image
                  src="/logo.jpg"
                  alt="Hindavi Weddings Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-lg sm:text-xl font-bold tracking-wide text-charcoal">
                    {BUSINESS_CONFIG.displayName}
                  </h1>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-white text-[#801C30] border border-[#F4ABA2] shadow-xs">
                    Admin
                  </span>
                </div>
                <p className="text-[11px] text-charcoal/70 font-medium">
                  Enquiries, Milestones &amp; ImageKit Media Management
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Nav Tabs Pill in Pink Theme */}
            <div className="inline-flex p-1 rounded-xl bg-white/90 border border-[#F4ABA2] text-xs font-semibold shadow-xs">
              <button
                onClick={() => setActiveTab("enquiries")}
                className={`px-3.5 sm:px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === "enquiries"
                    ? "bg-[#801C30] text-white shadow-sm font-bold"
                    : "text-charcoal/70 hover:text-charcoal"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Enquiries</span>
                <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === "enquiries" ? "bg-white/25 text-white" : "bg-[#F9CFCA] text-charcoal"}`}>
                  {enquiries.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("gallery")}
                className={`px-3.5 sm:px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === "gallery"
                    ? "bg-[#801C30] text-white shadow-sm font-bold"
                    : "text-charcoal/70 hover:text-charcoal"
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Gallery</span>
                <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === "gallery" ? "bg-white/25 text-white" : "bg-[#F9CFCA] text-charcoal"}`}>
                  {galleryItems.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("upload")}
                className={`px-3.5 sm:px-4 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === "upload"
                    ? "bg-[#801C30] text-white shadow-sm font-bold"
                    : "text-charcoal/70 hover:text-charcoal"
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Media</span>
              </button>
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => {
                fetchEnquiries();
                fetchGallery();
              }}
              className="p-2.5 rounded-xl bg-white border border-[#F4ABA2] hover:border-[#801C30] text-charcoal hover:text-[#801C30] transition-all shadow-xs"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loadingEnquiries || loadingGallery ? "animate-spin text-[#801C30]" : ""}`} />
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
            {/* KPI Stat Cards in Warm Signature Palette */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#F4ABA2]/50 shadow-xs space-y-1">
                <span className="text-[11px] uppercase font-bold tracking-wider text-charcoal/60">
                  Total Leads
                </span>
                <div className="font-serif text-3xl font-bold text-charcoal">{enquiries.length}</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-sky-300 shadow-xs space-y-1">
                <span className="text-[11px] uppercase font-bold tracking-wider text-sky-700">
                  New Uncontacted
                </span>
                <div className="font-serif text-3xl font-bold text-sky-700">
                  {enquiries.filter((e) => e.status === "new").length}
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-amber-300 shadow-xs space-y-1">
                <span className="text-[11px] uppercase font-bold tracking-wider text-amber-700">
                  In Discussion
                </span>
                <div className="font-serif text-3xl font-bold text-amber-700">
                  {enquiries.filter((e) => e.status === "contacted").length}
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-emerald-300 shadow-xs space-y-1">
                <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-700">
                  Booked &amp; Confirmed
                </span>
                <div className="font-serif text-3xl font-bold text-emerald-700">
                  {enquiries.filter((e) => e.status === "confirmed").length}
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-[#F4ABA2]/60 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search name, phone, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#FDF9F8] border border-[#F4ABA2]/60 rounded-xl text-xs text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-[#801C30] transition-colors"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-charcoal/40" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-[#FDF9F8] border border-[#F4ABA2]/60 rounded-xl text-xs text-charcoal focus:outline-none focus:border-[#801C30] transition-colors"
                >
                  <option value="all">All Statuses ({enquiries.length})</option>
                  <option value="new">New ({enquiries.filter((e) => e.status === "new").length})</option>
                  <option value="contacted">Contacted ({enquiries.filter((e) => e.status === "contacted").length})</option>
                  <option value="confirmed">Confirmed ({enquiries.filter((e) => e.status === "confirmed").length})</option>
                  <option value="closed">Closed ({enquiries.filter((e) => e.status === "closed").length})</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-[#F4ABA2]/60 overflow-hidden shadow-xs">
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
                            <div>{enquiry.fullName}</div>
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
                              {enquiry.eventDate || "Date TBD"}
                            </div>
                            <div className="text-charcoal/60 text-[11px]">
                              {enquiry.eventType || "Full Wedding"}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-emerald-700 font-semibold">
                              {enquiry.estimatedBudget || "Not specified"}
                            </div>
                            <div className="text-charcoal/60 text-[11px]">
                              {enquiry.guestCount ? `${enquiry.guestCount} guests` : "Guests TBD"}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={enquiry.status}
                              onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
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
          </div>
        )}

        {/* ========================================================
            TAB 2: GALLERY MEDIA INVENTORY (WITH EDIT CATEGORY & DESCRIPTION)
            ======================================================== */}
        {activeTab === "gallery" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Filter Pills in Pink Theme */}
            <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-4 rounded-2xl border border-[#F4ABA2]/60 shadow-xs">
              <div className="flex items-center gap-1.5 flex-wrap">
                {["all", "Engagement", "Halad", "Sangit", "Vidhi", "Marriage", "Other"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setGalleryFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                      galleryFilter === cat
                        ? "bg-[#801C30] text-white font-bold shadow-xs"
                        : "bg-[#FDF9F8] text-charcoal/70 hover:text-charcoal border border-[#F4ABA2]/50"
                    }`}
                  >
                    {cat === "all" ? `All Media (${galleryItems.length})` : cat}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setActiveTab("upload")}
                className="px-3.5 py-1.5 rounded-xl bg-[#801C30] hover:bg-[#6F1829] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Media</span>
              </button>
            </div>

            {/* Media Grid with Edit Option */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-white rounded-2xl border border-[#F4ABA2]/60 overflow-hidden shadow-xs flex flex-col"
                >
                  <div className="relative aspect-square w-full bg-[#F9CFCA]/30 overflow-hidden">
                    {item.type === "reel" ? (
                      <video
                        src={item.src}
                        className="w-full h-full object-cover"
                        playsInline
                        muted
                      />
                    ) : (
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        sizes="250px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}

                    <div className="absolute top-2 left-2 bg-white/95 text-[#801C30] text-[9px] font-sans font-bold px-2 py-0.5 rounded-full uppercase border border-[#F4ABA2]/80 shadow-xs">
                      {item.category}
                    </div>

                    {item.type === "reel" && (
                      <div className="absolute top-2 right-2 bg-[#801C30] text-white p-1 rounded-md shadow-xs">
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
                  <label className="block font-bold text-charcoal mb-2">Media Format</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setMediaType("image");
                        setUploadFile(null);
                      }}
                      className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                        mediaType === "image"
                          ? "bg-[#F9CFCA]/40 border-[#801C30] text-[#801C30] font-bold shadow-xs"
                          : "bg-[#FDF9F8] border-[#F4ABA2]/50 text-charcoal/70"
                      }`}
                    >
                      <ImageIcon className="w-5 h-5 text-[#801C30]" />
                      <div>
                        <div className="font-bold">Photograph</div>
                        <div className="text-[10px] text-charcoal/50">JPG, PNG, WebP</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMediaType("reel");
                        setUploadFile(null);
                      }}
                      className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                        mediaType === "reel"
                          ? "bg-[#F9CFCA]/40 border-[#801C30] text-[#801C30] font-bold shadow-xs"
                          : "bg-[#FDF9F8] border-[#F4ABA2]/50 text-charcoal/70"
                      }`}
                    >
                      <Film className="w-5 h-5 text-[#801C30]" />
                      <div>
                        <div className="font-bold">Reel / Video</div>
                        <div className="text-[10px] text-charcoal/50">MP4, WebM, MOV</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* File Dropzone */}
                <div>
                  <label className="block font-bold text-charcoal mb-2">Select File from Computer</label>
                  <label 
                    htmlFor="adminFileInput"
                    className="flex flex-col items-center justify-center border-2 border-dashed border-[#F4ABA2] hover:border-[#801C30] rounded-2xl p-6 sm:p-8 cursor-pointer bg-[#FDF9F8] hover:bg-white transition-all group"
                  >
                    <Upload className="w-8 h-8 text-[#801C30] mb-2 group-hover:scale-110 transition-transform" />
                    <span className="font-bold text-charcoal text-sm text-center">
                      {uploadFile ? uploadFile.name : "Click here to choose file from computer"}
                    </span>
                    <span className="text-[11px] text-charcoal/50 mt-1">
                      {uploadFile
                        ? `${(uploadFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to upload`
                        : mediaType === "image"
                        ? "Supports JPG, PNG, WEBP images"
                        : "Supports MP4, WEBM vertical reels"}
                    </span>
                    <input
                      id="adminFileInput"
                      type="file"
                      accept={mediaType === "image" ? "image/*" : "video/*"}
                      className="sr-only"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const f = e.target.files[0];
                          setUploadFile(f);
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
                    className="w-full p-3 bg-[#FDF9F8] border border-[#F4ABA2]/60 rounded-xl text-charcoal font-medium focus:outline-none focus:border-[#801C30]"
                  >
                    <option value="Other">Other / General Highlights (Default if not selected)</option>
                    <option value="Engagement">1. Engagement (Ring Ceremony)</option>
                    <option value="Halad">2. Halad (Haldi Courtyard)</option>
                    <option value="Sangit">3. Sangit (Sangeet &amp; Concert Stage)</option>
                    <option value="Vidhi">4. Vidhi (Vedic Rituals &amp; Customs)</option>
                    <option value="Marriage">5. Marriage (Mandap, Varmala &amp; Reception)</option>
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
                  disabled={isUploading || !uploadFile}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#801C30] to-[#A82835] hover:from-[#6F1829] hover:to-[#801C30] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#801C30]/20 transition-all mt-4"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading to ImageKit CDN &amp; Publishing...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Upload &amp; Save Media</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#F4ABA2] w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-[#F4ABA2]/40 bg-[#F9CFCA]/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-[#801C30]" />
                <h3 className="font-serif text-xl font-bold text-charcoal">
                  Edit Media Information
                </h3>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-lg bg-white text-charcoal/60 hover:text-charcoal border border-[#F4ABA2]/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMediaEdit} className="p-6 space-y-4 text-xs font-sans">
              {/* Preview Thumbnail */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FDF9F8] border border-[#F4ABA2]/40">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-black/10 flex-shrink-0">
                  {editingItem.type === "reel" ? (
                    <video src={editingItem.src} className="w-full h-full object-cover" muted />
                  ) : (
                    <Image src={editingItem.src} alt={editingItem.title} fill className="object-cover" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#801C30]">
                    {editingItem.type.toUpperCase()}
                  </span>
                  <div className="font-medium text-charcoal/80 text-[11px] truncate max-w-[220px]">
                    {editingItem.title}
                  </div>
                </div>
              </div>

              {/* Edit Category */}
              <div>
                <label className="block font-bold text-charcoal mb-1.5">
                  Change Ritual / Category
                </label>
                <select
                  value={editCategory}
                  onChange={(e: any) => setEditCategory(e.target.value)}
                  className="w-full p-2.5 bg-[#FDF9F8] border border-[#F4ABA2]/60 rounded-xl text-charcoal font-medium focus:outline-none focus:border-[#801C30]"
                >
                  <option value="Engagement">1. Engagement (Ring Ceremony)</option>
                  <option value="Halad">2. Halad (Haldi Courtyard)</option>
                  <option value="Sangit">3. Sangit (Sangeet &amp; Concert Stage)</option>
                  <option value="Vidhi">4. Vidhi (Vedic Rituals &amp; Customs)</option>
                  <option value="Marriage">5. Marriage (Mandap, Varmala &amp; Reception)</option>
                  <option value="Other">Other / General Highlights</option>
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

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl bg-white border border-[#F4ABA2] text-charcoal font-semibold hover:bg-[#FDF9F8]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="px-4 py-2 rounded-xl bg-[#801C30] hover:bg-[#6F1829] text-white font-semibold flex items-center gap-1.5 shadow-sm"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#F4ABA2] w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-[#F4ABA2]/40 bg-[#F9CFCA]/30 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-charcoal">
                  {selectedEnquiry.fullName}
                </h3>
                <p className="text-xs text-charcoal/60">
                  Received on {new Date(selectedEnquiry.created_at).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 rounded-lg bg-white text-charcoal/60 hover:text-charcoal border border-[#F4ABA2]/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-[#FDF9F8] border border-[#F4ABA2]/40">
                  <span className="text-[10px] text-charcoal/50 uppercase font-bold">Phone</span>
                  <div className="font-semibold text-charcoal mt-0.5">{selectedEnquiry.phone}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#FDF9F8] border border-[#F4ABA2]/40">
                  <span className="text-[10px] text-charcoal/50 uppercase font-bold">Email</span>
                  <div className="font-semibold text-charcoal mt-0.5 truncate">{selectedEnquiry.email}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#FDF9F8] border border-[#F4ABA2]/40">
                  <span className="text-[10px] text-charcoal/50 uppercase font-bold">Event Date</span>
                  <div className="font-semibold text-charcoal mt-0.5">{selectedEnquiry.eventDate || "TBD"}</div>
                </div>
                <div className="p-3 rounded-xl bg-[#FDF9F8] border border-[#F4ABA2]/40">
                  <span className="text-[10px] text-charcoal/50 uppercase font-bold">Budget</span>
                  <div className="font-semibold text-emerald-700 mt-0.5">{selectedEnquiry.estimatedBudget || "TBD"}</div>
                </div>
              </div>

              {selectedEnquiry.message && (
                <div className="p-4 rounded-xl bg-[#FDF9F8] border border-[#F4ABA2]/40">
                  <span className="text-[10px] text-charcoal/50 uppercase font-bold">Client Notes &amp; Message</span>
                  <p className="mt-1 text-charcoal/80 leading-relaxed whitespace-pre-wrap">{selectedEnquiry.message}</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-[#F9CFCA]/20 border-t border-[#F4ABA2]/40 flex justify-end gap-2">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2 rounded-xl bg-white border border-[#F4ABA2] hover:bg-[#FDF9F8] text-charcoal font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
