export default function AddBookPage() {
  return (
    <main className="container">
      <h2>Add a book to your collection.</h2>
      <form>
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

        <button type="submit">Add Book</button>
      </form>
    </main>
  );
}
