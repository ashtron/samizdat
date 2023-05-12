"use client";

import "./search-bar.css";
import { useState, useEffect } from "react";

import Link from "next/link";

export default function SearchBar() {
  const [books, setBooks] = useState([]);
  const [booksLoaded, setBooksLoaded] = useState(false);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleKeyDown = async (event) => {
    const fetchBooks = async () => {
      let books = await fetch(
        `https://openlibrary.org/search.json?q=${text.replaceAll(" ", "+")}`
      );
      let parsedBooks = await books.json();
      let docs = parsedBooks.docs;

      setBooks(docs.slice(0, 11));
    };

    if (event.keyCode === 13) {
      event.preventDefault();
      fetchBooks();
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
  }, [books]);

  return (
    <div className="search-bar">
      <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={text}
      />
      <ul>
        {suggestions &&
          suggestions.map((suggestion, i) => {
            return (
              <li key={suggestion.key}>
                <Link href={`https://openlibrary.org${suggestion.key}`}>
                  {suggestion.title}, {suggestion.author_name}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
