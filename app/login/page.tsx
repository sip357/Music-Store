import Layout from "../components/layout";
import styles from "../login/login.module.css"

export default function LoginPage() {
    async function checkHash() {
        await fetch("https://www.toptal.com/developers/bcrypt/api/check-password.json");

    }
    // if(name.length <= 3 || !ValidateEmail(email)){
    //     var isButtondisabled = true;
    //   } else{
    //     var isButtondisabled = false;
    //   }

    // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     if(name.length <= 3 || !name){
    //       setError('Name is required to create a user');
    //       return;
    //     }
    //     if (!email) {
    //       setError('Email is required to create a user');
    //       return;
    //     }
    //     if (!ValidateEmail(email)) {
    //       setError('Invalid email address');
    //       return;
    //     }
    //     setError(''); // Clear any existing error
    //     createUser();
    //   };
  return (
    <Layout>
        <div className={`${styles.div} ${styles.mg_auto} ${styles.padding_top}`}>
            <form action="">
                <div className={`${styles.twopb}`}>
                    <label htmlFor="email">Email:</label>
                    <input
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                    //   value={email}
                    //   onChange={(e) => setEmail(e.target.value)}
                    className={`${styles.inputField}`}
                    required
                    />
                </div>
                <div className={`${styles.twopb}`}>
                    <label htmlFor="password">Password:</label>
                    <input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    //   value={email}
                    //   onChange={(e) => setEmail(e.target.value)}
                    className={`${styles.inputField}`}
                    required
                    />
                </div>
                {/* disabled={isButtondisabled} */}
                {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
                <div className={`${styles.twopb} ${styles.text_align_center}`}>
                    <button type="submit"  className={`${styles.button_3}`}>
                    Login
                    </button>
                </div>
            </form>
        </div> 
    </Layout>
    
  );
}