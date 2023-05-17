"use client";

import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import SearchBar from "./search-bar";
import TextInput from "./text-input";
import Select from "./select";
import TextAreaInput from "./textarea";
import "./book-form.css";

export default function formFactory(mediaItemFields, mediaType) {
  function Form() {
    const supabase = createBrowserSupabaseClient();
    const router = useRouter();

    const [mediaItem, setMediaItem] = useState({
      ...mediaItemFields,
    });

    const [addingMediaItem, setAddingMediaItem] = useState(false);
    const [mediaItemAdded, setMediaItemAdded] = useState(false);
    const [error, setError] = useState("");

    function handleChange(event) {
      event.preventDefault();

      setState({
        ...mediaItem,
        [event.target.name]: event.target.value,
      });
    }

    function handleSubmit(event) {
      event.preventDefault();

      console.log(mediaItem);

      setAddingMediaItem(true);
      addMediaItem();
    }

    const addMediaItem = async () => {
      // const newMediaItem = {
      //   title: state.title,
      //   author: state.author,
      //   imageUrl: state.imageUrl,
      //   publicationDate: state.publicationDate,
      //   genre: state.genre,
      //   rating: state.rating,
      //   notes: state.notes,
      //   tag: state.tag,
      // };

      const newMediaItem = Object.assign(mediaItemFields, mediaItem);

      const filteredMediaItem = {};

      Object.keys(newMediaItem).forEach((key) => {
        if (newMediaItem[key] !== "") {
          filteredMediaItem[key] = newMediaItem[key];
        }
      });

      const response = await supabase
        .from(mediaType)
        .insert([filteredMediaItem])
        .select();

      if (response.status === 201) {
        setAddingMediaItem(false);
        setMediaItemAdded(true);
        setError("");
        router.push(`/${mediaType}/${response.data[0].id}`);
      } else {
        setError(response.error.message);
        setAddingMediaItem(false);
        setMediaItemAdded(false);
      }
    };

    // Needs generalizing.
    const onSearchBarSuggestionClick = (suggestion) => {
      setMediaItemAdded(false);

      const imageUrl = suggestion.cover_i
        ? `https://covers.openlibrary.org/b/id/${suggestion.cover_i}-M.jpg`
        : "";

      setMediaItem({
        ...mediaItem,
        title: suggestion.title,
        author: suggestion.author_name[0],
        publicationDate: suggestion.first_publish_year,
        imageUrl: imageUrl,
      });
    };

    // Needs generalizing.
    return (
      <form onSubmit={handleSubmit}>
        <article>
          <header>
            <header>
              <SearchBar onClick={onSearchBarSuggestionClick} />
            </header>
          </header>

          <div className="image-container">
            <img src={mediaItem.imageUrl} alt="" />
          </div>

          <div className="grid">
            <TextInput
              name="title"
              handleChange={handleChange}
              value={mediaItem.title}
            />
            <TextInput
              name="author"
              handleChange={handleChange}
              value={mediaItem.author}
            />
            <TextInput
              name="publicationDate"
              handleChange={handleChange}
              value={mediaItem.publicationDate}
            />
          </div>

          <div className="grid">
            <TextInput
              name="imageUrl"
              handleChange={handleChange}
              value={mediaItem.imageUrl}
            />
          </div>

          <div className="grid">
            <Select
              name="genre"
              handleChange={handleChange}
              value={mediaItem.genre}
              options={["", "Mystery", "Science Fiction", "Romance"]}
            />
          </div>

          <div className="grid">
            <Select
              name="rating"
              handleChange={handleChange}
              value={mediaItem.rating}
              options={["", "1", "2", "3", "4", "5"]}
              defaultValue={-1}
            />
          </div>

          <div className="grid">
            <TextAreaInput
              name="notes"
              handleChange={handleChange}
              value={mediaItem.notes}
            />
          </div>

          <div className="grid">
            <Select
              name="tag"
              handleChange={handleChange}
              value={mediaItem.tag}
              options={["", "read", "to read", "did not finish"]}
            />
          </div>

          <footer>
            <button
              type="submit"
              aria-busy={addingMediaItem}
              style={{ backgroundColor: mediaItemAdded ? "#77dd77" : "" }}
            >
              Add Book
            </button>
            {error ? <div className="error">Error: {error}</div> : ""}
          </footer>
        </article>
      </form>
    );
  }

  return Form;
}
