"use client";

import SearchBar from "./search-bar";

export default function MovieForm() {
  function handleKeyDown(event) {
    event.preventDefault();

    if (event.keyCode === 13) {
      console.log("yep")
    }
  }

  return (
    <form>
      <article>
        <header>
          <div className="search-box">
            <div className="row">
              <input
                type="text"
                id="input-box"
                autoComplete="off"
                onKeyDown={handleKeyDown}
              />
              <div className="results">
                <ul>
                  <li>One</li>
                  <li>And another</li>
                </ul>
              </div>
              <button>Search</button>
            </div>
          </div>
        </header>

        <div className="grid">
          <label htmlFor="title">
            Title
            <input type="text" id="title" name="title" placeholder="Title" />
          </label>
          <label htmlFor="director">
            Director
            <input
              type="text"
              id="director"
              name="director"
              placeholder="Director"
            />
          </label>
          <label htmlFor="release-date">
            Release Date
            <input
              type="text"
              id="release-date"
              name="release-date"
              placeholder="Release Date"
            />
          </label>
        </div>

        <div className="grid">
          <label htmlFor="genre">
            Genre
            <select name="genre" id="genre">
              <option value="mystery">Mystery</option>
              <option value="romance">Romance</option>
              <option value="action">Literary Fiction</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>

        <div className="grid">
          <label htmlFor="rating">
            Rating
            <select name="rating" id="rating">
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
            <textarea name="notes" id="notes" rows="5"></textarea>
          </label>
        </div>

        <div className="grid">
          <label htmlFor="tag">
            Tag
            <select name="tag" id="tag">
              <option value="watch">watch</option>
              <option value="to-watch">to-watch</option>
              <option value="did-not-finish">did-not-finish</option>
            </select>
          </label>
        </div>

        <footer>
          <button type="submit">Add Movie</button>
        </footer>
      </article>
    </form>
  );
}
