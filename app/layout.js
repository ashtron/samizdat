import "./globals.css";
import "@picocss/pico";
import Navbar from "./components/navbar";

export const metadata = {
  title: "samizdat",
  description: "Keep track of your books, music, and movies—privately.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="container">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
