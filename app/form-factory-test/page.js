"use client";

import formFactory from "../components/form/form-factory";

export default function FormFactoryTest() {
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

  const Form = formFactory(mediaItemFields, "books");

  return <div>{<Form />}</div>;
}
