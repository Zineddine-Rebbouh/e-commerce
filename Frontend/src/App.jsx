import Home from "./components/Home/Home"
import Layout from "./layout/Layout"
import { Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import { useEffect } from "react";
import Store from "./redux/store";
import { LoadUser } from "./redux/actions/user";
import Products from "./components/Home/Products";
import Events from "./components/Home/Events";
import FAQ from "./components/Home/FAQ";
import SellerForm from "./page/SellerForm";
import ProductDetails from "./components/Product/ProductDetails/ProductDetails";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import ProfileCustomer from "./components/Customer/ProfileCustomer";
import Whishlist from "./components/whishlist/Whishlist";
import ShopProfile from "./components/Shop/ShopProfile";

function App () {

  useEffect(
    () => {
      Store.dispatch( LoadUser() )
    }, [] )

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/sign-up"
          element={
            <SignUp />
          }
        />
        <Route
          path="/sign-in"
          element={
            <Login />
          }
        />
        <Route
          path="/create-shop"
          element={
            <SellerForm />
          }
        />
        <Route
          path="/products"
          element={
            <Layout>
              <Products />
            </Layout>
          }
        />
        <Route
          path="/events"
          element={
            <Layout>
              <Events />
            </Layout>
          }
        />
        <Route
          path="/faq"
          element={
            <Layout>
              <FAQ />
            </Layout>
          }
        />
        <Route
          path="/product-details"
          element={
            <Layout>
              <ProductDetails />
            </Layout>
          }
        />
        <Route
          path="/add-to-cart"
          element={
            <Layout>
              <ShoppingCart />
            </Layout>
          }
        />
        <Route
          path="/whishlist"
          element={
            <Layout>
              <Whishlist />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <ProfileCustomer />
            </Layout>
          }
        />
        <Route
          path="/shop/:id"
          element={
            <ShopProfile />
          }
        />
      </Routes>
    </div>
  )
}

export default App
