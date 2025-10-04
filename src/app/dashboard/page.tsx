"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check auth on mount
    const token = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("userName");

    if (!token || !storedUserName) {
      // Redirect to login if not authenticated
      router.push("/login");
      return;
    }

    setUserName(storedUserName);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 ">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 ">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-input ">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome, <span className="text-blue-600">{userName}</span>!
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          You are logged in and viewing your dashboard.
        </p>

        <div>
          <Link href={'/product'}>go product page</Link>
        </div>

        <div className="mt-6">
          <button
            onClick={() => {
              // Logout: clear localStorage and redirect
              localStorage.removeItem("token");
              localStorage.removeItem("userName");
              router.push("/login");
            }}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
