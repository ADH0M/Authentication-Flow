/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Input, {
  BottomGradient,
  LabelInputContainer,
} from "@/components/ui/inputs";
import Link from "next/link";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { FormStateLogin } from "@/lib/types";

export default function LoginFormDemo() {
  const router = useRouter();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "";

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [isPending, setIsPending] = useState(false);
  const [state, setState] = useState<FormStateLogin>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const getServerMessage = (data: any) => {
    if (!data) return "Server error";
    if (data.message) return data.message;
    if (data.errors) {
      // pick first field error
      const first = Object.values(data.errors)[0];
      if (Array.isArray(first)) return first[0];
      return String(first);
    }
    return "Login failed";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({});
    setIsPending(true);

    const { email, password } = form;
    const errors: FormStateLogin["errors"] = {};

    // Basic validation
    if (!email.trim()) errors.email = ["Email is required"];
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = ["Invalid email format"];
    if (!password) errors.password = ["Password is required"];

    if (Object.keys(errors).length > 0) {
      setState({ errors });
      setIsPending(false);
      return;
    }

    if (!baseURL) {
      setState({ message: "Server base URL is not configured." });
      setIsPending(false);
      return;
    }

    try {
      const fd = new FormData();
      fd.append("email", email.trim());
      fd.append("password", password);

      const res = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          // Do NOT set Content-Type — browser will add multipart boundary for FormData
        },
        body: fd,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        // show field errors if provided
        const fieldErrors = data?.errors ? data.errors : undefined;
        setState({
          message: getServerMessage(data),
          errors: fieldErrors,
        });
        return;
      }

      // Success: extract token from data.data.token (per Postman)
      const token = data?.data?.token || data?.token;
      const userName =
        data?.data?.name ||
        data?.data?.user?.name ||
        data?.data?.user?.full_name ||
        data?.data?.username ||
        "";

      if (token) {
        localStorage.setItem("token", token);
        if (userName) localStorage.setItem("userName", userName);
        router.push("/dashboard");
      } else {
        setState({ message: "Login successful but no token received." });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setState({ message: "Network error. Please try again later." });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="shadow-input mx-auto bg-[#f5eeee8a]  w-full max-w-xl my-5 rounded-none p-4 md:rounded-2xl 
    md:p-8 ">
      <h2 className="text-2xl font-bold">Welcome Back</h2>
      <p className="mt-2">Sign in to your account</p>

      <form className="my-8" onSubmit={handleSubmit} noValidate>
        {state?.message && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {state.message}
          </div>
        )}

        <LabelInputContainer className="mb-4">
          <label htmlFor="email">Email Address</label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            aria-invalid={!!state?.errors?.email}
            aria-describedby={state?.errors?.email ? "email-error" : undefined}
          />
          {state?.errors?.email && (
            <p id="email-error" className="text-red-500 text-sm mt-1">
              {state.errors.email[0]}
            </p>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            placeholder="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            aria-invalid={!!state?.errors?.password}
            aria-describedby={
              state?.errors?.password ? "password-error" : undefined
            }
          />
          {state?.errors?.password && (
            <p id="password-error" className="text-red-500 text-sm mt-1">
              {state.errors.password[0]}
            </p>
          )}
        </LabelInputContainer>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              checked={form.remember}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="remember"
              className="ml-2 text-sm text-gray-900 "
            >
              Remember me
            </label>
          </div>
          <Link
            href=""
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            Forgot password?
          </Link>
        </div>

        <button
          className="group/btn relative cursor-pointer hover:opacity-65  flex justify-center items-center h-10 w-full
           rounded-md bg-gradient-to-br from-indigo-800 to-neutral-500 font-medium text-white
            shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] 
            "
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
        >
          {isPending ? (
            <span className="block w-5 h-5 border-r-2 animate-spin border-r-indigo-50 text-blue-500 px-2 py-1 rounded-full" />
          ) : (
            "Sign in →"
          )}
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign up
          </Link>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn relative flex justify-center items-center h-10 w-full
           rounded-md bg-gradient-to-br from-indigo-800 to-neutral-500 font-medium text-white
            shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] 
            "
            type="button"
            onClick={() => console.log("GitHub signup")}
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              GitHub
            </span>
            <BottomGradient />
          </button>

          <button
            className="group/btn relative flex justify-center items-center h-10 w-full
           rounded-md bg-gradient-to-br from-indigo-800 to-neutral-500 font-medium text-white
            shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] 
            "
            type="button"
            onClick={() => console.log("Google signup")}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn relative flex justify-center items-center h-10 w-full
           rounded-md bg-gradient-to-br from-indigo-800 to-neutral-500 font-medium text-white
            shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] 
            "
            type="button"
            onClick={() => console.log("Facebook signup")}
          >
            <IconBrandFacebook className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Facebook
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}
