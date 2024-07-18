
import Head from "next/head"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <footer>
          <p>&copy; 2023 SIP</p>
        </footer>
      </body>
    </html>
  )
}
