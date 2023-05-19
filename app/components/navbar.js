"use client";

import Link from "next/link";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export default function Navbar() {
  const supabase = createBrowserSupabaseClient();

  const [open, setOpen] = useState(false);

  const openDropdown = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const closeDropdown = (event) => {
    event.preventDefault();
    setOpen(false);
  };

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
          <Link href="/media">My Media</Link>
        </li>
        <li>
          <details role="list" open={open}>
            <summary
              aria-haspopup="listbox"
              role="button"
              onClick={openDropdown}
            >
              Add New
            </summary>
            <ul role="listbox">
              <li onClick={closeDropdown}>
                <Link href="/books/new">Book</Link>
              </li>
              <li onClick={closeDropdown}>
                <Link href="/movies/new">Album</Link>
              </li>
              <li onClick={closeDropdown}>
                <Link href="/albums/new">Movie</Link>
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
