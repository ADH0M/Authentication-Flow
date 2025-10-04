"use client";
import React, { useState } from "react";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import Input, {
  BottomGradient,
  LabelInputContainer,
} from "@/components/ui/inputs";
import Link from "next/link";
import { FormDataType, FormStateType } from "@/lib/types";
import { useRouter } from "next/navigation";

const COUNTRIES = [
  { name: "US", code: "US", callingCode: 1 },
  { name: "UK", code: "GB", callingCode: 44 },
  { name: "EG", code: "EG", callingCode: 20 },
  { name: "Au", code: "AU", callingCode: 61 },
  { name: "TS", code: "TS", callingCode: 971 },
  { name: "Fr", code: "FR", callingCode: 33 },
  { name: "India", code: "IN", callingCode: 91 },
  { name: "Japan", code: "JP", callingCode: 81 },
  { name: "Brazil", code: "BR", callingCode: 55 },
  { name: "Me", code: "MX", callingCode: 52 },
  // Add more as needed
].sort((a, b) => a.name.localeCompare(b.name));

function SignupFormDemo() {
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryCode: "US", // default
    mobile: "",
  });
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [state, setState] = useState<FormStateType>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setState({});

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      countryCode,
      mobile,
    } = formData;

    // --- validation (you already had it) ---
    const errors: FormStateType["errors"] = {};
    if (!firstName.trim()) errors.firstName = ["First name is required"];
    if (!lastName.trim()) errors.lastName = ["Last name is required"];
    if (!email.trim()) errors.email = ["Email is required"];
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = ["Invalid email format"];
    if (!password) errors.password = ["Password is required"];
    else if (password.length < 6)
      errors.password = ["Password must be at least 6 characters"];
    if (password !== confirmPassword)
      errors.confirmPassword = ["Passwords do not match"];
    if (!countryCode) errors.countryCode = ["Please select a country"];
    if (!mobile.trim()) errors.mobile = ["Mobile number is required"];
    else {
      const cleanMobile = mobile.replace(/[^\d]/g, "");
      if (cleanMobile.length < 7 || cleanMobile.length > 15) {
        errors.mobile = ["Mobile number must be 7–15 digits"];
      }
    }


    if (Object.keys(errors).length > 0) {
      setState({ errors });
      setIsPending(false);
      return;
    }

    // --- prepare data ---
    const selectedCountry = COUNTRIES.find((c) => c.code === countryCode);
    const callingCode = selectedCountry?.callingCode;

    if (!callingCode) {
      setState({ message: "Invalid country selection." });
      setIsPending(false);
      return;
    }

    // clean mobile (strip non-digits)
    const cleanMobile = mobile.replace(/[^\d]/g, "");

    // Build FormData (Postman expects form-data)
    const fd = new FormData();
    fd.append("name", `${firstName.trim()} ${lastName.trim()}`);
    fd.append("email", email.trim());
    fd.append("password", password);
    fd.append("password_confirmation", confirmPassword);
    fd.append("mobile_country_code", String(callingCode));
    fd.append("mobile", cleanMobile);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: fd,
        }
      );
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        // server might return errors object or message
        setState({
          message: data?.message || "Signup failed. Please try again.",
          errors: data?.errors,
        });
        return;
      }

      const token = data?.data?.token;
      const nameFromRes =
        data?.data?.name || `${firstName.trim()} ${lastName.trim()}`;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("userName", nameFromRes);
        router.push(`/verify?email=${encodeURIComponent(email.trim())}`);
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setState({ message: "Network error. Please try again later." });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-[#f5eeee8a] shadow-input mx-auto w-full max-w-xl my-5 rounded-none p-4 md:rounded-2xl md:p-8 ">
      <h2 className="text-2xl font-bold">Create New Account</h2>
      <p className="mt-2">Fill in the details to create a new account</p>

      <form className="my-8" onSubmit={handleSubmit}>
        {state?.message && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-50 text-center text-red-700 rounded">
            {state.message}
          </div>
        )}

        {/* Name Fields */}
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <label htmlFor="firstName">First name</label>
            <Input
              id="firstName"
              placeholder="Tyler"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {state?.errors?.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.firstName[0]}
              </p>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <label htmlFor="lastName">Last name</label>
            <Input
              id="lastName"
              placeholder="Durden"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {state?.errors?.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.lastName[0]}
              </p>
            )}
          </LabelInputContainer>
        </div>

        <div className="mb-4 flex w-full gap-4">
          {/* Country Code Dropdown */}
          <LabelInputContainer className="mb-4 max-w-fit ">
            <label htmlFor="countryCode">code</label>
            <div className="border p-2 rounded-md">
              <select
                id="countryCode"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="  outline-none h-full"
              >
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name} (+{country.callingCode})
                  </option>
                ))}
              </select>
            </div>

            {state?.errors?.countryCode && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.countryCode[0]}
              </p>
            )}
          </LabelInputContainer>

          {/* Mobile */}
          <LabelInputContainer className="mb-4 ">
            <label htmlFor="mobile">Mobile Number</label>
            <Input
              id="mobile"
              type="tel"
              placeholder="Enter mobile number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              maxLength={15}
            />
            {state?.errors?.mobile && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.mobile[0]}
              </p>
            )}
          </LabelInputContainer>
        </div>

        {/* Email */}
        <LabelInputContainer className="mb-4">
          <label htmlFor="email">Email Address</label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {state?.errors?.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
          )}
        </LabelInputContainer>

        {/* Password */}
        <LabelInputContainer className="mb-4">
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {state?.errors?.password && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.password[0]}
            </p>
          )}
        </LabelInputContainer>

        {/* Confirm Password */}
        <LabelInputContainer className="mb-8">
          <label htmlFor="confirmPassword">Confirm Your Password</label>
          <Input
            id="confirmPassword"
            placeholder="••••••••"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {state?.errors?.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.confirmPassword[0]}
            </p>
          )}
        </LabelInputContainer>

        {/* Submit Button */}
        <button
          className="group/btn cursor-pointer hover:opacity-65 relative flex justify-center items-center h-10 w-full
           rounded-md bg-gradient-to-br from-indigo-800 to-neutral-500 font-medium text-white
            shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] 
            "
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <span className="block w-5 h-5 border-r-2 animate-spin border-r-indigo-50
             text-blue-500 px-2 py-1 rounded-full" />
          ) : (
            "Sign up"
          )}
          <BottomGradient />
        </button>

        {/* Login Link */}
        <div className="text-center text-sm mt-3 text-gray-600 dark:text-gray-400 mb-4">
          Do you have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign in
          </Link>
        </div>

        {/* Divider */}
        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

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

export default SignupFormDemo;
