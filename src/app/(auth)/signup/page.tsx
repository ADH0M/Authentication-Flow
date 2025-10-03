"use client";
import React, { useActionState } from "react";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import Input, {
  BottomGradient,
  LabelInputContainer,
} from "@/components/ui/inputs";
import { SingupInitialState } from "@/lib/types";
import { signUpAction } from "@/lib/action/auth";
import Link from "next/link";

const initialState: SingupInitialState = { message: "" };

function SignupFormDemo() {
  const [state, formAction, isPending] = useActionState(
    signUpAction,
    initialState
  );

  return (
    <div className="mx-auto shadow-input  w-full max-w-xl my-1 sm:my-5 rounded-none bg-gray-200 p-4 md:rounded-2xl md:p-8 dark:bg-black/30">
      <h2 className="text-2xl font-bold">Create New Account</h2>
      <p className="mt-2">Fill in the details to create a new account</p>

      <form className="my-8" action={formAction}>
        {/* Display general error message */}
        {state?.message && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-50 text-center text-red-700 rounded">
            {state.message}
          </div>
        )}

        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <label htmlFor="firstname">First name</label>
            <Input
              id="firstname"
              placeholder="Tyler"
              type="text"
              name="firstname"
              defaultValue=""
            />
            {state?.errors?.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.firstName[0]}
              </p>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <label htmlFor="lastname">Last name</label>
            <Input
              id="lastname"
              placeholder="Durden"
              type="text"
              name="lastname"
              defaultValue=""
            />
            {state?.errors?.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.lastName[0]}
              </p>
            )}
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <label htmlFor="email">Email Address</label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            name="email"
            defaultValue=""
          />
          {state?.errors?.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            name="password"
            defaultValue=""
          />
          {state?.errors?.password && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.password[0]}
            </p>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <label htmlFor="confirm">Confirm Your Password</label>
          <Input
            id="confirm"
            placeholder="••••••••"
            type="password"
            name="confirm"
            defaultValue=""
          />
          {state?.errors?.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.confirmPassword[0]}
            </p>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <label
            htmlFor="countryCode"
            className="mb-2 flex pr-3 justify-between font-medium"
          >
            Country Code{" "}
            <span className="text-blue-500 dark:text-gray-300 text-sm">
              (e.g., US, FR, JP)
            </span>
          </label>
          <Input
            id="countryCode"
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter 2-letter country code"
            maxLength={2}
            name="countryCode"
            defaultValue=""
            // Auto-uppercase on input
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              target.value = target.value.toUpperCase();
            }}
          />
          {state?.errors?.countryCode && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.countryCode[0]}
            </p>
          )}
        </LabelInputContainer>

        <div className="flex items-start mb-4 px-1">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="terms"
            className="mr-2 text-sm text-gray-900 ml-2 dark:text-white"
          >
            I agree to the{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-200"
            >
              Terms and Conditions
            </a>
          </label>
        </div>

        <button
          className="group/btn relative flex justify-center items-center h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]
           dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 
           dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <span className="block w-5 h-5 border-r-2 animate-spin  border-r-indigo-500 text-blue-500 px-2 py-1 rounded-full" />
          ) : (
            "Sign up "
          )}
          <BottomGradient />
        </button>

        <div className="text-center text-sm mt-3 text-gray-600 dark:text-gray-400 mb-4">
          Do you have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign in
          </Link>
        </div>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
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
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
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
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
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
