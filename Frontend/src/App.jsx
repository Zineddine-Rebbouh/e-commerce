import Home from "./components/Home/Home"
import Layout from "./layout/Layout"
import { Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import { useEffect } from "react";
import Store from "./redux/store";
import { LoadUser } from "./redux/actions/user";
import BestSelling from "./components/Home/BestSelling";
import Products from "./components/Home/Products";
import Events from "./components/Home/Events";
import FAQ from "./components/Home/FAQ";
import SellerForm from "./page/SellerForm";

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
          path="/create-seller"
          element={
            <SellerForm />
          }
        />
        <Route
          path="/best-selling"
          element={
            <Layout>
              <BestSelling />
            </Layout>
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
      </Routes>
    </div>
  )
}

export default App
