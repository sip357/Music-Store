import Image from "next/image";

export default function Footer() {
    return (
      <footer className="flex gap-6 flex-wrap items-center justify-center my-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.youtube.com/@beatsbysip8832"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/youtube.svg"
            alt="YouTube icon"
            width={18}
            height={18}
          />
          YouTube
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Terms and Conditions"
            width={16}
            height={16}
          />
          Terms
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Next.js website"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    );
  }