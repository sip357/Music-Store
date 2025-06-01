import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./components/nav/navbar";
import Footer from "./components/footer";
import AudioPlayer from "./components/audioPlayer";
import { PlaylistProvider } from "./context/PlaylistContext";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SIP's Music Store",
  description: "E-commerce store for digital instrumentals",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className="antialiased flex flex-col">
        <PlaylistProvider>
          <NavBar />
          <main>
            {children}
          </main>
          {/* <AudioPlayer playlist={}/> */}
          <Footer />
          <AudioPlayer />
        </PlaylistProvider>
      </body>
    </html>
  );
}
