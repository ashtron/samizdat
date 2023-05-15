"use client";

import { useState } from "react";
import SearchBar from "./search-bar";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

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
      image_url: state.imageUrl,
      publication_date: state.publicationDate,
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

    console.log(suggestion.author_name);
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
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={state.title}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="author">
            Author
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Author"
              value={state.author}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="publication-date">
            Publication Date
            <input
              type="text"
              id="publication-date"
              name="publicationDate"
              placeholder="Publication Date"
              value={state.publicationDate}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="grid">
          <label htmlFor="imageUrl">
            Image URL
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              placeholder="Image URL"
              value={state.imageUrl}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="grid">
          <label htmlFor="genre">
            Genre
            <select
              name="genre"
              id="genre"
              value={state.genre}
              onChange={handleChange}
            >
              <option value="mystery">Mystery</option>
              <option value="romance">Romance</option>
              <option value="literary-fiction">Literary Fiction</option>
            </select>
          </label>
        </div>

        <div className="grid">
          <label htmlFor="rating">
            Rating
            <select
              name="rating"
              id="rating"
              value={state.rating}
              onChange={handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
        </div>

        <div className="grid">
          <label htmlFor="notes">
            Notes
            <textarea
              name="notes"
              id="notes"
              rows="5"
              value={state.notes}
              onChange={handleChange}
            ></textarea>
          </label>
        </div>

        <div className="grid">
          <label htmlFor="tag">
            Tag
            <select
              name="tag"
              id="tag"
              value={state.tag}
              onChange={handleChange}
            >
              <option value="read">read</option>
              <option value="to-read">to-read</option>
              <option value="did-not-finish">did-not-finish</option>
            </select>
          </label>
        </div>

        <footer>
          <button type="submit">Add Book</button>
        </footer>
      </article>
    </form>
  );
}
