"use client";

import React, { useState } from "react";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { BUSINESS_CONFIG } from "@/config/business";
import { CheckCircle2, MessageSquare, Loader2 } from "lucide-react";

const TENTATIVE_MONTH_YEAR_OPTIONS = [
  { value: "November 2026 - December 2026", label: "November 2026 - December 2026" },
  { value: "January 2027 - March 2027", label: "January 2027 - March 2027" },
  { value: "April 2027 to September 2027", label: "April 2027 to September 2027" },
  { value: "October 2027 to March 2028", label: "October 2027 to March 2028" },
];

export function EnquiryForm({
  headingTitle = "Share Your Event Aspirations",
  headingSubtitle = "Fill out the details below. Our team receives your submission automatically.",
}: {
  headingTitle?: string;
  headingSubtitle?: string;
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    eventType: "",
    tentativeMonthYear: "",
    weddingDates: "",
    guestCount: "",
    estimatedBudget: "",
    location: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your contact phone number.";
    } else {
      const phoneClean = formData.phone.replace(/[\s-]/g, "");
      if (!/^\+?[0-9]{10,15}$/.test(phoneClean)) {
        newErrors.phone = "Please enter a valid phone number (10 to 15 digits).";
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.tentativeMonthYear) {
      newErrors.tentativeMonthYear = "Please select the tentative month & year of your wedding.";
    }

    if (!formData.estimatedBudget) {
      newErrors.estimatedBudget = "Please select an estimated budget range.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    // User's verified Web3Forms access key
    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      "c5458694-e524-44b8-ae53-4597b5512cf7";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `✨ New Wedding Enquiry: ${formData.fullName} (${formData.tentativeMonthYear})`,
          from_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          event_type: formData.eventType || "Wedding",
          tentative_month_year: formData.tentativeMonthYear,
          wedding_dates: formData.weddingDates || "Not finalised yet",
          guest_count: formData.guestCount || "Not specified",
          estimated_budget: formData.estimatedBudget,
          location: formData.location || "Pune / Maharashtra",
          message: formData.message || "Custom proposal requested",
          website: BUSINESS_CONFIG.displayName,
          owner_email: BUSINESS_CONFIG.contact.email,
        }),
      });

      const result = await response.json();

      if (response.status === 200 && result.success !== false) {
        setSubmitSuccess(true);
      } else {
        setSubmitError(
          result.message ||
            "Unable to deliver automatically. You can confirm directly via WhatsApp or Email."
        );
      }
    } catch {
      setSubmitError(
        "Network connection error. Please connect directly with our planning team."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp formatted text
  const whatsappRawText = `Hello Hindavi Weddings! I just submitted an enquiry on your website.\n*Name:* ${formData.fullName}\n*Phone:* ${formData.phone}\n*Tentative Timeline:* ${formData.tentativeMonthYear}\n*Finalised Dates:* ${formData.weddingDates || "Not finalised yet"}\n*Guests:* ${formData.guestCount || "Flexible"}\n*Budget:* ${formData.estimatedBudget}\n*Location:* ${formData.location || "Pune"}\n*Message:* ${formData.message || "Looking forward to speaking with you!"}`;
  const whatsappMessage = encodeURIComponent(whatsappRawText);

  return (
    <div className="bg-blush-50/70 p-6 sm:p-8 md:p-10 rounded-2xl border border-blush/60 shadow-xs">
      <div className="mb-6">
        <span className="text-xs uppercase tracking-[0.25em] text-coral font-sans font-bold">
          Custom Proposal Enquiry
        </span>
        <h3 className="font-sans text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-charcoal mt-1">
          {headingTitle}
        </h3>
        <p className="text-xs text-charcoal/70 font-sans mt-1">
          {headingSubtitle}
        </p>
      </div>

      {submitSuccess ? (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-coral/30 shadow-xs text-center space-y-4">
            <div className="w-12 h-12 bg-coral/10 rounded-full flex items-center justify-center mx-auto text-coral">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-sans text-xl font-extrabold uppercase tracking-tight text-charcoal">
                Enquiry Sent Successfully!
              </h4>
              <p className="font-sans text-xs sm:text-sm text-charcoal/80 max-w-md mx-auto leading-relaxed mt-1">
                Thank you, <strong className="text-charcoal font-bold">{formData.fullName}</strong>. Your custom wedding request has been delivered to our planning team.
              </p>
            </div>

            {/* WhatsApp Message Preview Box */}
            <div className="text-left bg-blush-50/80 border border-blush rounded-xl p-4 max-w-lg mx-auto">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-blush/50">
                <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal flex items-center space-x-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp Message Preview</span>
                </span>
                <span className="text-[10px] text-coral font-semibold">Ready to send</span>
              </div>
              <p className="font-sans text-xs text-charcoal leading-relaxed whitespace-pre-wrap">
                Hello Hindavi Weddings! I just submitted an enquiry on your website.{"\n"}
                <strong className="font-bold text-charcoal">Name:</strong> {formData.fullName}{"\n"}
                <strong className="font-bold text-charcoal">Phone:</strong> {formData.phone}{"\n"}
                <strong className="font-bold text-charcoal">Tentative Timeline:</strong> {formData.tentativeMonthYear}{"\n"}
                <strong className="font-bold text-charcoal">Dates of Wedding:</strong> {formData.weddingDates || "Not finalised yet"}{"\n"}
                <strong className="font-bold text-charcoal">Expected Guests:</strong> {formData.guestCount || "Flexible"}{"\n"}
                <strong className="font-bold text-charcoal">Estimated Budget:</strong> {formData.estimatedBudget}{"\n"}
                <strong className="font-bold text-charcoal">Location:</strong> {formData.location || "Pune"}
              </p>
            </div>

            <div className="pt-2 border-t border-blush/40 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/91${BUSINESS_CONFIG.contact.phone}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-sans text-xs uppercase tracking-wider font-bold py-3 px-6 rounded-full transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send via WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setSubmitSuccess(false);
                  setFormData({
                    fullName: "",
                    phone: "",
                    email: "",
                    eventType: "",
                    tentativeMonthYear: "",
                    weddingDates: "",
                    guestCount: "",
                    estimatedBudget: "",
                    location: "",
                    message: "",
                  });
                }}
                className="w-full sm:w-auto text-xs uppercase tracking-wider font-bold text-charcoal/70 hover:text-coral py-2.5 px-4 transition-colors"
              >
                Send Another Enquiry
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {/* Row 1: Full Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Full Name"
              name="fullName"
              placeholder="e.g. Rahul Sharma"
              required={true}
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
            />
            <FormField
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="e.g. 9876543210"
              required={true}
              helperText="10-15 digits, Indian or international"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />
          </div>

          {/* Row 2: Email & Expected Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Email Address"
              name="email"
              type="email"
              placeholder="name@example.com"
              required={true}
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <FormField
              label="Expected Number of Guests"
              name="guestCount"
              type="text"
              required={false}
              placeholder="e.g. 200 - 500 Guests"
              helperText="Tentative guest attendance"
              value={formData.guestCount}
              onChange={handleChange}
            />
          </div>

          {/* Row 3: Tentative Month & Year of Wedding * & Dates of the Wedding */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Tentative Month & Year of Wedding"
              name="tentativeMonthYear"
              type="select"
              placeholder="Select Tentative Month & Year"
              options={TENTATIVE_MONTH_YEAR_OPTIONS}
              required={true}
              value={formData.tentativeMonthYear}
              onChange={handleChange}
              error={errors.tentativeMonthYear}
            />
            <FormField
              label="Dates of the Wedding (If finalised)"
              name="weddingDates"
              type="text"
              placeholder="For example: 12–14 February 2027"
              helperText="Leave blank if not yet finalised"
              value={formData.weddingDates}
              onChange={handleChange}
            />
          </div>

          {/* Row 4: Estimated Budget * & Location / Event Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="What is the Estimated Budget for the Wedding?"
              name="estimatedBudget"
              type="text"
              placeholder="e.g. ₹25 Lakhs or Flexible"
              required={true}
              value={formData.estimatedBudget}
              onChange={handleChange}
              error={errors.estimatedBudget}
            />
            <FormField
              label="Event Location / City"
              name="location"
              placeholder="e.g. Pune, Mumbai, Karad, Mahabaleshwar"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          {/* Row 5: Message & Special Details */}
          <FormField
            label="Additional Notes / Envisioned Details"
            name="message"
            type="textarea"
            rows={2}
            placeholder="Tell us about specific ceremony traditions, decor style, or venue preferences..."
            value={formData.message}
            onChange={handleChange}
          />

          {submitError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 space-y-2">
              <p className="font-semibold">{submitError}</p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href={`https://wa.me/91${BUSINESS_CONFIG.contact.phone}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 bg-[#25D366] text-white px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider text-[11px]"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send via WhatsApp</span>
                </a>
              </div>
            </div>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              size="lg"
              variant="primary"
              className="w-full shadow-md hover:shadow-lg disabled:opacity-75 !py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="inline-flex items-center justify-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Enquiry...</span>
                </span>
              ) : (
                <span>Submit Wedding Proposal Enquiry</span>
              )}
            </Button>
            <p className="text-center text-[10px] text-charcoal/60 mt-2 font-sans">
              🔒 Information is sent directly to {BUSINESS_CONFIG.contact.email} for private consultation.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
