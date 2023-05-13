import ImageSlider from "../components/image-slider";
import { createClient } from "@supabase/supabase-js";

export default async function MyMediaPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const books = await supabase.from("books").select();

  const slides = books.data.map((book) => {
    return {
      id: book.id,
      title: book.title,
      imageUrl: book.image_url,
    };
  });

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
