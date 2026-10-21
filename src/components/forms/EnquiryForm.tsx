"use client";

import React, { useState } from "react";
import { FormField, FormStateBanner } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { BUSINESS_CONFIG } from "@/config/business";
import { Mail } from "lucide-react";

const EVENT_TYPE_OPTIONS = [
  { value: "wedding", label: "Wedding Ceremony & Reception" },
  { value: "sangeet-haldi", label: "Pre-Wedding (Sangeet / Haldi / Mehendi)" },
  { value: "reception", label: "Wedding Reception Only" },
  { value: "corporate-social", label: "Social / Corporate Event" },
  { value: "other", label: "Other Celebration" },
];

export function EnquiryForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    eventType: "",
    eventDate: "",
    location: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validatedPreview, setValidatedPreview] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your contact phone number.";
    } else {
      // Basic phone check: 10 to 15 digits allowing leading plus
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

    if (!formData.eventType) {
      newErrors.eventType = "Please select the type of event you are planning.";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setValidatedPreview(true);
    }
  };

  return (
    <div className="bg-ivory-50 p-8 sm:p-10 rounded-sm border border-ivory-200 shadow-xs">
      <div className="mb-6">
        <span className="text-xs uppercase tracking-widest text-gold-dark font-sans font-semibold">
          Enquiry Form
        </span>
        <h3 className="font-serif text-2xl text-charcoal-dark mt-1">
          Share Your Event Aspirations
        </h3>
      </div>

      {validatedPreview ? (
        <div className="space-y-6">
          <FormStateBanner
            type="success"
            title="Enquiry Summary Ready"
            message="Your enquiry details have been validated. Please review your details below and send directly to our team via email."
          />

          <div className="p-5 rounded-sm bg-white border border-ivory-200 text-sm font-sans space-y-3">
            <h4 className="font-serif text-lg text-charcoal-dark font-medium border-b border-ivory-200 pb-2">
              Enquiry Summary Validated:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-charcoal-muted">Full Name:</span>{" "}
                <span className="font-semibold text-charcoal">{formData.fullName}</span>
              </div>
              <div>
                <span className="text-charcoal-muted">Phone:</span>{" "}
                <span className="font-semibold text-charcoal">{formData.phone}</span>
              </div>
              <div>
                <span className="text-charcoal-muted">Email:</span>{" "}
                <span className="font-semibold text-charcoal">{formData.email}</span>
              </div>
              <div>
                <span className="text-charcoal-muted">Event Type:</span>{" "}
                <span className="font-semibold text-charcoal">{formData.eventType}</span>
              </div>
              <div>
                <span className="text-charcoal-muted">Tentative Date:</span>{" "}
                <span className="font-semibold text-charcoal">
                  {formData.eventDate || "Flexible / Unspecified"}
                </span>
              </div>
              <div>
                <span className="text-charcoal-muted">Location:</span>{" "}
                <span className="font-semibold text-charcoal">
                  {formData.location || "Unspecified"}
                </span>
              </div>
            </div>
            {formData.message && (
              <div className="pt-2 border-t border-ivory-100 text-xs">
                <span className="text-charcoal-muted block mb-1">Message:</span>
                <p className="italic text-charcoal-light bg-ivory-50 p-2 rounded">
                  {formData.message}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setValidatedPreview(false)}
              className="w-full sm:w-auto"
            >
              Edit Details
            </Button>
            <a
              href={`mailto:${BUSINESS_CONFIG.contact.email}?subject=Wedding Enquiry from ${encodeURIComponent(formData.fullName)}&body=Name: ${encodeURIComponent(formData.fullName)}%0D%0APhone: ${encodeURIComponent(formData.phone)}%0D%0AEvent: ${encodeURIComponent(formData.eventType)}%0D%0ADate: ${encodeURIComponent(formData.eventDate || "Flexible")}%0D%0ALocation: ${encodeURIComponent(formData.location || "Pune")}%0D%0AMessage: ${encodeURIComponent(formData.message)}`}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-coral hover:bg-coral-dark text-white font-sans text-xs uppercase tracking-wider font-bold py-3.5 px-7 rounded-full transition-all shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>Send via Email Directly</span>
            </a>
          </div>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
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
              label="Event Type"
              name="eventType"
              type="select"
              placeholder="Select event type"
              options={EVENT_TYPE_OPTIONS}
              required={true}
              value={formData.eventType}
              onChange={handleChange}
              error={errors.eventType}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Tentative Event Date"
              name="eventDate"
              type="date"
              helperText="Leave blank if date is flexible"
              value={formData.eventDate}
              onChange={handleChange}
            />
            <FormField
              label="Event Location / City"
              name="location"
              placeholder="e.g. Pune, Mumbai, Karad, Mahabaleshwar"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <FormField
            label="Message & Envisioned Details"
            name="message"
            type="textarea"
            rows={3}
            placeholder="Tell us about expected guest count, specific ceremony traditions, or decor preferences..."
            value={formData.message}
            onChange={handleChange}
          />

          <div className="pt-2">
            <Button type="submit" size="lg" variant="primary" className="w-full">
              Validate Enquiry Details
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
