import Layout from '../components/layout';
import styles from '../styles/Store.module.css';

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Delve into my world of Music</h1>
        <p>Discover a variety of beats at unbeatable prices</p>
      </div>
      <div>
        <a href="store.html" className="image-container"> 
          <div className="hover-text">Instrumentals</div>
        </a>
        <a href="/">Sound kits</a>
        <a href="/">Licence</a>
      </div>
      <div className="container">
        <a href="/" className="genreLinks">Pop punk</a>
        <a href="/" className="genreLinks">Emo rap</a>
        <a href="/" className="genreLinks">Lofi</a>
      </div>
    </Layout>
  );
}