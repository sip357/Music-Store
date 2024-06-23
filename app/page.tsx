import Layout from "./components/layout";
import App from "next/app";
import './styles/globals.css';

export default function def() {
  return (
    <Layout>
      <div>
        <h1>Where instrumentals meet talent</h1>
        <p>Discover your sounds</p>
      </div>
      <div className="container">
        <p className="paraFonts">
          Hi, welcome to my beatstore. I am a Canadian producer that goes by the name, SIP. 
          I love creating melodies and turning them into full instrumentals. 
          My musical pallette is quite broad, ranging from Emo Rap all the way to Pop Punk music.
          I fair detail, I specialize in and love to create Pop Punk, Punk Rock, Melodic Trap, LoFi, Alternative Rock and Pop instrumentals.
          I also love to share my melodies, hence I create Sound Kits which will have a bunch of melodies or one-shots using a variety of instruments.
        </p>
      </div>
      <div>
        <header>Licences</header>
        <p className="paraFonts">
          Here are the specific details about the Licence options.
        </p>
      </div>
    </Layout>
  );
}


