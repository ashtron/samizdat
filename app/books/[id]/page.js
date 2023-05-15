"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

import SearchBar from "@/app/components/form/search-bar";
import TextInput from "@/app/components/form/text-input";
import TextAreaInput from "@/app/components/form/textarea";
import Select from "@/app/components/form/select";

export default function BookDetail({ params }) {
  const supabase = createBrowserSupabaseClient();

  const { id } = params;

  const fetchBook = async () => {
    const book = await supabase.from("books").select("*").eq("id", id);
    const stateObject = {};
    Object.keys(book.data[0]).forEach((key) => {
      if (book.data[0][key] !== null) {
        stateObject[key] = book.data[0][key];
      }
    });

    setState({
      ...state,
      ...stateObject,
    });

    console.log("STATE:", state);
  };

  useEffect(() => {
    fetchBook();
  }, []);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newDetails = {
      title: state.title,
      author: state.author,
      image_url: state.imageUrl,
      publication_date: state.publicationDate,
      genre: state.genre,
      rating: state.rating,
      notes: state.notes,
      tag: state.tag,
    };

    const filteredDetails = {};

    Object.keys(newDetails).forEach((key) => {
      if (newDetails[key] !== "") {
        filteredDetails[key] = newDetails[key];
      }
    });

    console.log(filteredDetails);

    const { data, error } = await supabase
      .from("books")
      .update(filteredDetails)
      .eq("id", id);
  };

  const deleteBook = async () => {
    const { data, error } = await supabase
      .from("books")
      .delete()
      .eq("id", id);
  };

  function handleChange(event) {
    event.preventDefault();

    setState({
      ...state,
      [event.target.name]: event.target.value,
    });

    console.log(state);
  }

  return (
    <form onSubmit={handleSubmit}>
      <article>
        <header>
          <TextInput
            name="title"
            handleChange={handleChange}
            value={state.title}
          />
        </header>

        <div className="grid">
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
          <button type="submit">
            Update Details
          </button>
          <button type="submit" onClick={deleteBook}>
            Delete Book
          </button>
        </footer>
      </article>
    </form>
  );
}
