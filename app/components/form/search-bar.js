"use client";

import "./search-bar.css";

export default function SearchBar() {
  function handleKeyDown(event) {
    event.preventDefault();

    if (event.keyCode === 13) {
      console.log("yep")
    }
  }

  return (
    <div className="search-box">
      <div className="row">
        <input type="text" id="input-box" autocomplete="off" onKeyDown={handleKeyDown} />
        <div className="results">
          <ul>
            <li>One</li>
            <li>And another</li>
          </ul>
        </div>
        <button>Search</button>
      </div>
    </div>
  );
}
