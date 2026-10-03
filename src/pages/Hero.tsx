import BookingBar from "../components/booking/BookingBar";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1920&q=80";

export default function Hero() {
  return (
    <section id="home">
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24 pb-16">
        {/* Background image + dark gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt="Traditional Newari architecture in Bhaktapur"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-bg-dark/90 via-bg-dark/50 to-bg-dark/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto mt-8 max-w-5xl px-4 text-center text-text-light sm:px-6 lg:px-8">
          {/* Eyebrow */}
          <span className="mb-4 inline-block rounded-full border border-gold/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-gold-light backdrop-blur-md sm:text-sm">
            Welcome to Khwapa Chhen
          </span>

          {/* Heading */}
          <h1 className="mb-6 font-heading text-4xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl">
            Stay in the Heart of
            <br className="hidden sm:inline" />
            <span className="font-normal italic text-gold">Bhaktapur</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-2xl text-base font-light leading-relaxed text-white/85 sm:text-lg md:text-xl">
            Experience warm Newari hospitality, traditional architecture, and
            the timeless charm of Bhaktapur Durbar Square at Khwapa Chhen Guest
            House.
          </p>

          {/* Booking Bar */}
          <div id="booking-bar">
            <BookingBar />
          </div>
        </div>
      </div>
    </section>
  );
}
