import Link from "next/link";

export default function ProtectedPageNotice() {
  return (
    <article>
      You must be <Link href={"/"}>logged in</Link> to access this page.
    </article>
  );
}
