import NavBar from "./NavBar"
import Head from "next/head"
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="page_container">
        <Head>
          <title>Music Store</title>
          <meta name="description" content="A website for selling instrumentals by SIP" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar />
        <main className="fivepb">{children}</main>
        <footer id="footer">
          <p>&copy; 2023 SIP</p>
        </footer>
      </body>
    </html>
  )
}
