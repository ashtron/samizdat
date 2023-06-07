import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function loggedIn() {
  const supabase = createBrowserSupabaseClient();
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session ? true : false;
}

export async function getSession() {
  const supabase = createBrowserSupabaseClient();
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}
