import React from "react";
import Layout from "../components/layout";
import styles from "./Signup.module.css";
import "../styles/globals.css";

const SignUp: React.FC = () => {
    return (
      <Layout>
        <div className={`${styles.div} ${styles.mg_auto}`}>
          <form action="">
            <div className={`${styles.twopb}`}>
              <input type="text" placeholder="Enter a name" className={`${styles.inputField}`}/>
            </div>
            <div className={`${styles.twopb} ${styles.mg_auto}`}>
              <button className={`${styles.button_3}`}>Submit</button>
            </div>
          </form>
        </div>
        
      </Layout>
    );
  };
  
  export default SignUp;
  