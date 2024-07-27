import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Beat from "../../types/beatType";

async function generateStaticParams() {
    const res = await fetch("http://localhost:3000/api/beatsAPI");
    const beats = await res.json();

    return beats.map((beat) => ({
        id: beat.id,
    }))
}
