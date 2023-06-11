"use client";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import ImageSlider from "../components/image-slider";
import loggedIn from "../lib/auth-utilities";

export default async function MyMediaPage() {
  const router = useRouter();

  const [user, setUser] = useState({});
  const [mediaItems, setMediaItems] = useState({});
  const [slides, setSlides] = useState({ books: {}, movies: {}, albums: {} });

  useEffect(() => {
    async function protectPage() {
      if (!(await loggedIn())) {
        router.push("/");
      }
    }

    protectPage();
  }, []);

  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    async function getUser() {
      const user = (await getSession()).user;
      setUser(user);
    }

    getUser();
  }, []);

  useEffect(() => {
    async function fetchMediaItems() {
      const books = await supabase
        .from("books")
        .select()
        .eq("user_id", user.id);

      const movies = await supabase
        .from("movies")
        .select()
        .eq("user_id", user.id);

      const albums = await supabase
        .from("albums")
        .select()
        .eq("user_id", user.id);

      setMediaItems({
        books: books,
        movies: movies,
        albums: albums,
      });
    }

    fetchMediaItems();
  }, [user]);

  useEffect(() => {
    async function createSlides() {
      const bookSlides = books.data.map((book) => {
        return {
          id: book.id,
          title: book.title,
          imageUrl: book.imageUrl,
        };
      });

      console.log("bookSlides:", bookSlides);

      const movieSlides = movies.data.map((movie) => {
        return {
          id: movie.id,
          title: movie.title,
          imageUrl: movie.imageUrl,
        };
      });

      const albumSlides = albums.data.map((album) => {
        return {
          id: album.id,
          title: album.title,
          imageUrl: album.imageUrl,
        };
      });

      setSlides({
        books: bookSlides,
        movies: movieSlides,
        albums: albumSlides,
      });
    }

    createSlides();
  }, [mediaItems]);

  return (
    <main className="container">
      <h1>My Media</h1>
      <div>
        <article>
          <header>My Books</header>
          {slides.books === {} ? (
            <button aria-busy="true"></button>
          ) : (
            <ImageSlider slides={slides.books} mediaType="books" />
          )}
        </article>
        <article>
          <header>My Movies</header>
          {slides.movies === {} ? (
            <button aria-busy="true"></button>
          ) : (
            <ImageSlider slides={slides.movies} mediaType="movies" />
          )}
        </article>
        <article>
          <header>My Albums</header>
          {slides.albums === {} ? (
            <button aria-busy="true"></button>
          ) : (
            <ImageSlider slides={slides.albums} mediaType="albums" />
          )}
        </article>
      </div>
    </main>
  );
}
