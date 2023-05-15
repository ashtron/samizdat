import ImageSlider from "../components/image-slider";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/dist/client/components/headers";

export default async function MyMediaPage() {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies
  });

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
          {slides.length === 0 ? <button aria-busy="true"></button> : <ImageSlider slides={slides} />}
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
