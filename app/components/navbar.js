import Link from "next/link";

export default function Navbar() {
  return (
      <nav>
        <ul>
          <li>
            <strong>SAMIZDAT</strong>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/my-books">My Books</Link>
          </li>
          <li>
            <Link href="/add-book">
              <button>+</button>
            </Link>
          </li>
        </ul>
      </nav>
  );
}
