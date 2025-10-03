/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import { LoginErrors, SingupErrors } from "../types";

type SignupFormState = {
  message?: string;
  errors?: {
    username?: string[];
    email?: string[];
    phone?: string[];
    password?: string[];
    confirmPassword?: string[];
    general?: string;
  };
};

export async function signUpAction(
  prevState: any,
  formData: FormData
): Promise<any> {
  // Get form values correctly
  const firstName = formData.get("firstname") as string;
  const lastName = formData.get("lastname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm") as string;
  const countryCode = formData.get("countryCode") as string;

  // Validation
  const errors: SingupErrors = {};
  let hasErrors = false;

  // First name validation
  if (!firstName || firstName.trim().length < 2) {
    errors.firstName = ["First name must be at least 2 characters long."];
    hasErrors = true;
  }

  // Last name validation
  if (!lastName || lastName.trim().length < 2) {
    errors.lastName = ["Last name must be at least 2 characters long."];
    hasErrors = true;
  }

  // Email validation
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = ["Please enter a valid email address."];
    hasErrors = true;
  }

  // Password validation
  if (!password || password.length < 6) {
    errors.password = ["Password must be at least 6 characters long."];
    hasErrors = true;
  }

  // Confirm password validation
  if (password !== confirmPassword) {
    errors.confirmPassword = ["Passwords do not match."];
    hasErrors = true;
  }

  // Country code validation - FIXED LOGIC
  if (!countryCode) {
    errors.countryCode = ["Country code is required."];
    hasErrors = true;
  } else {
    // Validate country code format (2 uppercase letters)
    const countryCodeRegex = /^[A-Z]{2}$/;
    if (!countryCodeRegex.test(countryCode)) {
      errors.countryCode = [
        "Country code must be 2 uppercase letters (e.g., US, FR, JP).",
      ];
      hasErrors = true;
    }

    // Optional: Validate against known country codes
    const validCountryCodes = new Set(["EG", "US", "UK", "GB", "FR", "JP"]);

    if (!validCountryCodes.has(countryCode)) {
      errors.countryCode = [
        "Invalid country code. Please enter a valid 2-letter country code.",
      ];
      hasErrors = true;
    }
  }

  if (hasErrors) {
    return {
      message: "Validation failed.",
      errors,
    };
  }

  try {
    // Your actual signup logic would go here
    // For now, we'll just redirect
    console.log("Signup successful with:", {
      firstName,
      lastName,
      email,
      countryCode,
    });

    // Uncomment when you have your actual implementation:
    // const cookieStore = await cookies();
    // const existingUser = await User.findOne({
    //   $or: [{ email }],
    // }).exec();
    // if (existingUser) {
    //   return {
    //     message: "User already exists.",
    //     errors: {
    //       general: "An account with this email already exists.",
    //     },
    //   };
    // }
    // const user = await User.create({
    //   firstName,
    //   lastName,
    //   email,
    //   password,
    //   countryCode,
    //   role: ["customer"],
    // });
    // cookieStore.set("user-id", user.id);
  } catch (error: unknown) {
    console.error("Signup error:", error);
    return {
      message: "Something went wrong.",
      errors: {
        general: "Failed to create account. Please try again later.",
      },
    };
  }

  redirect("/login");
}
export async function loginAction(
  prevState: any,
  formData: FormData
): Promise<any> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const remember = formData.has("remember");

  // Validation
  const errors: LoginErrors = {};
  let hasErrors = false;

  // Email validation
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = ["Please enter a valid email address."];
    hasErrors = true;
  }

  // Password validation
  if (!password) {
    errors.password = ["Password is required."];
    hasErrors = true;
  }

  if (hasErrors) {
    return {
      message: "Validation failed.",
      errors,
    };
  }

  try {
    // TODO: Replace with your actual authentication logic
    // Example implementation:
    // const user = await User.findOne({ email }).select('+password');
    // if (!user) {
    //   return {
    //     message: "Invalid credentials",
    //     errors: { general: "Invalid email or password" }
    //   };
    // }
    //
    // const isPasswordValid = await user.comparePassword(password);
    // if (!isPasswordValid) {
    //   return {
    //     message: "Invalid credentials",
    //     errors: { general: "Invalid email or password" }
    //   };
    // }
    //
    // // Set cookies
    // const cookieStore = await cookies();
    // const maxAge = remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60; // 30 days or 1 day
    // cookieStore.set("user-id", user.id, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge,
    //   path: "/"
    // });
    // cookieStore.set("user-email", user.email, {
    //   httpOnly: false,
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge,
    //   path: "/"
    // });

    // For demo purposes - simulate successful login
    console.log("Login attempt:", { email, remember });

    // Set demo cookies
    const cookieStore = await cookies();
    const maxAge = remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
    cookieStore.set("user-email", email, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge,
      path: "/",
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return {
      message: "Something went wrong.",
      errors: {
        general: "Failed to sign in. Please try again later.",
      },
    };
  }

  redirect("/dashboard");
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("session");
    cookieStore.delete("user-id");
    cookieStore.delete("user-email");
    cookieStore.delete("user-name");
    cookieStore.delete("user-role");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Signup error:", error);
    return {
      message: "Something went wrong.",
      errors: {
        general: "Failed to logout account. Please try again later.",
      },
    };
  }

  redirect("/");
}
