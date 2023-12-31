import QueryWarper from "./components/QueryWarper";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "URl Shortener",
  description: "Are you tired of charing Links with 400 characters?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryWarper>
        <body className={inter.className}>
          <header className="flex justify-center p-10">
            <h1 className="text-white text-6xl">{metadata.title}</h1>
          </header>
          {children}
        </body>
      </QueryWarper>
    </html>
  );
}
