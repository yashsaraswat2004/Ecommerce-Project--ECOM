import React from "react";
import Navigation from "../customer/Navigation/Navigation";
import { Route, Routes, useLocation } from "react-router-dom";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import RecoverPassword from "../components/RecoverPassword";
import ResetPassword from "../components/ResetPassword";
import HomePage from "../customer/page/HomePage";
import Cart from "../customer/Cart/Cart";
import CheckOut from "../customer/checkout/CheckOut";
import Order from "../customer/Order/Order";
import OrderDetails from "../customer/orderDetails/OrdeDetails";
import Product from "../customer/Product/Product";
import ProductDetails from "../customer/ProductDetails/ProductDetails";
import PaymentSuccess from "../pages/PaymentSuccess";
import Product2 from "../customer/Product/Product2";

const CustomerRoute = () => {
  const location = useLocation();

  const hideNavbarFooterRoutes = ["/login", "/signup"];
  return (
    <>
      <div>
        {!hideNavbarFooterRoutes.includes(location.pathname) && <Navigation />}
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/recover_password" element={<RecoverPassword />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route exact path="/account/order/user" element={<Order />} />
        <Route path="/account/order/:orderId" element={<OrderDetails />} />
        <Route path="/:lavelOne/:lavelTwo/:lavelThree" element={<Product />} />
        <Route path="/:lavelOne/:lavelTwo" element={<Product2 />} />
        {/* <Route path="/:mainCategory/:subCategory" component={Product2} /> */}
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/payment/:orderId" element={<PaymentSuccess />} />
      </Routes>

      {/* {!hideNavbarFooterRoutes.includes(location.pathname) && <Footer />} */}
    </>
  );
};

export default CustomerRoute;
