import React from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "date" | "number" | "select" | "textarea";
  placeholder?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  options?: { value: string; label: string }[];
  rows?: number;
  value?: string | number;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  disabled?: boolean;
  className?: string;
}

export function FormField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  error,
  helperText,
  options = [],
  rows = 4,
  value,
  onChange,
  disabled = false,
  className = "",
}: FormFieldProps) {
  const inputBaseStyles =
    "w-full px-4 py-3 rounded-sm border font-sans text-sm bg-white text-charcoal transition-colors focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:bg-ivory-100 disabled:cursor-not-allowed";

  const stateStyles = error
    ? "border-red-500 focus:border-red-500"
    : "border-ivory-200 focus:border-gold hover:border-gold/60";

  return (
    <div className={`space-y-1.5 ${className}`}>
      <label
        htmlFor={name}
        className="block font-sans text-xs uppercase tracking-wider font-semibold text-charcoal"
      >
        {label}
        {required && <span className="text-burgundy ml-1">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`${inputBaseStyles} ${stateStyles}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      ) : type === "select" ? (
        <select
          id={name}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`${inputBaseStyles} ${stateStyles}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`${inputBaseStyles} ${stateStyles}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      )}

      {error && (
        <p
          id={`${name}-error`}
          className="font-sans text-xs text-red-600 flex items-center space-x-1 mt-1"
          role="alert"
        >
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </p>
      )}

      {!error && helperText && (
        <p className="font-sans text-xs text-charcoal-muted mt-1">{helperText}</p>
      )}
    </div>
  );
}

interface FormStateBannerProps {
  type: "success" | "error" | "loading";
  title: string;
  message?: string;
  referenceCode?: string;
  className?: string;
}

export function FormStateBanner({
  type,
  title,
  message,
  referenceCode,
  className = "",
}: FormStateBannerProps) {
  if (type === "loading") {
    return (
      <div
        className={`p-6 rounded-sm bg-ivory-100 border border-gold/40 text-center space-y-3 ${className}`}
        aria-live="polite"
      >
        <Loader2 className="w-8 h-8 text-burgundy animate-spin mx-auto" />
        <h4 className="font-serif text-lg text-charcoal-dark">{title}</h4>
        {message && (
          <p className="font-sans text-xs text-charcoal-muted">{message}</p>
        )}
      </div>
    );
  }

  if (type === "success") {
    return (
      <div
        className={`p-6 rounded-sm bg-white border border-green-300 text-center space-y-3 shadow-sm ${className}`}
        role="status"
      >
        <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto" />
        <h4 className="font-serif text-2xl text-charcoal-dark">{title}</h4>
        {message && (
          <p className="font-sans text-sm text-charcoal-muted max-w-md mx-auto">
            {message}
          </p>
        )}
        {referenceCode && (
          <div className="pt-2">
            <span className="font-sans text-xs uppercase tracking-wider text-charcoal-muted block">
              Reference Code
            </span>
            <code className="font-mono text-base font-bold text-burgundy bg-ivory-100 px-3 py-1 rounded inline-block mt-1">
              {referenceCode}
            </code>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`p-6 rounded-sm bg-white border border-red-300 text-center space-y-3 shadow-sm ${className}`}
      role="alert"
    >
      <AlertCircle className="w-10 h-10 text-red-600 mx-auto" />
      <h4 className="font-serif text-2xl text-charcoal-dark">{title}</h4>
      {message && (
        <p className="font-sans text-sm text-charcoal-muted max-w-md mx-auto">
          {message}
        </p>
      )}
    </div>
  );
}
