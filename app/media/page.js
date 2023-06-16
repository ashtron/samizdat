"use client";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import ImageSlider from "../components/image-slider";
import loggedIn from "../lib/auth-utilities";
import { getSession } from "../lib/auth-utilities";

export default function MyMediaPage() {
  const supabase = createBrowserSupabaseClient();

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

  useEffect(() => {
    async function getUser() {
      const user = (await getSession()).user;
      setUser(user);
    }

    console.log({ user });

    getUser();
  }, []);

  useEffect(() => {
    async function fetchMediaItems() {
      const books = await supabase
        .from("books")
        .select()
        .eq("userID", user.id);

      const movies = await supabase
        .from("movies")
        .select()
        .eq("userID", user.id);

      const albums = await supabase
        .from("albums")
        .select()
        .eq("userID", user.id);

      setMediaItems({
        books: books.data,
        movies: movies.data,
        albums: albums.data,
      });
    }

    if (user.id) fetchMediaItems();
  }, [user]);

  useEffect(() => {
    async function createSlides() {
      const bookSlides = mediaItems.books.map((book) => {
        return {
          id: book.id,
          title: book.title,
          imageUrl: book.imageUrl,
        };
      });

      const movieSlides = mediaItems.movies.map((movie) => {
        return {
          id: movie.id,
          title: movie.title,
          imageUrl: movie.imageUrl,
        };
      });

      const albumSlides = mediaItems.albums.map((album) => {
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

    if (!(Object.keys(mediaItems).length === 0)) createSlides();
  }, [mediaItems]);

  return (
    <main className="container">
      <h1>My Media</h1>
      <div>
        <article>
          <header>My Books</header>
          {Object.keys(slides.books).length === 0 ? (
            <button aria-busy="true"></button>
          ) : (
            <ImageSlider slides={slides.books} mediaType="books" />
          )}
        </article>
        <article>
          <header>My Movies</header>
          {Object.keys(slides.movies).length === 0 ? (
            <button aria-busy="true"></button>
          ) : (
            <ImageSlider slides={slides.movies} mediaType="movies" />
          )}
        </article>
        <article>
          <header>My Albums</header>
          {Object.keys(slides.albums).length === 0 ? (
            <button aria-busy="true"></button>
          ) : (
            <ImageSlider slides={slides.albums} mediaType="albums" />
          )}
        </article>
      </div>
    </main>
  );
}
