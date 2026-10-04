import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const CONTACT_PHONE = import.meta.env.VITE_CONTACT_PHONE as string | undefined;

const sections = [
  { label: "Home", href: "#home" },
  { label: "Rooms", href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const footerLinkClass =
  "text-sm text-text-secondary transition-colors duration-200 hover:text-primary";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div>
            <a
              href="#home"
              aria-label="HMG Guest House home"
              className="inline-block"
            >
              <h2 className="font-serif text-2xl font-semibold text-text">
                HMG
              </h2>

              <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-primary">
                Guest House
              </p>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-6 text-text-secondary">
              A comfortable and welcoming stay where traditional hospitality
              meets modern comfort.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              {sections.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className={footerLinkClass}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text">
              Contact
            </h3>

            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-primary"
                  aria-hidden="true"
                />

                <span className="text-sm leading-5 text-text-secondary">
                  Bhaktapur, Nepal
                </span>
              </li>

              {CONTACT_PHONE && (
                <li className="flex items-center gap-3">
                  <Phone
                    size={18}
                    className="shrink-0 text-primary"
                    aria-hidden="true"
                  />

                  <a href={`tel:${CONTACT_PHONE}`} className={footerLinkClass}>
                    Contact us
                  </a>
                </li>
              )}

              <li className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="shrink-0 text-primary"
                  aria-hidden="true"
                />

                <a href="mailto:info@hmg.com" className={footerLinkClass}>
                  info@hmg.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text">
              Follow Us
            </h3>

            <p className="mt-5 max-w-xs text-sm leading-6 text-text-secondary">
              Stay connected with us and discover more about your next stay.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-bg text-text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                <FaFacebookF size={17} aria-hidden="true" />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-bg text-text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                <FaInstagram size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col gap-3 border-t border-border py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-text-secondary">
            © {currentYear} HMG Guest House. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a href="#privacy" className={footerLinkClass}>
              Privacy Policy
            </a>

            <a href="#terms" className={footerLinkClass}>
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
