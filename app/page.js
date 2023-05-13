import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <article>
        <header>Sign In</header>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" />

        <button type="submit">Sign In</button>
      </article>
    </main>
  );
}
