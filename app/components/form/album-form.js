export default function MovieForm() {
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
            <input type="text" id="title" name="title" placeholder="Title" />
          </label>
          <label htmlFor="artist">
            Artist
            <input type="text" id="artist" name="artist" placeholder="Artist" />
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

        <label htmlFor="tag">
          Tag
          <select name="tag" id="tag">
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
