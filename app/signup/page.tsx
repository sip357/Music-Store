import React from "react";
import Layout from "../components/layout";
import styles from "./Signup.module.css";
import "../styles/globals.css";

const SignUp: React.FC = () => {
    return (
      <Layout>
        <div className={styles.div}>
          <form action="">
            <div className={`${styles.twopb}`}>
              <input type="text" placeholder="First Name" className={`${styles.inputField}`}/>
            </div>
            <button className={`${styles.button_3}`}>Submit</button>
          </form>
        </div>
        
      </Layout>
    );
  };
  
  export default SignUp;
  