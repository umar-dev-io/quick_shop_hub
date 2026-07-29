import React, { useState } from "react";
import { useOutletContext, useNavigate, Link } from "react-router";
import emailjs from "@emailjs/browser";
import {
  Truck,
  ShieldCheck,
  CreditCard,
  Mail,
  User,
  MapPin,
  Phone,
  CheckCircle2,
  ArrowLeft,
  Loader2,
  PackageCheck,
} from "lucide-react";

const Proceed = () => {
  const navigate = useNavigate();
  // Get cart items from parent route outlet context
  const { cartItems = [], setCartItems } = useOutletContext() || {};

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });

  // Calculate Prices
  const subtotal = cartItems.reduce((sum, item) => {
    const discountedPrice =
      item.price - (item.price * (item.discountPercentage || 0)) / 100;
    return sum + discountedPrice * item.quantity;
  }, 0);

  const shippingFee = subtotal > 100 || cartItems.length === 0 ? 0 : 15;
  const totalPrice = (subtotal + shippingFee).toFixed(2);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsSubmitting(true);

    const orderId = `QS-${Math.floor(100000 + Math.random() * 900000)}`;
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 10);

    const formattedItems = cartItems
      .map(
        (item) =>
          `• ${item.title} (x${item.quantity}) - $${(
            (item.price - (item.price * (item.discountPercentage || 0)) / 100) *
            item.quantity
          ).toFixed(2)}`,
      )
      .join("\n");

    const templateParams = {
      to_name: formData.fullName,
      to_email: formData.email,
      order_id: orderId,
      order_total: `$${totalPrice}`,
      payment_method: "Cash on Delivery (COD)",
      delivery_time: "7 - 10 Business Days",
      shipping_address: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
      order_items: formattedItems,
    };

    try {
      await emailjs.send(
        "service_x0mclsb", // Your Service ID
        "template_0nb5dcg", // Updated with your actual Template ID from screenshot
        templateParams,
        "OLFwa7O5sBeL8D9BQ", // Your Public Key
      );
    } catch (error) {
      console.warn("EmailJS failed to send email (check keys):", error);
    } finally {
      setIsSubmitting(false);
      setOrderDetails({
        orderId,
        total: totalPrice,
        email: formData.email,
        address: `${formData.address}, ${formData.city}`,
        estimatedDelivery: estimatedDelivery.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });
      setOrderSuccess(true);
      if (setCartItems) setCartItems([]); // Clear cart upon order completion
    }
  };

  if (orderSuccess && orderDetails) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 text-center space-y-6">
          <div className="h-20 w-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-sky-blue">
              Order Confirmed
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
              Thank You for Your Order!
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              We have dispatched your order details to{" "}
              <span className="font-semibold text-slate-800">
                {orderDetails.email}
              </span>
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left text-xs space-y-2.5">
            <div className="flex justify-between">
              <span className="text-slate-400">Order ID:</span>
              <span className="font-bold text-slate-800">
                {orderDetails.orderId}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Payment Mode:</span>
              <span className="font-bold text-emerald-600">
                Cash on Delivery (COD)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Estimated Delivery:</span>
              <span className="font-bold text-slate-800">
                {orderDetails.estimatedDelivery} (Within 10 Days)
              </span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2">
              <span className="text-slate-500 font-bold">Total Amount:</span>
              <span className="font-extrabold text-slate-900 text-sm">
                ${orderDetails.total}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            🚚 Our delivery team will contact you via phone prior to arrival.
          </p>

          <button
            onClick={() => navigate("/")}
            className="w-full py-3.5 bg-sky-blue hover:bg-sky-blue/90 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-blue/20 transition-all active:scale-95"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16 pt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-sky-blue transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Shopping
          </Link>
          <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">
            Checkout & Order Confirmation
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
            <PackageCheck className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800">
              Your cart is empty
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              Please add items to your cart before proceeding to checkout.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2.5 bg-sky-blue text-white rounded-xl text-xs font-bold shadow-md hover:bg-sky-blue/90 transition-all"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <form
            onSubmit={handlePlaceOrder}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Column: Shipping & Contact Form */}
            <div className="lg:col-span-7 space-y-6">
              {/* Shipping Address Box */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <MapPin className="h-5 w-5 text-sky-blue" />
                  <h2 className="text-base font-bold text-slate-800">
                    Shipping & Delivery Address
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-sky-blue"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-sky-blue"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-sky-blue"
                      />
                    </div>
                  </div>

                  {/* Street Address */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder="123 Shopping St, Apt 4B"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-sky-blue"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="New York"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-sky-blue"
                    />
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      placeholder="10001"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-sky-blue"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Option: Cash on Delivery */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <CreditCard className="h-5 w-5 text-sky-blue" />
                  <h2 className="text-base font-bold text-slate-800">
                    Payment Method
                  </h2>
                </div>

                <div className="flex items-center justify-between rounded-2xl border-2 border-sky-blue bg-sky-blue/5 p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full bg-sky-blue ring-4 ring-sky-blue/20" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Cash on Delivery (COD)
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Pay in cash upon physical delivery.
                      </p>
                    </div>
                  </div>
                  <Truck className="h-5 w-5 text-sky-blue" />
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm sticky top-20 space-y-4">
                <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">
                  Order Summary ({cartItems.length} items)
                </h2>

                {/* Items List */}
                <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                  {cartItems.map((item) => {
                    const price = (
                      item.price -
                      (item.price * (item.discountPercentage || 0)) / 100
                    ).toFixed(2);

                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2 max-w-[70%]">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="h-10 w-10 rounded-lg bg-slate-50 object-contain p-1 border border-slate-100"
                          />
                          <div className="truncate">
                            <p className="font-bold text-slate-800 truncate">
                              {item.title}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-slate-800">
                          ${(price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Estimated Shipping</span>
                    <span>
                      {shippingFee === 0 ? (
                        <span className="text-emerald-600 font-bold">FREE</span>
                      ) : (
                        `$${shippingFee.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Estimated Delivery Time</span>
                    <span className="font-bold text-slate-800">
                      Within 10 Days
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-3 text-sm font-extrabold text-slate-900">
                    <span>Total Amount</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-sky-blue hover:bg-sky-blue/90 text-white font-bold text-xs rounded-xl shadow-lg shadow-sky-blue/25 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Processing Order...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      <span>Place Order (Cash on Delivery)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Proceed;
