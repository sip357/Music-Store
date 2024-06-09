import Layout from '../components/layout';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Welcome to my Music Store</h1>
        <p>Discover a variety of beats at unbeatable prices</p>
      </div>
    </Layout>
  );
}
