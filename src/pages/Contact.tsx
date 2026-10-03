// src/pages/Contact.tsx

import { useState, type ChangeEvent, type FormEvent } from "react";

import { CheckCircle2, Mail, MapPin, Navigation, Phone } from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

import { useToast } from "../hooks/useToast";
import { buildInquiryUrl } from "../utils/whatsApp";

const CONTACT_CARDS = [
  {
    icon: MapPin,
    title: "Address",
    lines: ["Khauma-13, Bhaktapur Durbar Square", "Bhaktapur, Nepal 44800"],
    href: "https://www.google.com/maps/search/?api=1&query=Khwapa+Chee+Guest+House+Bhaktapur+Nepal",
    target: "_blank",
  },
  {
    icon: Phone,
    title: "Phone & WhatsApp",
    lines: ["+977 1 6616325", "Available daily"],
    href: `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`,
    target: "_blank",
  },
  {
    icon: Mail,
    title: "Email Inquiry",
    lines: ["stay@khwapachhen.com", "info@khwapachhen.com"],
    href: "mailto:stay@khwapachhen.com,info@khwapachhen.com",
    target: "_self",
  },
];

const TOPICS = ["General Inquiry", "Room Reservation", "Problem / Complaint"];

const fieldClass =
  "w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text transition-all duration-200 placeholder:text-text-muted/60 focus:border-primary focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/10";

const labelClass =
  "mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted";

const initialForm = {
  name: "",
  email: "",
  topic: TOPICS[0],
  message: "",
};

export default function Contact() {
  const { showToast } = useToast();

  const [form, setForm] = useState(initialForm);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = buildInquiryUrl({
      name: form.name.trim(),
      email: form.email.trim(),
      topic: form.topic,
      message: form.message.trim(),
    });

    window.open(url, "_blank", "noopener,noreferrer");

    setIsSent(true);
    setForm(initialForm);

    showToast("Opening WhatsApp. Press send to reach our concierge!");
  };

  return (
    <section
      id="contact"
      className="scroll-mt-(--root-header-height) bg-bg py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-2xl">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Get In Touch
          </span>

          <h2 className="font-heading text-3xl font-bold leading-tight text-text sm:text-4xl md:text-5xl">
            We Are Here
            <br />
            <span className="text-primary">For You</span>
          </h2>

          <div className="my-5 flex items-center gap-2">
            <span className="h-px w-10 bg-gold/60 sm:w-14" />
            <span className="size-1.5 rotate-45 bg-gold" />
            <span className="h-px w-10 bg-gold/60 sm:w-14" />
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-text-muted sm:text-base">
            Whether you are planning a peaceful stay, celebrating a special
            occasion, or simply have a question, our team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          {/* LEFT — CONTACT INFORMATION */}
          <div className="space-y-6">
            {/* Contact cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {CONTACT_CARDS.map(
                ({ icon: Icon, title, lines, href, target }) => (
                  <a
                    key={title}
                    href={href}
                    target={target}
                    rel={
                      target === "_blank" ? "noopener noreferrer" : undefined
                    }
                    className="group block rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                        <Icon className="size-5" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-heading text-sm font-semibold text-text">
                          {title}
                        </h3>

                        <p className="mt-1.5 text-xs leading-relaxed text-text-muted">
                          {lines.map((line, index) => (
                            <span key={line}>
                              {line}
                              {index < lines.length - 1 && <br />}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  </a>
                ),
              )}
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-md">
              <div className="relative h-72 sm:h-80">
                <iframe
                  title="Khwapa Chhen Guest House location"
                  src="https://www.google.com/maps?q=27.672106,85.427321&z=17&output=embed"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-bg-dark/80 via-bg-dark/10 to-transparent" />

                {/* Map information */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
                      Find Us
                    </p>

                    <p className="mt-1 font-heading text-sm font-semibold text-white">
                      Khwapa Chhen Guest House
                    </p>

                    <p className="mt-0.5 text-xs text-white/75">
                      Khauma-13, Bhaktapur Durbar Square
                    </p>
                  </div>

                  <a
                    href="https://www.google.com/maps?q=27.672106,85.427321"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex shrink-0 items-center gap-1.5 rounded-xl bg-white/95 px-3.5 py-2.5 text-xs font-semibold text-text shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg"
                  >
                    <Navigation className="size-3.5 text-primary" />
                    Open Map
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — CONTACT FORM */}
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-lg sm:p-8 lg:p-10">
            {isSent ? (
              <div className="flex min-h-120 flex-col items-center justify-center py-12 text-center">
                <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-success/10 text-success">
                  <CheckCircle2 className="size-8" />
                </div>

                <h3 className="mb-2 font-heading text-2xl font-bold text-success">
                  Message Ready
                </h3>

                <p className="mx-auto mb-6 max-w-sm text-sm leading-relaxed text-text-muted">
                  Your message is ready in WhatsApp. Press send there and our
                  concierge will get back to you shortly.
                </p>

                <button
                  type="button"
                  onClick={() => setIsSent(false)}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-primary underline-offset-4 transition-colors hover:bg-primary/5 hover:text-primary-hover hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Form heading */}
                <div className="border-b border-border pb-6">
                  <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                    Concierge
                  </span>

                  <h3 className="font-heading text-2xl font-bold text-text sm:text-3xl">
                    Send a Message
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    Tell us how we can make your stay special.
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className={labelClass}>
                    Full Name
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="e.g. Ram Shrestha"
                    value={form.name}
                    onChange={handleChange}
                    className={fieldClass}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className={labelClass}>
                    Email Address
                    <span className="ml-1 normal-case tracking-normal text-text-muted">
                      (optional)
                    </span>
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="ram@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className={fieldClass}
                  />
                </div>

                {/* Topic */}
                <div>
                  <label htmlFor="contact-topic" className={labelClass}>
                    Subject / Topic
                  </label>

                  <select
                    id="contact-topic"
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                    className={fieldClass}
                  >
                    {TOPICS.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className={labelClass}>
                    Your Message
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    maxLength={1000}
                    placeholder="Tell us about your trip plans or questions..."
                    value={form.message}
                    onChange={handleChange}
                    className={`${fieldClass} resize-none`}
                  />
                </div>

                {/* WhatsApp button */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-hover hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-[0.98]"
                >
                  <FaWhatsapp className="size-5" />
                  <span>Send via WhatsApp</span>
                </button>

                <p className="text-center text-[10px] text-text-muted">
                  Your message will open directly in WhatsApp.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
