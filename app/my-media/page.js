import ImageSlider from "../components/image-slider";

export default function MyMediaPage() {
  const slides = [
    {
      url: "http://localhost:3000/test-covers/the-wind-up-bird-chronicle.jpg",
      title: "The Wind-Up Bird Chronicle",
    },
    {
      url: "http://localhost:3000/test-covers/desert-solitaire.jpg",
      title: "Desert Solitaire",
    },
    {
      url: "http://localhost:3000/test-covers/the-trial.jpeg",
      title: "The Trial",
    },
    {
      url: "http://localhost:3000/test-covers/structure-and-interpretation.jpg",
      title: "The Structure and Interpretation of Computer Programs",
    },
  ];

  return (
    <main className="container">
      <h1>My Media</h1>
      <div>
        <article>
          <header>My Books</header>
          <ImageSlider slides={slides} />
        </article>
        <article>
          <header>My Movies</header>
          {/* Here's where the movies go. */}
        </article>
        <article>
          <header>My Albums</header>
          {/* Here's where the albums go. */}
        </article>
      </div>
    </main>
  );
}
