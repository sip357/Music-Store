import Layout from "./components/layout";
import './styles/globals.css';

export default function def() {
  return (
    <Layout>
      <div>
        <h1>Where instrumentals meet talent</h1>
        <p>Discover your sounds</p>
      </div>
      <section className="about-section">
        <div className="container fivep" id="about">
          <p className="paraFonts">
            Hi, welcome to my beatstore. I am a Canadian producer that goes by the name, SIP. 
            I love creating melodies and turning them into full instrumentals. 
            My musical pallette is quite broad, ranging from Emo Rap all the way to Pop Punk music.
            I fair detail, I specialize in and love to create Pop Punk, Punk Rock, Melodic Trap, LoFi, Alternative Rock and Pop instrumentals.
            I also love to share my melodies, hence I create Sound Kits which will have a bunch of melodies or one-shots using a variety of instruments.
          </p>
        </div>
        <div className="container onep">
          <header>Instrumentals</header>
        </div>
        <div className="onep">
          <div className="paraFonts">
            <p className="subject">
              First Form Lease:
            </p>
            <p className="paraFonts">
              1st form lease.
            </p>
          </div>
        </div>
        <div className="onepb">
          <p className="subject">
            Second Form Lease:
          </p>
          <p className="paraFonts zerop">
            2nd form lease.
          </p>
        </div>
      </section>
    </Layout>
  );
}


