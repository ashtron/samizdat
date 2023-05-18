"use client";

import TextInput from "../../components/form/text-input";
import Select from "../../components/form/select";
import TextAreaInput from "../../components/form/textarea";

import formFactory from "../../lib/form-factory";

export default function AddAlbumPage({ params }) {
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

  const Form = formFactory(mediaItemFields, "album", formComponents, "new");

  return (
    <main className="container">
      <h2>Add an album to your collection.</h2>
      <Form />
    </main>
  );
}