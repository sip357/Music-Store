import NavBar from "./NavBar"
import Head from "next/head"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Head>
          <title>Music Store</title>
          <meta name="description" content="A website for selling instrumentals by SIP" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar />
        <main>{children}</main>
        <footer>
          <p>&copy; 2023 SIP</p>
        </footer>
      </body>
    </html>
  )
}
