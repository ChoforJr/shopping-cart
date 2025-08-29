import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h1>Welcome To Our E-Shop</h1>
      <p>
        Discover a curated collection of high-quality electronics and
        accessories. From the latest gadgets to essential gear, we have
        everything you need.
      </p>
      <Link to="/shop">
        <button>Start Shopping</button>
      </Link>
    </>
  );
};

export default HomePage;
