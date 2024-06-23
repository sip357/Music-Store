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
        <a href="store.html" className="image-container">
          <img src="studio.jpg" alt="Instrumentals" width="90" height="90"></img> 
          <div className="hover-text">Instrumentals</div>
        </a>
        <a href="/">Sound kits</a>
        <a href="/">Licence</a>
      </div>
      <div className="container">
        <a href="/" className="signUpbutton">Sign up</a>
      </div>
    </Layout>
  );
}


