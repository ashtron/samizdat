"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default async function PageProtector({ children }) {
  const supabase = createBrowserSupabaseClient();
  // const router = useRouter();

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const router = useRouter();
  }, []);

  // useEffect(() => {
  //   router.push("/");
  // }, [redirect]);

  const loggedIn = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return session ? true : false;
  };

  if (!(await loggedIn)) {
    setRedirect(true);
  }

  return (
    <PageProtector>
      <>{children}</>
    </PageProtector>
  );
}
