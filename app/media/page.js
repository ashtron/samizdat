"use client";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { headers, cookies } from "next/dist/client/components/headers";

import ImageSlider from "../components/image-slider";
import loggedIn from "../lib/auth-utilities";

export default async function MyMediaPage() {
  const router = useRouter();

  useEffect(() => {
    async function protectPage() {
      if (!await loggedIn()) {
        router.push("/");
      }
    }
    
    protectPage();
  }, []);

  const supabase = createBrowserSupabaseClient();

  const books = await supabase.from("books").select();
  const movies = await supabase.from("movies").select();
  const albums = await supabase.from("albums").select();

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

  const albumSlides = albums.data.map((movie) => {
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
          {albumSlides.length === 0 ? <button aria-busy="true"></button> : <ImageSlider slides={albumSlides} />}
        </article>
      </div>
    </main>
  );
}
