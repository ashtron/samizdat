"use client";

import Link from "next/link";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogIn() {
  const supabase = createBrowserSupabaseClient();
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  async function logIn(event) {
    event.preventDefault();

    await supabase.auth.signInWithPassword(credentials);

    router.push("/media");
  }

  function handleChange(event) {
    event.preventDefault();

    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <main className="container">
      <form onSubmit={logIn}>
        <article>
          <header>
            Log In or {<Link href="/sign-up">Create an Account</Link>}
          </header>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={credentials.email}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={credentials.password}
          />

          <button type="submit">Log In</button>
        </article>
      </form>
    </main>
  );
}
