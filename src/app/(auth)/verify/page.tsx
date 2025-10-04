"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function VerifyPage() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "";
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const raw = element.value;
    const digitMatch = raw.replace(/\D/g, "");
    const char = digitMatch ? digitMatch[digitMatch.length - 1] : "";

    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);

    if (char && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
      inputRefs.current[index + 1]?.select();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const key = e.key;
    if (key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      if (newOtp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
        inputRefs.current[index]?.focus();
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const prev = [...otp];
        prev[index - 1] = "";
        setOtp(prev);
      }
    } else if (key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (key === "ArrowRight" && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (key === "Enter") {
      (e.target as HTMLInputElement).form?.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  // Verify OTP
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter a 6-digit code.");
      setIsLoading(false);
      return;
    }

    if (!baseURL) {
      setError("Server base URL is not configured.");
      setIsLoading(false);
      return;
    }

    const fd = new FormData();
    fd.append("code", otpCode);
    if (email) fd.append("email", email);

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    try {
      const res = await fetch(`${baseURL}/auth/verify-email`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: fd,
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        setSuccess(true);

        try {
          if (token) {
            const userRes = await fetch(`${baseURL}/auth/user-data`, {
              method: "GET",
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            const userData = await userRes.json().catch(() => null);
            const userName =
              userData?.data?.name ||
              userData?.data?.full_name ||
              userData?.data?.username ||
              null;
            if (userName && typeof window !== "undefined") {
              localStorage.setItem("userName", userName);
            }
          }
        } catch (err) {
          console.warn("Failed to fetch user-data after verify", err);
        }

        setTimeout(() => {
          router.push("/dashboard?verified=true");
        }, 900);
      } else {
        const msg =
          data?.message ||
          (data?.errors
            ? Object.values(data.errors).flat().join(", ")
            : null) ||
          "Invalid or expired code. Please try again.";
        setError(msg);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to verify. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setIsLoading(true);
    setError(null);

    if (!baseURL) {
      setError("Server base URL is not configured.");
      setIsLoading(false);
      return;
    }

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    try {
      const fd = new FormData();
      if (email) fd.append("email", email);

      const res = await fetch(`${baseURL}/auth/verify-email/resend-code`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: fd,
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        setResendCooldown(60);
      } else {
        const msg =
          data?.message ||
          (data?.errors
            ? Object.values(data.errors).flat().join(", ")
            : null) ||
          "Failed to resend code.";
        setError(msg);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [resendCooldown]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="flex bg-[#f4f4f4] min-h-screen flex-col items-center justify-center  px-4 py-12 ">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-[#fefefe] p-8 shadow-input ">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Verify Your Account</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-blue-600">
              {email || "your email"}
            </span>
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-3 text-center text-sm text-red-700">
            {error}
          </div>
        )}

        {success ? (
          <div className="rounded-md bg-green-50 p-3 text-center text-sm text-green-700">
            Account verified! Redirecting to login...
          </div>
        ) : (
          <form className="mt-6 space-y-6" onSubmit={handleVerify}>
            {/* OTP Input */}
            <div className="flex justify-between">
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  className="h-14 w-12 rounded-lg border border-gray-300
                   bg-white text-center text-xl text-indigo-500 font-bold shadow-sm 
                   focus:border-blue-500 focus:outline-none focus:ring-1
                    focus:ring-blue-500 
                     "
                  disabled={isLoading || success}
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group/btn cursor-pointer hover:opacity-70  relative flex w-full justify-center rounded-md 
              bg-gradient-to-br from-blue-900 to-neutral-600 py-2 font-medium
               text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]
                disabled:opacity-70 dark:bg-zinc-800"
            >
              {isLoading ? (
                <span
                  className="block h-5 w-5 animate-spin rounded-full border-r-2
                 border-r-indigo-50"
                />
              ) : (
                "Verify Account"
              )}
            </button>
          </form>
        )}

        {/* Resend Code */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Didn’t receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled // the is disable resendCooldown > 0 || isLoading .........
            className={`font-medium ${
              resendCooldown > 0 || isLoading
                ? "cursor-not-allowed text-gray-400"
                : "text-blue-600 hover:underline dark:text-blue-400"
            }`}
          >
            {resendCooldown > 0 ? `Resend (${resendCooldown}s)` : "Resend code"}
          </button>
        </div>

        {/* Back to Login */}
        <div className="pt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
