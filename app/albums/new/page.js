"use client";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

import TextInput from "../../components/form/text-input";
import Select from "../../components/form/select";
import TextAreaInput from "../../components/form/textarea";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import loggedIn from "@/app/lib/auth-utilities";

import formFactory from "../../lib/form-factory";

export default async function AddAlbumPage({ params }) {
  const router = useRouter();

  useEffect(() => {
    async function protectPage() {
      if (!(await loggedIn())) {
        router.push("/");
      }
    }

    protectPage();
  }, []);

  const supabase = createBrowserSupabaseClient();

  const mediaItemFields = {
    title: "",
    artist: "",
    imageUrl: "",
    releaseDate: "",
    genre: "",
    rating: "",
    notes: "",
    tag: "",
  };

  const loggedIn = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return session ? true : false;
  };

  const formComponents = [
    [
      { component: TextInput, name: "title" },
      { component: TextInput, name: "artist" },
      { component: TextInput, name: "releaseDate" },
    ],
    [{ component: TextInput, name: "imageUrl" }],
    [
      {
        component: Select,
        name: "genre",
        options: ["", "Mystery", "Science Fiction", "Romance"],
      },
    ],
    [
      {
        component: Select,
        name: "rating",
        options: ["", "1", "2", "3", "4", "5"],
      },
    ],
    [{ component: TextAreaInput, name: "notes" }],
    [
      {
        component: Select,
        name: "tag",
        options: ["", "read", "to read", "did not finish"],
      },
    ],
  ];

  const Form = formFactory(mediaItemFields, "album", formComponents, "new");

  return (
    <main className="container">
      <h2>Add an album to your collection.</h2>
      <Form />
    </main>
  );
}
