"use client";

import TextInput from "../../components/form/text-input";
import Select from "../../components/form/select";
import TextAreaInput from "../../components/form/textarea";
import formFactory from "../../lib/form-factory";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import loggedIn from "@/app/lib/auth-utilities";

export default function UpdateBookPage({ params }) {
  const router = useRouter();

  useEffect(() => {
    async function protectPage() {
      if (!await loggedIn()) {
        router.push("/");
      }
    }
    
    protectPage();
  }, []);

  const id = params ? params.id : "";
  
  const mediaItemFields = {
    title: "",
    author: "",
    imageUrl: "",
    publicationDate: "",
    genre: "",
    rating: "",
    notes: "",
    tag: "",
  };

  const formComponents = [
    [
      { component: TextInput, name: "title" },
      { component: TextInput, name: "author" },
      { component: TextInput, name: "publicationDate" },
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
    [ { component: TextAreaInput, name: "notes"} ],
    [
      {
        component: Select,
        name: "tag",
        options: ["", "read", "to read", "did not finish"],
      },
    ],
  ];

  const Form = formFactory(mediaItemFields, "book", formComponents, "detail", id);

  return <Form />;
}