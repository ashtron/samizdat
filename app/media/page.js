import ImageSlider from "../components/image-slider";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/dist/client/components/headers";

export default async function MyMediaPage() {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies
  });

  const books = await supabase.from("books").select();
  const movies = await supabase.from("movies").select();

  const bookSlides = books.data.map((book) => {
    return {
      id: book.id,
      title: book.title,
      imageUrl: book.imageUrl,
    };
  });

  const movieSlides = movies.data.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      imageUrl: movie.imageUrl,
    };
  });

  return (
    <main className="container">
      <h1>My Media</h1>
      <div>
        <article>
          <header>My Books</header>
          {bookSlides.length === 0 ? <button aria-busy="true"></button> : <ImageSlider slides={bookSlides} />}
        </article>
        <article>
          <header>My Movies</header>
          {movieSlides.length === 0 ? <button aria-busy="true"></button> : <ImageSlider slides={movieSlides} />}
        </article>
        <article>
          <header>My Albums</header>
          {/* Here's where the albums go. */}
        </article>
      </div>
    </main>
  );
}
