import { MapPin, Phone, Mail, Users, Building2, HeartHandshake, Mic, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Contact | IKC Trust",
  description:
    "Get in touch with IKC Trust for partnerships, volunteering, CSR programmes, or general enquiries.",
};

const queryCards = [
  {
    icon: Mail,
    number: "01",
    title: "General Enquiry",
    description: "Questions about our work, programmes, or organisation.",
    cta: "Write to us",
    mailto: "mailto:admin@ikc.org.in?subject=[IKC Trust] General Enquiry",
  },
  {
    icon: Users,
    number: "02",
    title: "Volunteering",
    description: "Join our field campaigns as a volunteer or research fellow.",
    cta: "Get involved",
    mailto: "mailto:admin@ikc.org.in?subject=[IKC Trust] Volunteering Enquiry",
  },
  {
    icon: Building2,
    number: "03",
    title: "CSR & Partnerships",
    description: "Deploy your CSR mandate with verified auditing and governance.",
    cta: "Partner with us",
    mailto: "mailto:admin@ikc.org.in?subject=[IKC Trust] CSR%2FPartnership Enquiry",
  },
  {
    icon: HeartHandshake,
    number: "04",
    title: "Donations",
    description: "Tax-deductible contributions under Section 80G of the Income Tax Act.",
    cta: "Contribute",
    mailto: "mailto:admin@ikc.org.in?subject=[IKC Trust] Donation Enquiry",
  },
  {
    icon: Mic,
    number: "05",
    title: "Media & Press",
    description: "Press kits, interviews, and media collaboration requests.",
    cta: "Press office",
    mailto: "mailto:admin@ikc.org.in?subject=[IKC Trust] Media%2FPress Enquiry",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-ivory">

      {/* ── Hero ── */}
      <section className="w-full bg-forest-dark">
        <div className="w-full px-6 md:px-12 lg:px-20 pt-36 pb-20 md:pt-44 md:pb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-terracotta" />
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-terracotta font-semibold">
              IKC Trust · Connect
            </span>
          </div>
          <h1 className="font-serif font-normal leading-[1.0] tracking-tight text-warm-white">
            <span className="block text-[48px] sm:text-[60px] md:text-[72px] lg:text-[86px]">
              Get in Touch
            </span>
          </h1>
          <div className="w-16 h-[3px] bg-terracotta mt-8 mb-10" />

          {/* Inline contact strip inside hero */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl">
            <div className="flex items-start gap-3">
              <MapPin size={15} className="text-terracotta mt-1 flex-shrink-0" />
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-warm-white/40 font-semibold mb-1">Address</p>
                <p className="font-sans text-sm text-warm-white/80 leading-relaxed">
                  5 Elgin Road, Heritage Enclave<br />Kolkata 700020, India
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={15} className="text-terracotta mt-1 flex-shrink-0" />
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-warm-white/40 font-semibold mb-1">Phone</p>
                <a href="tel:+913324567890" className="font-sans text-sm text-warm-white/80 hover:text-warm-white transition-colors">
                  +91 33 2456 7890
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={15} className="text-terracotta mt-1 flex-shrink-0" />
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-warm-white/40 font-semibold mb-1">Email</p>
                <a href="mailto:admin@ikc.org.in" className="font-sans text-sm text-warm-white/80 hover:text-warm-white transition-colors">
                  admin@ikc.org.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Query Cards ── */}
      <section className="w-full px-6 md:px-12 lg:px-20 py-20 md:py-28">

        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-sand-dark mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-terracotta" />
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-terracotta font-semibold">
                How can we help?
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal">
              Choose your enquiry type.
            </h2>
          </div>
          <p className="font-sans text-sm text-charcoal-muted max-w-sm leading-relaxed">
            Each card opens your mail app pre-addressed to{" "}
            <span className="text-forest font-medium">admin@ikc.org.in</span>{" "}
            with the subject filled in.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-sand-dark">
          {queryCards.map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.title}
                href={card.mailto}
                className="group bg-ivory hover:bg-warm-white transition-colors p-8 md:p-10 flex flex-col justify-between min-h-[260px]"
              >
                <div>
                  {/* Number + icon row */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-4xl text-sand-dark select-none leading-none">
                      {card.number}
                    </span>
                    <div className="w-10 h-10 border border-sand-dark bg-warm-white group-hover:bg-forest group-hover:border-forest flex items-center justify-center transition-colors">
                      <Icon size={18} className="text-forest group-hover:text-warm-white transition-colors" />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl text-charcoal group-hover:text-forest transition-colors mb-3">
                    {card.title}
                  </h3>
                  <p className="font-sans text-sm text-charcoal-muted leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 mt-6 border-t border-sand-dark">
                  <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-forest font-semibold group-hover:text-terracotta transition-colors">
                    {card.cta}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-charcoal-muted group-hover:text-terracotta transition-colors"
                  />
                </div>
              </a>
            );
          })}

          {/* Filler cell to complete the grid visually */}
          <div className="hidden lg:block bg-forest-dark p-8 md:p-10 min-h-[260px] flex flex-col justify-end">
            <p className="font-serif text-2xl text-warm-white/30 leading-snug">
              Integrated Knowledge<br />& Care
            </p>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-warm-white/20 font-semibold mt-4">
              Kolkata · West Bengal
            </p>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="w-full px-6 md:px-12 lg:px-20 pb-20">
        {/* Label row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-terracotta" />
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-terracotta font-semibold">
              Find Us
            </span>
          </div>
          <a
            href="https://maps.google.com/?q=5+Elgin+Road+Kolkata"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[11px] uppercase tracking-[0.18em] text-forest font-semibold hover:text-terracotta transition-colors flex items-center gap-1"
          >
            Open in Maps <ArrowUpRight size={12} />
          </a>
        </div>

        {/* Map — CSS filter tones it to match the site palette */}
        <div className="border border-sand-dark overflow-hidden relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.0!2d88.3516!3d22.5341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDMyJzAyLjgiTiA4OMKwMjEnMDUuOCJF!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="400"
            style={{
              border: 0,
              display: "block",
              filter: "grayscale(1) contrast(0.85) brightness(1.08) sepia(0.25)",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="IKC Trust — 5 Elgin Road, Kolkata"
          />
        </div>

        {/* Address caption bar */}
        <div className="border border-t-0 border-sand-dark bg-forest-dark px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-terracotta flex-shrink-0" />
            <span className="font-sans text-[11px] text-warm-white/70 uppercase tracking-[0.18em]">
              5 Elgin Road, Heritage Enclave, Kolkata 700020
            </span>
          </div>
          <span className="font-sans text-[10px] text-warm-white/30 uppercase tracking-[0.15em] hidden sm:block">
            West Bengal, India
          </span>
        </div>
      </section>

    </main>
  );
}
