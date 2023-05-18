"use client";

import { useState, useEffect } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import SearchBar from "../components/form/search-bar";
import TextInput from "../components/form/text-input";
import Select from "../components/form/select";
import TextAreaInput from "../components/form/textarea";
import { toTitleCase } from "@/app/lib/text-utilities";
import "../components/form/form.css";

export default function formFactory(
  mediaItemFields,
  mediaType,
  formComponents,
  formType,
  id
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

      setMediaItem({
        ...mediaItem,
        [event.target.name]: event.target.value,
      });
    }

    function handleNewSubmit(event) {
      event.preventDefault();

      setAddingMediaItem(true);
      addMediaItem();
    }

    const fetchMediaItem = async () => {
      const fetchedMediaItem = await supabase
        .from(`${mediaType}s`)
        .select("*")
        .eq("id", id);

      const fetchedMediaItemState = {};

      Object.keys(fetchedMediaItem.data[0]).forEach((key) => {
        if (fetchedMediaItem.data[0][key] !== null) {
          fetchedMediaItemState[key] = fetchedMediaItem.data[0][key];
        } else {
          fetchedMediaItemState[key] = "";
        }
      });

      setMediaItem({
        ...mediaItem,
        ...fetchedMediaItemState,
      });
    };

    if (formType === "detail") {
      useEffect(() => {
        fetchMediaItem();
      }, []);
    }

    const addMediaItem = async () => {
      const newMediaItem = Object.assign(mediaItemFields, mediaItem);

      const filteredMediaItem = {};

      Object.keys(newMediaItem).forEach((key) => {
        if (newMediaItem[key] !== "") {
          filteredMediaItem[key] = newMediaItem[key];
        }
      });

      let response;

      if (formType === "new") {
        response = await supabase
          .from(`${mediaType}s`)
          .insert([filteredMediaItem])
          .select();
      } else {
        response = await supabase
          .from(`${mediaType}s`)
          .update(filteredMediaItem)
          .eq("id", id);
      }

      if (response.status === 201 || response.status === 204) {
        setAddingMediaItem(false);
        setMediaItemAdded(true);
        setError("");

        if (formType === "new")
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
      <form onSubmit={handleNewSubmit}>
        <article>
          <header>
            {formType === "new" ? (
              <SearchBar onClick={onSearchBarSuggestionClick} />
            ) : (
              <div>{mediaItem.title}</div>
            )}
          </header>

          <div className="image-container">
            <img src={mediaItem.imageUrl} alt="" />
          </div>

          {componentGroups.map((group, i) => {
            return <div className="grid">{group}</div>;
          })}

          <footer>
            <button
              type="submit"
              aria-busy={addingMediaItem}
              style={{ backgroundColor: mediaItemAdded ? "#77dd77" : "" }}
            >
              { formType === "new" ?  `Add ${toTitleCase(mediaType)}` : `Update ${toTitleCase(mediaType)}` }
            </button>
            {error ? <div className="error">Error: {error}</div> : ""}
          </footer>
        </article>
      </form>
    );
  }

  return Form;
}
