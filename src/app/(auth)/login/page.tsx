"use client";
import React, { useActionState } from "react";
import { BottomGradient, LabelInputContainer } from "@/components/ui/inputs";
import { loginAction } from "@/lib/action/auth";
import { LoginInitialState } from "@/lib/types";
import Link from "next/link";
import { IconBrandFacebook, IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

const initialState: LoginInitialState = { message: "" };

function LoginFormDemo() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <div className="shadow-input mx-auto w-full max-w-xl my-5 rounded-none bg-gray-200 p-4 md:rounded-2xl md:p-8 dark:bg-black/30">
      <h2 className="text-2xl font-bold">Welcome Back</h2>
      <p className="mt-2">Sign in to your account</p>

      <form className="my-8" action={formAction}>
        {/* General error message */}
        {state?.message && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {state.message}
          </div>
        )}

        <LabelInputContainer className="mb-4">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            name="email"
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:border-zinc-700 dark:text-white"
            defaultValue=""
          />
          {state?.errors?.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            placeholder="••••••••"
            type="password"
            name="password"
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-900 dark:border-zinc-700 dark:text-white"
            defaultValue=""
          />
          {state?.errors?.password && (
            <p className="text-red-500 text-sm mt-1">
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
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="remember"
              className="ml-2 text-sm text-gray-900 dark:text-white"
            >
              Remember me
            </label>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            Forgot password?
          </Link>
        </div>

        <button
          className="group/btn relative flex justify-center items-center h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <span className="block w-5 h-5 border-r-2 animate-spin  border-r-indigo-500 text-blue-500 px-2 py-1 rounded-full" />
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

export default LoginFormDemo;
