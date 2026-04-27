import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-bone text-emerald-deep mt-0 border-t border-emerald-deep/15">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5">
            <span
              lang="bn"
              className="block text-7xl md:text-8xl text-emerald-deep leading-none mb-6"
              style={{ fontFamily: '"Noto Serif Bengali", serif', fontWeight: 500 }}
            >
              উপমা
            </span>
            <p className="font-serif italic text-3xl md:text-4xl leading-[1.05] text-balance text-emerald-deep">
              A quiet house for <span className="text-gold">enduring</span> brands.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="text-[10px] tracking-luxury uppercase text-emerald-deep/55 mb-5">Studio</p>
            <p className="text-sm leading-relaxed text-emerald-deep/75">
              House 14, Road 11<br />
              Banani, Dhaka 1213<br />
              Bangladesh
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[10px] tracking-luxury uppercase text-emerald-deep/55 mb-5">Inquiry</p>
            <a
              href="mailto:syednaved.abdullah@proton.me"
              className="block font-serif italic text-2xl text-emerald-deep hover:text-gold transition-colors"
            >
              syednaved.abdullah@proton.me
            </a>
          </div>
        </div>

        <div className="border-t border-emerald-deep/15 mt-20 pt-8 flex flex-col md:flex-row justify-between gap-4 text-[10px] tracking-refined uppercase text-emerald-deep/55">
          <p>© {new Date().getFullYear()} Upoma Consultancy. Crafted in Dhaka.</p>
          <div className="flex gap-8">
            <Link to="/practice" className="hover:text-gold transition-colors">Practice</Link>
            <Link to="/services" className="hover:text-gold transition-colors">Services</Link>
            <Link to="/portfolio" className="hover:text-gold transition-colors">Portfolio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
