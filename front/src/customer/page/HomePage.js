import React from "react";
import HomePageVideo from "./HomePageVideo";
// import NewRelease from "../NewReleaseCart/NewRelease";
// import NewReleasecartData from "../NewReleaseCart/NewReleaseCartData";
import ShopByCategory from "../ShopByCategory/shopByCategory";
import Footer from "../../components/Footer";
import CrazyDeals from "../NewReleaseCart/NewRelease";
const HomePage = () => {
  return (
    <div className="relative mt-0">
      <HomePageVideo />
      <div className=" py-20 space-y-10 flex flex-col justify-center px-5 lg:px-10">
        <CrazyDeals title={"New Arrivals"} />
        <CrazyDeals title={"trending Products"} />
        <ShopByCategory />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
