import Link from "next/link";

export default function LogIn() {
  return (
    <main className="container">
      <article>
        <header>Log In or {<Link href="/sign-up">Create an Account</Link>}</header>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" />

        <button type="submit">Log In</button>
      </article>
    </main>
  );
}
