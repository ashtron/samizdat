"use client";

import { useState } from "react";

export default function AlbumForm() {
  const [state, setState] = useState({
    title: "",
    artist: "",
    releaseDate: "",
    genre: "",
    rating: "",
    notes: "",
    tag: "",
  });

  function handleChange(event) {
    event.preventDefault();

    setState({
      ...state,
      [event.target.name]: event.target.value,
    });

    console.log(state);
  }

  return (
    <form>
      <article>
        <header>
          <label htmlFor="search">Search for an album</label>
          <input type="text" name="search" id="search" />
        </header>

        <div className="grid">
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={state.title}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="artist">
            Artist
            <input
              type="text"
              id="artist"
              name="artist"
              placeholder="Artist"
              value={state.artist}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="release-date">
            Release Date
            <input
              type="text"
              id="release-date"
              name="releaseDate"
              placeholder="Release Date"
              value={state.releaseDate}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="grid">
          <label htmlFor="genre">
            Genre
            <select
              name="genre"
              id="genre"
              value={state.genre}
              onChange={handleChange}
            >
              <option value="indie-rock">Indie Rock</option>
              <option value="hip-hop-rap">Hip-Hop/Rap</option>
              <option value="Jazz">Jazz</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>

        <div className="grid">
          <label htmlFor="rating">
            Rating
            <select
              name="rating"
              id="rating"
              value={state.rating}
              onChange={handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
        </div>

        <div className="grid">
          <label htmlFor="notes">
            Notes
            <textarea
              name="notes"
              id="notes"
              rows="5"
              value={state.notes}
              onChange={handleChange}
            ></textarea>
          </label>
        </div>

        <label htmlFor="tag">
          Tag
          <select name="tag" id="tag" value={state.tag} onChange={handleChange}>
            <option value="listened">listened</option>
            <option value="to-listen">to-listen</option>
            <option value="did-not-finish">did-not-finish</option>
          </select>
        </label>

        <footer>
          <button type="submit">Add Album</button>
        </footer>
      </article>
    </form>
  );
}
