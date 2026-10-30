import React, { useEffect, useState } from "react";
// import emailjs from "@emailjs/browser";
import "./ContactModal.css";

const initialForm = {
  name: "",
  mobile: "",
  email: "",
  description: "",
  propertySize: "",
  startTime: "",
};

const propertySizes = [
  "2 BHK",
  "3 BHK",
  "4 BHK",
  "5+ BHK/Villa/Penthouse",
  "Other",
];

const startOptions = [
  "Immediately",
  "Within 15 days",
  "Within 1 month",
  "Within 2–3 months",
  "More than 3 months",
  "Just exploring",
];

export default function ContactModal({ isOpen, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape" && !loading) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, loading, onClose]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    if (loading) return;

    onClose();
    setMessage("");
    setSuccess(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setSuccess(false);

    // try {
    //   await emailjs.send(
    //     import.meta.env.VITE_EMAILJS_SERVICE_ID,
    //     import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    //     {
    //       name: form.name.trim(),
    //       mobile: form.mobile.trim(),
    //       email: form.email.trim(),
    //       property_size: form.propertySize,
    //       start_time: form.startTime,
    //       description: form.description.trim(),
    //     },
    //     {
    //       publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    //     },
    //   );

    //   setSuccess(true);
    //   setMessage("Thank you! Your enquiry has been sent successfully.");
    //   setForm(initialForm);
    // } catch (error) {
    //   console.error("Contact form error:", error);

    //   setMessage("Unable to send your enquiry. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div
      className="contact-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <section
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <button
          type="button"
          className="contact-modal-close"
          onClick={handleClose}
          disabled={loading}
          aria-label="Close contact form"
        >
          ×
        </button>

        <div className="contact-modal-heading">
          <span>LET'S CREATE YOUR SPACE</span>

          <h2 id="contact-modal-title">Tell us about your project</h2>

          <p>
            Share your requirements and our interior design team will get in
            touch with you.
          </p>
        </div>

        {message && (
          <div
            className={`contact-form-message ${
              success ? "is-success" : "is-error"
            }`}
            role="status"
          >
            {message}
          </div>
        )}

        {!success && (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-grid">
              <div className="contact-field">
                <label htmlFor="contact-name">Name *</label>

                <input
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  autoComplete="name"
                  maxLength={120}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-mobile">Mobile number *</label>

                <input
                  id="contact-mobile"
                  name="mobile"
                  type="tel"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  autoComplete="tel"
                  maxLength={20}
                  pattern="[+()0-9 .-]{7,20}"
                  required
                />
              </div>

              <div className="contact-field contact-field-full">
                <label htmlFor="contact-email">Email address *</label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  maxLength={190}
                  required
                />
              </div>

              <fieldset className="contact-field contact-field-full contact-property">
                <legend>What is the size of the property? *</legend>

                <div className="contact-radio-options">
                  {propertySizes.map((size) => (
                    <label className="contact-radio-option" key={size}>
                      <input
                        type="radio"
                        name="propertySize"
                        value={size}
                        checked={form.propertySize === size}
                        onChange={handleChange}
                        required
                      />

                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="contact-field contact-field-full">
                <label htmlFor="contact-start">
                  When do you want this work to start? *
                </label>

                <select
                  id="contact-start"
                  name="startTime"
                  value={form.startTime}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select your preferred timeline
                  </option>

                  {startOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="contact-field contact-field-full">
                <label htmlFor="contact-description">
                  Project description *
                </label>

                <textarea
                  id="contact-description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Tell us about your location, design preferences and requirements..."
                  rows={4}
                  maxLength={3000}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="contact-submit-btn"
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit Enquiry"}

              {!loading && <span aria-hidden="true">↗</span>}
            </button>

            <p className="contact-form-note">
              Your details will be used to respond to your enquiry.
            </p>
          </form>
        )}

        {success && (
          <button
            type="button"
            className="contact-submit-btn"
            onClick={handleClose}
          >
            Close
          </button>
        )}
      </section>
    </div>
  );
}
