"use client";

import "./search-bar.css";
import { useState, useEffect } from "react";

export default function SearchBar({ onClick, mediaType }) {
  const [mediaItems, setMediaItems] = useState([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const handleKeyDown = async (event) => {
    const fetchMediaItems = async () => {
      let mediaItems;

      let query = text.replaceAll(" ", "+");
      let parsedMediaItems;
      let results;

      switch (mediaType) {
        case "book":
          mediaItems = await fetch(
            `https://openlibrary.org/search.json?q=${query}`
          );

          parsedMediaItems = await mediaItems.json();
          results = parsedMediaItems.docs;
          break;
        case "movie":
          mediaItems = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}`
          );

          parsedMediaItems = await mediaItems.json();
          results = parsedMediaItems.results;
          break;
        case "album":
          mediaItems = await fetch(
            `https://api.discogs.com/database/search?q=${query}&key=${process.env.NEXT_PUBLIC_DISCOGS_KEY}&secret=${process.env.NEXT_PUBLIC_DISCOGS_SECRET}&format=album`
          );

          parsedMediaItems = await mediaItems.json();
          results = parsedMediaItems.results;
          break;
      }

      setMediaItems(results.slice(0, 10));
    };

    if (event.keyCode === 13) {
      event.preventDefault();

      if (text.length > 0) {
        setSuggestions([]);
        setSuggestionsLoading(true);
        fetchMediaItems();
      }
    } else if (event.keyCode === 27) {
      setSuggestionsOpen(false);
    }
  };

  const handleChange = async (event) => {
    event.preventDefault();

    const newText = event.target.value;
    setText(newText);
  };

  useEffect(() => {
    let matches = [];

    if (text.length > 0) {
      matches = mediaItems.filter((mediaItem) => {
        const regex = new RegExp(`${text}`, "gi");
        return mediaItem.title.match(regex);
      });
    }

    setSuggestions(matches);
    setSuggestionsLoading(false);
  }, [mediaItems]);

  return (
    <div className="search-bar">
      <details role="list" open={suggestionsOpen}>
        <summary>
          <input
            type="text"
            name="search-input"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={text}
            className="search-input"
            onClick={() => setSuggestionsOpen(true)}
            placeholder="Search by title"
          />
        </summary>
        <ul role="listbox">
          {suggestionsLoading ? (
            <li className="loading" aria-busy="true"></li>
          ) : (
            ""
          )}
          {suggestions &&
            suggestions.map((suggestion, i) => {
              return (
                <li
                  key={suggestion.key}
                  onClick={() => {
                    onClick(suggestion);
                    setSuggestionsOpen(false);
                  }}
                >
                  <a>
                    {suggestion.title}, {suggestion.author_name}
                  </a>
                </li>
              );
            })}
        </ul>
      </details>
    </div>
  );
}
