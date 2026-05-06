import React, { useState } from "react";
import { FaCreditCard, FaLock } from "react-icons/fa";
import { genOtp, payOut } from "../services/auth.api";

const CardPayment = ({ plan, onClose }) => {
  const [step, setStep] = useState("card");
  const [loading, setLoading] = useState(false);

  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const [otp, setOtp] = useState("");

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    let { name, value } = e.target;

    // CARD NUMBER
    if (name === "number") {
      value = value.replace(/\D/g, "");

      if (value.length < 10) {
        setErrors((p) => ({ ...p, number: "Min 10 digits required" }));
      } else {
        setErrors((p) => ({ ...p, number: "" }));
      }
    }

    // EXPIRY
    if (name === "expiry") {
      value = value.replace(/\D/g, "");

      if (value.length >= 3) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
      }

      const [mm] = value.split("/");

      if (mm && (mm < 1 || mm > 12)) {
        setErrors((p) => ({ ...p, expiry: "Invalid month" }));
      } else if (value.length < 5) {
        setErrors((p) => ({ ...p, expiry: "Use MM/YY" }));
      } else {
        setErrors((p) => ({ ...p, expiry: "" }));
      }
    }

    // CVV
    if (name === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 3);

      if (value.length !== 3) {
        setErrors((p) => ({ ...p, cvv: "CVV must be 3 digits" }));
      } else {
        setErrors((p) => ({ ...p, cvv: "" }));
      }
    }

    // NAME
    if (name === "name") {
      if (value.trim().length < 3) {
        setErrors((p) => ({ ...p, name: "Enter full name" }));
      } else {
        setErrors((p) => ({ ...p, name: "" }));
      }
    }

    setCardData((p) => ({ ...p, [name]: value }));
  };

  const handleCardSubmit = async() => {
    if (
      errors.name ||
      errors.number ||
      errors.expiry ||
      errors.cvv ||
      !cardData.name ||
      !cardData.number ||
      !cardData.expiry ||
      !cardData.cvv

    ) {
      alert("Fix errors first");
      return;
    }
      setStep("otp");
      await genOtp()
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Enter valid OTP");
      return;
    }

    setLoading(true);
    const res = await payOut({otp,plan})
    if(res)
    {
      // setTimeout(() => {
        setLoading(false);
        setStep("success");
      // }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl">

        {/* CARD */}
        {step === "card" && (
          <>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FaCreditCard /> Card Payment
            </h2>

            <div className="space-y-3">

              <div>
                <input name="name" placeholder="Card Holder Name"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10" />
                {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
              </div>

              <div>
                <input name="number" placeholder="Card Number"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10" />
                {errors.number && <p className="text-red-400 text-xs">{errors.number}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input name="expiry" placeholder="MM/YY"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10" />
                  {errors.expiry && <p className="text-red-400 text-xs">{errors.expiry}</p>}
                </div>

                <div>
                  <input name="cvv" placeholder="CVV"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10" />
                  {errors.cvv && <p className="text-red-400 text-xs">{errors.cvv}</p>}
                </div>
              </div>

              <button
                onClick={handleCardSubmit}
                disabled={!cardData.name || !cardData.number || !cardData.expiry || !cardData.cvv}
                className={`${!cardData.name || !cardData.number || !cardData.expiry || !cardData.cvv ? " cursor-no-drop" : " cursor-pointer"} w-full py-3 rounded-xl bg-gradient-to-r from-green-400 to-emerald-600 flex items-center justify-center gap-2`}
              >
                <FaLock /> Pay Now
              </button>

              <button onClick={onClose}
                className="w-full text-sm text-slate-400 mt-2">
                Cancel
              </button>
            </div>
          </>
        )}

        {/* OTP */}
        {step === "otp" && (
          <>
            <h2 className="text-xl font-semibold">OTP Verification</h2>

            <h1 className="mb-6 text-sm font-normal text-slate-400 px-1">
              Enter the OTP for verification
            </h1>

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => {
                const value = e.target.value;

                // allow only numbers
                if (!/^[0-9]*$/.test(value)) return;

                setOtp(value);
              }}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-center tracking-[0.5em] text-lg focus:outline-none focus:border-cyan-500 transition-all"
              placeholder="------"
            />

            <button
              onClick={handleVerifyOtp}
              disabled={otp.length < 6 || loading}
              className="mt-6 w-full py-3 rounded-xl bg-cyan-500 disabled:opacity-50 hover:bg-cyan-600 transition-all"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {/* SUCCESS */}
        {step === "success" && (
          <div className="text-center py-6">
            <h2 className="text-green-400 text-xl mb-2">
              Payment Successful 🎉
            </h2>

            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-green-500 rounded-xl"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CardPayment;