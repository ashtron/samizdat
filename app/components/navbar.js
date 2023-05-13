"use client";

import Link from "next/link";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";

export default async function Navbar() {
  const supabase = createBrowserSupabaseClient();

  const signUp = () => {
    supabase.auth.signUp({
      email: "s391gm+7gxcbs14ly5yo@sharklasers.com",
      password: "123456789",
    });
  };

  const logIn = () => {
    supabase.auth.signInWithPassword({
      email: "s391gm+7gxcbs14ly5yo@sharklasers.com",
      password: "123456789",
    });
  };

  const logOut = () => {
    supabase.auth.signOut();
  };

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <strong>SAMIZDAT</strong>
          </Link>
        </li>
      </ul>

      <ul>
        <li>
          <Link href="/my-media">My Media</Link>
        </li>
        <li>
          <details role="list">
            <summary aria-haspopup="listbox" role="button">
              Add New
            </summary>
            <ul role="listbox">
              <li>
                <Link href="/add-book">Book</Link>
              </li>
              <li>
                <Link href="/add-album">Album</Link>
              </li>
              <li>
                <Link href="/add-movie">Movie</Link>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details role="list">
            <summary aria-haspopup="listbox" role="button">
              Auth
            </summary>
            <ul role="listbox">
              <li onClick={signUp}>Sign Up</li>
              <li onClick={logIn} role="button">
                Log In
              </li>
              <li onClick={logOut}>Log Out</li>
            </ul>
          </details>
        </li>
      </ul>
    </nav>
  );
}
