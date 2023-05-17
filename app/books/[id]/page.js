"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

import TextInput from "@/app/components/form/text-input";
import TextAreaInput from "@/app/components/form/textarea";
import Select from "@/app/components/form/select";
import "./book-detail.css";

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

  const [error, setError] = useState("");
  const [updatingDetails, setUpdatingDetails] = useState(false);
  const [detailsUpdated, setDetailsUpdated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setUpdatingDetails(true);

    const newDetails = {
      title: state.title,
      author: state.author,
      imageUrl: state.imageUrl,
      publicationDate: state.publicationDate,
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

    const response = await supabase
      .from("books")
      .update(filteredDetails)
      .eq("id", id);

    if (response.status === 204) {
      setUpdatingDetails(false);
      setDetailsUpdated(true);
      setError("");
    } else {
      console.log(response.error.message)
      setError(response.error.message);
      setUpdatingDetails(false);
      setDetailsUpdated(false);
    }
  };

  const deleteBook = async () => {
    const { data, error } = await supabase.from("books").delete().eq("id", id);
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

        <div className="image-container">
          <img src={state.imageUrl} alt="" />
        </div>

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
            options={["", "Mystery", "Science Fiction", "Romance"]}
          />
        </div>

        <div className="grid">
          <Select
            name="rating"
            handleChange={handleChange}
            value={state.rating}
            options={["", "1", "2", "3", "4", "5"]}
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
            options={["", "read", "to read", "did not finish"]}
          />
        </div>

        <footer>
          <footer>
            <button
              type="submit"
              aria-busy={updatingDetails}
              style={{ backgroundColor: detailsUpdated ? "#77dd77" : "" }}
            >
              Update Details
            </button>
          </footer>
          <button type="submit" onClick={deleteBook}>
            Delete Book
          </button>
          {error ? <div className="error">Error: {error}</div> : ""}
        </footer>
      </article>
    </form>
  );
}
