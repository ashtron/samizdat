"use client";

import TextInput from "../../components/form/text-input";
import Select from "../../components/form/select";
import TextAreaInput from "../../components/form/textarea";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import loggedIn from "@/app/lib/auth-utilities";

import formFactory from "../../lib/form-factory";

export default function AddMoviePage({ params }) {
  const router = useRouter();

  useEffect(() => {
    async function protectPage() {
      if (!await loggedIn()) {
        router.push("/");
      }
    }
    
    protectPage();
  }, []);

  const mediaItemFields = {
    title: "",
    director: "",
    imageUrl: "",
    releaseDate: "",
    genre: "",
    rating: "",
    notes: "",
    tag: "",
  };

  const formComponents = [
    [
      { component: TextInput, name: "title" },
      { component: TextInput, name: "director" },
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

  const Form = formFactory(mediaItemFields, "movie", formComponents, "new");

  return (
    <main className="container">
      <h2>Add a movie to your collection.</h2>
      <Form />
    </main>
  );
}