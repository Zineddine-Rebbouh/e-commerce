import Home from "./components/Home/Home";
import Layout from "./layout/Layout";
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
import { Success } from "./components/stripe/Success";
import { Cancel } from "./components/stripe/Cancel";
import Admin from "./page/Dashboard/AdminDashboard/Admin";
import Dashboard from "./sections/Dashboard";
import User from "./sections/User";
import Revenue from "./sections/Revenue";
import Transactions from "./components/Transactions/Transactions";
import Reports from "./sections/Reports";
import Shops from "./sections/Shops";
import Settings from "./sections/Settings";
import Help from "./sections/Help";
import SingleUserPage from "./sections/SingleUserPage";
import ProductsPage from "./sections/ProductsPage";

function App () {
  useEffect( () => {
    Store.dispatch( LoadUser() );
  }, [] );

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
        <Route path="/sign-up" element={ <SignUp /> } />
        <Route path="/sign-in" element={ <Login /> } />
        <Route path="/create-shop" element={ <SellerForm /> } />
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
          path="/product-details/:id"
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
        <Route path="/success" element={ <Success /> } />
        <Route path="/cancel" element={ <Cancel /> } />
        <Route path="/shop/:id" element={ <ShopProfile /> } />


        // Admin Dashboard
        <Route path="/dashboard" element={ <Admin><Dashboard /></Admin> } />
        <Route path="/dashboard/users" element={ <Admin><User /></Admin> } />
        <Route path="/dashboard/users/:id" element={ <Admin><SingleUserPage /></Admin> } />
        <Route path="/dashboard/products" element={ <Admin><ProductsPage /></Admin> } />
        <Route path="/dashboard/revenue" element={ <Admin><Revenue /></Admin> } />
        <Route path="/dashboard/transactions" element={ <Admin><Transactions /></Admin> } />
        <Route path="/dashboard/reports" element={ <Admin><Reports /></Admin> } />
        <Route path="/dashboard/shops" element={ <Admin><Shops /></Admin> } />
        <Route path="/dashboard/settings" element={ <Admin><Settings /></Admin> } />
        <Route path="/dashboard/help" element={ <Admin><Help /></Admin> } />


      </Routes>
    </div>
  );
}

export default App;
