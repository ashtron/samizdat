const fetchTitles = async () => {
  let titles = await fetch("https://jsonplaceholder.typicode.com/albums");
  return titles.json();
}

export default async function BookForm() {
  const books = await fetchTitles();

  return (
    <form>
      <article>
        <header>
          <label htmlFor="book-search">Search</label>
          <input list="books" id="book-search" name="book-search" />

          <datalist id="books">
            {books.map((book) => {
              return <option key={book.id} value={book.title} />;
            })}
          </datalist>
        </header>

        <div className="grid">
          <label htmlFor="title">
            Title
            <input type="text" id="title" name="title" placeholder="Title" />
          </label>
          <label htmlFor="author">
            Author
            <input type="text" id="author" name="author" placeholder="Author" />
          </label>
          <label htmlFor="publication-date">
            Publication Date
            <input
              type="text"
              id="publication-date"
              name="publication-date"
              placeholder="Publication Date"
            />
          </label>
        </div>

        <div className="grid">
          <label htmlFor="genre">
            Genre
            <select name="genre" id="genre">
              <option value="mystery">Mystery</option>
              <option value="romance">Romance</option>
              <option value="literary-fiction">Literary Fiction</option>
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
              <option value="read">read</option>
              <option value="to-read">to-read</option>
              <option value="did-not-finish">did-not-finish</option>
            </select>
          </label>
        </div>

        <footer>
          <button type="submit">Add Book</button>
        </footer>
      </article>
    </form>
  );
}
