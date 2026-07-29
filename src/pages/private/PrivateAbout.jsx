import React from "react";
import { 
  ShoppingBag, 
  Smartphone, 
  Sparkles, 
  Home as HomeIcon, 
  Truck, 
  ShieldCheck, 
  Clock, 
  Zap, 
  CheckCircle2 
} from "lucide-react";

const PrivateAbout = () => {
  const categories = [
    {
      name: "Electronics & Tech",
      description: "Smartphones, laptops, accessories, and state-of-the-art gadgets.",
      icon: Smartphone,
      badge: "Popular",
    },
    {
      name: "Fashion & Lifestyle",
      description: "Trendy clothing, footwear, and accessories curated for every season.",
      icon: ShoppingBag,
      badge: "Trending",
    },
    {
      name: "Beauty & Personal Care",
      description: "Skincare, cosmetics, and self-care essentials from top global brands.",
      icon: Sparkles,
      badge: "New",
    },
    {
      name: "Home & Living",
      description: "Modern furniture, kitchen appliances, and decorative lifestyle essentials.",
      icon: HomeIcon,
      badge: "Essential",
    },
  ];

  const features = [
    {
      title: "Fast & Reliable Delivery",
      description: "Quick shipping to your doorstep with real-time order tracking.",
      icon: Truck,
    },
    {
      title: "100% Secure Shopping",
      description: "Encrypted transactions and trusted payment gateways for peace of mind.",
      icon: ShieldCheck,
    },
    {
      title: "24/7 Customer Support",
      description: "Our dedicated support team is always ready to assist with your purchases.",
      icon: Clock,
    },
    {
      title: "Instant Cart Experience",
      description: "Smooth single-click item management and seamless checkout flow.",
      icon: Zap,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-16">
        
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto animate-[fadeIn_0.4s_ease-out]">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-blue/10 px-4 py-1.5 text-xs font-bold text-sky-blue">
            <Sparkles className="h-3.5 w-3.5" />
            About QuickShop
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-800 tracking-tight">
            Your Ultimate Everyday <br className="hidden sm:inline" />
            <span className="text-sky-blue">Shopping Destination</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            Welcome to <span className="font-bold text-slate-800">QuickShop</span> — your all-in-one e-commerce hub designed to bring quality products, unmatched variety, and lightning-fast shopping straight to your fingertips.
          </p>
        </div>

        {/* Categories Grid */}
        <section className="space-y-6">
          <div className="text-center sm:text-left border-b border-slate-200/80 pb-4">
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
              Explore Our Product Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Discover thousands of products organized across popular categories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="group relative flex flex-col justify-between rounded-2xl bg-white p-6 border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-blue/10 hover:border-sky-blue/30"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-blue/10 text-sky-blue transition-colors group-hover:bg-sky-blue group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase text-slate-600">
                        {cat.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-800 transition-colors group-hover:text-sky-blue">
                      {cat.name}
                    </h3>
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-slate-50 flex items-center text-xs font-semibold text-sky-blue gap-1">
                    <span>Browse Collection</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Choose QuickShop Features */}
        <section className="rounded-3xl bg-white p-8 sm:p-10 border border-sky-blue/20 shadow-xl shadow-sky-blue/5">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              Why Shop With QuickShop?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 font-medium">
              We aim to make online shopping simpler, faster, and more enjoyable for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center space-y-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-blue/10 text-sky-blue ring-8 ring-sky-blue/5">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Commitment Banner */}
        <div className="rounded-2xl bg-slate-900 text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Ready to Upgrade Your Shopping Experience?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Discover verified products, discounted deals, and fast delivery today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-xl">
              <CheckCircle2 className="h-4 w-4" /> Verified Products
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PrivateAbout;