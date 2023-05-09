import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/"><strong>SAMIZDAT</strong></Link>
        </li>
      </ul>

      <ul>
        <li>
          <details role="list">
            <summary aria-haspopup="listbox" role="button">
              Add Media
            </summary>
            <ul role="listbox">
              <li>
                <Link href="/add-book">
                  Book
                </Link>
              </li>
              <li>
                <Link href="/add-album">
                  Album
                </Link>
              </li>
              <li>
                <Link href="/add-movie">
                  Movie
                </Link>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </nav>
  );
}
