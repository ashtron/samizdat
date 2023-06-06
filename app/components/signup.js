"use client";

export default function SignUp() {
  return (
    <main className="container">
      <article>
        <header>Create an Account</header>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" />

        <button type="submit">Sign Up</button>
      </article>
    </main>
  );
}
