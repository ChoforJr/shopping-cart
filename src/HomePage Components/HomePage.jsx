import { Link } from "react-router-dom";
import styles from "./homePage.module.css";

const HomePage = () => {
  return (
    <main className={styles.body}>
      <h1>Welcome To Our E-Shop</h1>
      <p>
        Discover a curated collection of high-quality electronics and
        accessories. <br /> From the latest gadgets to essential gear, we have
        everything you need.
      </p>
      <Link to="/shop">
        <button>Start Shopping</button>
      </Link>
    </main>
  );
};

export default HomePage;
