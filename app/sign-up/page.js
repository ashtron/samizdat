"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import SignUp from "../components/signup";
import loggedIn from "../lib/auth-utilities";

export default async function SignUpPage() {
  const router = useRouter();

  useEffect(() => {
    async function protectPage() {
      if (!await loggedIn()) {
        router.push("/");
      }
    }
    
    protectPage();
  }, []);

  return <SignUp />
}
