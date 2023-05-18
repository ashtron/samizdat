"use client";

import TextInput from "../../components/form/text-input";
import Select from "../../components/form/select";
import TextAreaInput from "../../components/form/textarea";

import formFactory from "../../components/form/form-factory";

export default function FormFactoryTest({ params }) {
  const { id } = params;
  
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

  return <div>{<Form />}</div>;
}
