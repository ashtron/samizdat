"use client";

import "./search-bar.css";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const [books, setBooks] = useState([]);
  const [booksLoaded, setBooksLoaded] = useState(false);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (event) => {
    event.preventDefault();

    const newText = event.target.value;

    setText(newText);
  };

  useEffect(() => {
    const loadBooks = async () => {
      let books = await fetch("https://jsonplaceholder.typicode.com/albums");
      let parsedBooks = await books.json();

      setBooks(parsedBooks.slice(0, 7));
      setBooksLoaded(true);
    };

    if (!booksLoaded) loadBooks();
  });

  useEffect(() => {
    let matches = [];

    if (text.length > 0) {
      matches = books.filter((book) => {
        const regex = new RegExp(`${text}`, "gi");
        return book.title.match(regex);
      });
    }

    setSuggestions(matches);
  }, [text]);

  return (
    <div className="search-bar">
      <input type="text" onChange={handleChange} value={text} />
      <ul>
        {suggestions &&
          suggestions.map((suggestion, i) => {
            return <li key={i}>{suggestion.title}</li>;
          })}
      </ul>
    </div>
  );
}
