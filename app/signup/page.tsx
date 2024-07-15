import React from "react";
import Layout from "../components/layout";
import styles from "./Signup.module.css";
import "../styles/globals.css";

const SignUp: React.FC = () => {
    return (
      <Layout>
        <div className={`${styles.div} ${styles.mg_auto}`}>
          <form action="process-form" method="post" encType="multipart/form-data">
            <div className={`${styles.twopb}`}>
              <label htmlFor="Name">Name</label>
              <input type="text" id="name" placeholder="Enter a name" className={`${styles.inputField}`}/>
            </div>
            <div className={`${styles.twopb}`}>
              <label htmlFor="Email">Email</label>
              <input type="text" id="email" placeholder="Enter your email address" className={`${styles.inputField}`}/>
            </div>
            <div className={`${styles.twopb} ${styles.text_align_center}`}>
              <button className={`${styles.button_3}`}>Submit</button>
            </div>
          </form>
        </div>
        
      </Layout>
    );
  };
  
  export default SignUp;
  