"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const Context = createContext(undefined);

export default function SupabaseProvider({ children, session }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();

  // useEffect(() => {
  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange(() => {
  //     router.refresh();
  //   });

  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [router, supabase]);

  return (
    <SessionContextProvider value={{ supabase, session }}>
      <>{children}</>
    </SessionContextProvider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }

  return context;
};
