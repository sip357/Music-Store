import React from "react";
import Layout from "../components/layout";
import styles from "./Signup.module.css";
import ShoppingCartIcon from "../components/shopping_cart";

const SignUp: React.FC = () => {
    return (
      <Layout>
        <div className={styles.fivep}>
          <div className={styles.gg_play_button}></div>
          <ShoppingCartIcon />
        </div>
      </Layout>
    );
  };
  
  export default SignUp;
  