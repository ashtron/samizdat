"use client";

import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import SearchBar from "./search-bar";
import TextInput from "./text-input";
import Select from "./select";
import TextAreaInput from "./textarea";
import { toTitleCase } from "@/app/lib/text-utilities";
import "./form.css";

export default function formFactory(
  mediaItemFields,
  mediaType,
  formComponents
) {
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

      setAddingMediaItem(true);
      addMediaItem();
    }

    const addMediaItem = async () => {
      const newMediaItem = Object.assign(mediaItemFields, mediaItem);

      const filteredMediaItem = {};

      Object.keys(newMediaItem).forEach((key) => {
        if (newMediaItem[key] !== "") {
          filteredMediaItem[key] = newMediaItem[key];
        }
      });

      const response = await supabase
        .from(`${mediaType}s`)
        .insert([filteredMediaItem])
        .select();

      if (response.status === 201) {
        setAddingMediaItem(false);
        setMediaItemAdded(true);
        setError("");
        router.push(`/${mediaType}s/${response.data[0].id}`);
      } else {
        setError(response.error.message);
        setAddingMediaItem(false);
        setMediaItemAdded(false);
      }
    };

    const generateCoverImage = (suggestion) => {
      switch (mediaType) {
        case "book":
          return suggestion.cover_i
            ? `https://covers.openlibrary.org/b/id/${suggestion.cover_i}-M.jpg`
            : "";
          break;
        case "movie":
          return "";
        case "album":
          return "";
      }
    };

    const populateSuggestedFields = (suggestion) => {
      const imageUrl = generateCoverImage(suggestion);

      switch (mediaType) {
        case "book":
          setMediaItem({
            ...mediaItem,
            title: suggestion.title,
            author: suggestion.author_name[0],
            publicationDate: suggestion.first_publish_year,
            imageUrl: imageUrl,
          });
          break;
        case "movie":
          return "";
        case "album":
          return "";
      }
    };

    const onSearchBarSuggestionClick = (suggestion) => {
      setMediaItemAdded(false);
      populateSuggestedFields(suggestion);
    };

    const generateComponentGroups = () => {
      const componentGroups = [];

      formComponents.forEach((section) => {
        const componentGroup = [];

        section.forEach((componentData) => {
          const options = componentData.options;

          componentGroup.push(
            <componentData.component
              name={componentData.name}
              handleChange={handleChange}
              value={mediaItem[componentData.name]}
              options={options}
            />
          );
        });

        componentGroups.push(componentGroup);
      });

      return componentGroups;
    };

    const componentGroups = generateComponentGroups();

    return (
      <form onSubmit={handleSubmit}>
        <article>
          <header>
            <SearchBar onClick={onSearchBarSuggestionClick} />
          </header>

          <div className="image-container">
            <img src={mediaItem.imageUrl} alt="" />
          </div>

          {componentGroups.map((group) => {
            return <div className="grid">{group}</div>;
          })}

          <footer>
            <button
              type="submit"
              aria-busy={addingMediaItem}
              style={{ backgroundColor: mediaItemAdded ? "#77dd77" : "" }}
            >
              Add {toTitleCase(mediaType)}
            </button>
            {error ? <div className="error">Error: {error}</div> : ""}
          </footer>
        </article>
      </form>
    );
  }

  return Form;
}
