"use client";

export default function BookDetail() {
  const handleSubmit = () => {
    console.log("submit...HANDLED");
  }

  return (
    <main className="container">
      <form onSubmit={handleSubmit}>
        <article>
          <header>Title</header>
          <footer>
            <button type="submit">Add Book</button>
          </footer>
        </article>
      </form>
    </main>
  );
}
