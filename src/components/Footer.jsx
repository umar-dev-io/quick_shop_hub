import React from "react";
import { Link } from "react-router";
import {
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
  Send,
  Code,
  Globe,
  Share2,
  MessageCircle,
  Heart,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top Section: Newsletter Banner */}
      <div className="border-b border-slate-800 bg-slate-950/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">
                Join our newsletter
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Get the latest product updates, exclusive discounts, and news directly to your inbox.
              </p>
            </div>

            {/* Newsletter Input */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full md:w-auto items-center gap-2 max-w-md"
            >
              <div className="relative w-full md:w-72">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs text-white placeholder-slate-500 shadow-inner focus:border-sky-blue focus:outline-none focus:ring-2 focus:ring-sky-blue/20"
                  required
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-xl bg-sky-blue px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-sky-blue/20 hover:bg-sky-blue/90 active:scale-95 transition-all focus:outline-none"
              >
                <span>Subscribe</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links Container */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-blue text-white shadow-md">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold tracking-wide uppercase">
                Quick Shop
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Your one-stop destination for quality products at unbeatable prices. Fast shipping, secure checkout, and 24/7 customer support.
            </p>

            {/* Social Links (using valid Lucide Icons) */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#code"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-sky-blue hover:text-white transition-all duration-200"
                aria-label="GitHub/Code"
              >
                <Code className="h-4 w-4" />
              </a>
              <a
                href="#globe"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-sky-blue hover:text-white transition-all duration-200"
                aria-label="Website"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="#share"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-sky-blue hover:text-white transition-all duration-200"
                aria-label="Share"
              >
                <Share2 className="h-4 w-4" />
              </a>
              <a
                href="#community"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-sky-blue hover:text-white transition-all duration-200"
                aria-label="Community"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <Link to="/" className="hover:text-sky-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-sky-blue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#products" className="hover:text-sky-blue transition-colors">
                  Featured Products
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-sky-blue transition-colors">
                  Categories
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Support */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <a href="#faq" className="hover:text-sky-blue transition-colors">
                  FAQ & Help
                </a>
              </li>
              <li>
                <a href="#shipping" className="hover:text-sky-blue transition-colors">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#returns" className="hover:text-sky-blue transition-colors">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-sky-blue transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-sky-blue shrink-0 mt-0.5" />
                <span>123 Commerce Way, Tech District, NY 10001</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-sky-blue shrink-0" />
                <span>+1 (800) 555-0199</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-sky-blue shrink-0" />
                <span>support@quickshop.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-800 bg-slate-950 py-4">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 text-xs text-slate-500 gap-2">
          <p className="flex items-center gap-1">
            © {currentYear} Quick Shop. Built with <Heart className="h-3 w-3 text-red-500 fill-current" /> by Tech Team.
          </p>
          <div className="flex items-center gap-4">
            <a href="#terms" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;