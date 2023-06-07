"use client";

import Link from "next/link";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const newMediaDropdown = useRef(null);

  const supabase = createBrowserSupabaseClient();
  const router = useRouter();

  const closeDropdown = () => {
    newMediaDropdown.current.open = false;
  };

  const signUp = () => {
    supabase.auth.signUp({
      email: "s391gm+7gxcbs14ly5yo@sharklasers.com",
      password: "123456789",
    });
  };

  const logIn = async () => {
    await supabase.auth.signInWithPassword({
      email: "s391gm+7gxcbs14ly5yo@sharklasers.com",
      password: "123456789",
    });

    router.push("/media");
  };

  const logOut = () => {
    supabase.auth.signOut();

    router.push("/");
  };

  const getSessionStatus = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log("session:", session);
  };

  const loggedIn = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return session ? true : false;
  };

  const testLoggedIn = async () => {
    console.log(await loggedIn());
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
          <Link href="/media">My Media</Link>
        </li>
        <li>
          <details role="list" ref={newMediaDropdown}>
            <summary aria-haspopup="listbox" role="button">
              Add New
            </summary>
            <ul role="listbox">
              {/* Manually close dropdown because the Links break
              the default behavior. */}
              <li onClick={closeDropdown}>
                <Link href="/books/new">Book</Link>
              </li>
              <li onClick={closeDropdown}>
                <Link href="/albums/new">Album</Link>
              </li>
              <li onClick={closeDropdown}>
                <Link href="/movies/new">Movie</Link>
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
              <li onClick={getSessionStatus}>Get Session Status</li>
              <li onClick={testLoggedIn}>Test Logged In</li>
            </ul>
          </details>
        </li>
      </ul>
    </nav>
  );
}
