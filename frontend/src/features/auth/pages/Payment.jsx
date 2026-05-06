import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaLock, FaArrowLeft } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import { Link } from "react-router-dom";
import CardPayment from "../components/CardPayment";

const Payment = () => {

  // 🔥 Plans Config
const plans = {
  starter: {
    price: 99,
    credits: 100,
    features: [
      "✔ Basic AI Reports",
      "✔ Standard Processing",
      "✔ Email Support",
    ],
  },
  pro: {
    price: 499,
    credits: 600,
    features: [
      "✔ Advanced AI Reports",
      "✔ Faster Processing ⚡",
      "✔ Priority Support",
    ],
  },
  premium: {
    price: 999,
    credits: 1200,
    features: [
      "✔ Premium AI Reports",
      "✔ Instant Processing 🚀",
      "✔ 24/7 Priority Support",
    ],
  },
};

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);

  // 🔥 Smooth scroll to bill
  useEffect(() => {
    if (selectedPlan) {
      document
        .getElementById("bill-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedPlan]);


  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 text-slate-100">

      {/* Header */}
      <nav className="border-b border-white/10 bg-white/5 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500">
              <GiStarsStack className="text-white text-lg" />
            </div>
            <h1 className="text-xl font-bold text-white">Upgrade Plan</h1>
          </div>

          <Link
            to="/profile"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-2xl hover:bg-white/20 transition"
          >
            <FaArrowLeft />
            Back
          </Link>
        </div>
      </nav>

      {/* Main */}
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Title */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            Upgrade Your Subscription
          </h2>
          <p className="text-slate-400">
            Get more credits and unlock unlimited interview reports 🚀
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          {Object.keys(plans).map((key) => {
            const plan = plans[key];

            return (
              <div
                key={key}
                className={`relative p-6 rounded-3xl border backdrop-blur-xl transition-all duration-300 group cursor-pointer ${
                  selectedPlan === key
                    ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105 ring-2 ring-cyan-400/40"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:scale-105"
                }`}
              >
                {/* Badge */}
                {key === "pro" && (
                  <span className="absolute -top-3 right-4 px-3 py-1 text-xs bg-gradient-to-r from-green-400 to-emerald-600 text-white rounded-full shadow">
                    Most Popular
                  </span>
                )}

                <h3 className="text-xl font-semibold capitalize mb-2">
                  {key}
                </h3>

                <p className="text-4xl font-extrabold text-white mb-1">
                  ₹{plan.price}
                </p>
                <p className="text-xs text-slate-400 mb-4">
                  one-time payment
                </p>

                <ul className="text-sm text-slate-300 space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                ))}
                </ul>

                <button
                  onClick={() => setSelectedPlan(key)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-green-400 to-emerald-600 text-white font-semibold tracking-wide hover:scale-105 active:scale-95 transition-all shadow-lg shadow-green-500/20"
                >
                  Select Plan
                </button>
              </div>
            );
          })}
        </div>

        {/* 🔥 BILL SECTION */}
        {selectedPlan && (
          <div
            id="bill-section"
            className="mt-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl shadow-black/40"
          >
            <h3 className="text-lg font-semibold text-white mb-6 tracking-wide">
              Order Summary
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-slate-300">
                <span className="capitalize">{selectedPlan} Plan</span>
                <span>₹{plans[selectedPlan].price}</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>Credits</span>
                <span>{plans[selectedPlan].credits}</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>GST (18%)</span>
                <span>
                  ₹{Math.round(plans[selectedPlan].price * 0.18)}
                </span>
              </div>

              <div className="border-t border-white/10 pt-4 flex justify-between text-white text-lg font-semibold">
                <span>Total</span>
                <span>
                  ₹
                  {plans[selectedPlan].price +
                    Math.round(plans[selectedPlan].price * 0.18)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowCard(true)}
              disabled={loading}
              className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-green-400 to-emerald-600 text-white font-semibold tracking-wide hover:scale-105 active:scale-95 transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
            >
              <FaLock />
              {loading ? "Processing..." : "Checkout Securely"}
            </button>

            <p className="text-xs text-center text-slate-500 mt-3">
              Secured by Razorpay • 100% safe payments
            </p>
          </div>
        )}
        {showCard && (
            <CardPayment
                plan={selectedPlan}
                onClose={() => setShowCard(false)}
            />
        )}

      </div>
    </div>
  );
};

export default Payment;