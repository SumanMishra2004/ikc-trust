import { MapPin, Phone, Mail } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact | IKC Trust",
  description:
    "Get in touch with IKC Trust for partnerships, volunteering, CSR programmes, or general enquiries.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-ivory">

      {/* ── Hero ── */}
      <div className="w-full bg-forest-dark">
        <div className="w-full px-6 md:px-12 lg:px-20 pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-terracotta flex-shrink-0" />
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-terracotta font-semibold">
              IKC Trust · Connect
            </span>
          </div>
          <h1 className="font-serif font-normal leading-[1.05] tracking-tight">
            <span className="block text-[42px] sm:text-[52px] md:text-[62px] lg:text-[70px] text-warm-white">
              Get in Touch
            </span>
          </h1>
          <div className="w-20 h-[3px] bg-terracotta mt-7" />
          <p className="mt-8 font-sans text-base md:text-[17px] text-warm-white/70 leading-[1.75] max-w-xl">
            Reach us for partnerships, volunteering, CSR programmes, or general enquiries.
          </p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* ── Left: Contact Details ── */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-terracotta font-semibold">
                Contact Information
              </span>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-forest flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal font-semibold mb-1">
                    Headquarters
                  </p>
                  <p className="font-sans text-sm text-charcoal-muted leading-relaxed">
                    5 Elgin Road, Heritage Enclave<br />
                    Kolkata, West Bengal 700020<br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={16} className="text-forest flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal font-semibold mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:+913324567890"
                    className="font-sans text-sm text-charcoal-muted hover:text-forest transition-colors"
                  >
                    +91 33 2456 7890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={16} className="text-forest flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal font-semibold mb-1">
                    General Enquiries
                  </p>
                  <a
                    href="mailto:contact@ikc.org.in"
                    className="font-sans text-sm text-forest underline underline-offset-2 decoration-forest/40 hover:decoration-forest transition-all"
                  >
                    contact@ikc.org.in
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-sand-dark space-y-4">
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-charcoal font-semibold">
                Quick Links
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta flex-shrink-0" />
                  <div>
                    <span className="font-sans text-[11px] text-charcoal-muted">Volunteer enquiries: </span>
                    <a
                      href="mailto:volunteer@ikc.org.in"
                      className="font-sans text-[11px] text-forest hover:underline transition-colors"
                    >
                      volunteer@ikc.org.in
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta flex-shrink-0" />
                  <div>
                    <span className="font-sans text-[11px] text-charcoal-muted">CSR programme office: </span>
                    <a
                      href="mailto:csr@ikc.org.in"
                      className="font-sans text-[11px] text-forest hover:underline transition-colors"
                    >
                      csr@ikc.org.in
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map embed */}
            <div className="pt-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.0!2d88.3516!3d22.5341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDMyJzAyLjgiTiA4OMKwMjEnMDUuOCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="256"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="IKC Trust location — 5 Elgin Road, Kolkata"
                className="w-full h-64 border border-sand-dark mt-4"
              />
            </div>
          </div>

          {/* ── Right: Contact Form ── */}
          <div className="lg:col-span-7">
            <div className="mb-8">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-terracotta font-semibold">
                Send a Message
              </span>
            </div>
            <ContactForm />
          </div>

        </div>
      </div>

    </main>
  );
}
