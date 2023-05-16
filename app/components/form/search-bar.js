"use client";

import "./search-bar.css";
import { useState, useEffect } from "react";

import Link from "next/link";

export default function SearchBar({ onClick }) {
  const [books, setBooks] = useState([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const handleKeyDown = async (event) => {
    const fetchBooks = async () => {
      let books = await fetch(
        `https://openlibrary.org/search.json?q=${text.replaceAll(" ", "+")}`
      );
      let parsedBooks = await books.json();
      let docs = parsedBooks.docs;

      setBooks(docs.slice(0, 10));
    };

    if (event.keyCode === 13) {
      event.preventDefault();

      if (text.length > 0) {
        setSuggestions([]);
        setSuggestionsLoading(true);
        fetchBooks();
      }
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
      matches = books.filter((book) => {
        const regex = new RegExp(`${text}`, "gi");
        return book.title.match(regex);
      });
    }

    setSuggestions(matches);
    setSuggestionsLoading(false);
  }, [books]);

  return (
    <div className="search-bar">
      <details
        role="list"
        open={suggestionsOpen}
        onClick={(event) => event.preventDefault()}
      >
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

{
  /* <details role="list">
  <summary aria-haspopup="listbox" role="button" class="secondary">
    Theme
  </summary>
  <ul role="listbox">
    <li>
      <a href="#" data-theme-switcher="auto">
        Auto
      </a>
    </li>
    <li>
      <a href="#" data-theme-switcher="light">
        Light
      </a>
    </li>
    <li>
      <a href="#" data-theme-switcher="dark">
        Dark
      </a>
    </li>
  </ul>
</details>; */
}

// {suggestions &&
//   suggestions.map((suggestion, i) => {
//     return (
//       <li key={suggestion.key} onClick={() => onClick(suggestion)}>
//         <input
//           className="suggestion"
//           type="text"
//           placeholder={suggestion.title + ", " + suggestion.author_name}
//           onClick={(event) => { event.preventDefault() }}
//         />
//       </li>
//     );
//   })}

{
  /* <details role="list">
  <summary aria-haspopup="listbox">
    <label htmlFor="search-input">Search by Title</label>
    <input
      type="text"
      name="search-input"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={text}
    />
  </summary>

  <ul role="listbox">
    {suggestionsLoading ? (
      <button className="loading" aria-busy="true"></button>
    ) : (
      ""
    )}
    {suggestions &&
      suggestions.map((suggestion, i) => {
        return (
          <li key={suggestion.key} onClick={() => onClick(suggestion)}>
            {suggestion.title}, {suggestion.author_name}
          </li>
        );
      })}
  </ul>
</details>; */
}
