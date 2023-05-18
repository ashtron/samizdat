"use client";

import { useState, useEffect } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import SearchBar from "../components/form/search-bar";
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
          return suggestion.poster_path
            ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${suggestion.poster_path}`
            : "";
          break;
        case "album":
          return suggestion.cover_image;
          break;
      }
    };

    const fetchDirectorName = async (suggestion) => {
      const credits = await fetch(
        `https://api.themoviedb.org/3/movie/${suggestion.id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );

      const parsedCredits = await credits.json();

      const director = parsedCredits.crew.filter((crewMember) => {
        return crewMember.job === "Director";
      })[0].name;

      return director;
    };

    const fetchArtistName = async (suggestion) => {
      const albumDetails = await fetch(
        `https://api.discogs.com/masters/${suggestion.id}?key=${process.env.NEXT_PUBLIC_DISCOGS_KEY}&secret=${process.env.NEXT_PUBLIC_DISCOGS_SECRET}`
      );

      const parsedAlbumDetails = await albumDetails.json();

      return parsedAlbumDetails.artists[0].name;
    }

    const populateSuggestedFields = async (suggestion) => {
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
          setMediaItem({
            ...mediaItem,
            title: suggestion.title,
            director: await fetchDirectorName(suggestion),
            releaseDate: suggestion.release_date,
            imageUrl: imageUrl,
          });
          break;
        case "album":
          const [artist, title] = suggestion.title.split(" - ");
          console.log("DKFJSK", suggestion)

          setMediaItem({
            ...mediaItem,
            title: title,
            artist: artist,
            releaseDate: suggestion.year,
            imageUrl: imageUrl,
          });
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
              <SearchBar
                onClick={onSearchBarSuggestionClick}
                mediaType={mediaType}
              />
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
              {formType === "new"
                ? `Add ${toTitleCase(mediaType)}`
                : `Update ${toTitleCase(mediaType)}`}
            </button>
            {error ? <div className="error">Error: {error}</div> : ""}
          </footer>
        </article>
      </form>
    );
  }

  return Form;
}
