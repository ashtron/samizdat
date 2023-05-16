"use client";

import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

import SearchBar from "./search-bar";
import TextInput from "./text-input";
import Select from "./select";
import TextAreaInput from "./textarea";

export default function BookForm() {
  const supabase = createBrowserSupabaseClient();

  const [state, setState] = useState({
    title: "",
    author: "",
    imageUrl: "",
    publicationDate: "",
    genre: "",
    rating: "",
    notes: "",
    tag: "",
  });

  function handleChange(event) {
    event.preventDefault();

    setState({
      ...state,
      [event.target.name]: event.target.value,
    });

    console.log(state);
  }

  function handleSubmit(event) {
    event.preventDefault();

    addBook();
  }

  const addBook = async () => {
    const newBook = {
      title: state.title,
      author: state.author,
      imageUrl: state.imageUrl,
      publicationDate: state.publicationDate,
      genre: state.genre,
      rating: state.rating,
      notes: state.notes,
      tag: state.tag,
    };

    const filteredBook = {};

    Object.keys(newBook).forEach((key) => {
      if (newBook[key] !== "") {
        filteredBook[key] = newBook[key];
      }
    });

    console.log(filteredBook);

    await supabase.from("books").insert([filteredBook]);
  };

  const onSearchBarSuggestionClick = (suggestion) => {
    state.title = setState({
      ...state,
      title: suggestion.title,
      author: suggestion.author_name[0],
      publicationDate: suggestion.first_publish_year,
      imageUrl: `https://covers.openlibrary.org/b/id/${suggestion.cover_i}-M.jpg`,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <article>
        <header>
          <header>
            <SearchBar onClick={onSearchBarSuggestionClick} />
          </header>
        </header>

        <div className="grid">
          <TextInput
            name="title"
            handleChange={handleChange}
            value={state.title}
          />
          <TextInput
            name="author"
            handleChange={handleChange}
            value={state.author}
          />
          <TextInput
            name="publicationDate"
            handleChange={handleChange}
            value={state.publicationDate}
          />
        </div>

        <div className="grid">
          <TextInput
            name="imageUrl"
            handleChange={handleChange}
            value={state.imageUrl}
          />
        </div>

        <div className="grid">
          <Select
            name="genre"
            handleChange={handleChange}
            value={state.genre}
            options={["Mystery", "Science Fiction", "Romance"]}
          />
        </div>

        <div className="grid">
          <Select
            name="rating"
            handleChange={handleChange}
            value={state.rating}
            options={["1", "2", "3", "4", "5"]}
          />
        </div>

        <div className="grid">
          <TextAreaInput
            name="notes"
            handleChange={handleChange}
            value={state.notes}
          />
        </div>

        <div className="grid">
          <Select
            name="tag"
            handleChange={handleChange}
            value={state.tag}
            options={["read", "to read", "did not finish"]}
          />
        </div>

        <footer>
          <button type="submit">Add Book</button>
        </footer>
      </article>
    </form>
  );
}
