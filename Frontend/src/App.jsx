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
import Shop from "./components/Shop/Shop";
import ShopProfile from "./components/Shop/sections/ShopProfile"
import { Success } from "./components/stripe/Success";
import { Cancel } from "./components/stripe/Cancel";
import Admin from "./page/Dashboard/AdminDashboard/Admin";
import Dashboard from "./sections/Dashboard";
import User from "./sections/User";
import Revenue from "./sections/Revenue";
import Transactions from "./sections/Transactions";
import Reports from "./sections/Reports";
import Shops from "./sections/Shops";
import Settings from "./sections/Settings";
import Help from "./sections/Help";
import SingleUserPage from "./sections/SingleUserPage";
import ProductsPage from "./sections/ProductsPage";
import ProtectRoute from "./utils/ProtectRoute";
import NotFound from "./page/NotFound";
import OrderDetails from "./components/Customer/sections/OrderDetails";
import { getAllProducts } from "./redux/actions/product";
import Orders from "./components/Shop/sections/Orders"
import CustomerProfile from "./components/Customer/sections/CustomerProfile";
import UserShopProfile from "./components/ShopProfile/UserShopProfile";
import SellerDashboard from "./components/Shop/sections/SellerDashboard";
import ShopProducts from './components/Shop/sections/Products'
import CusomterOrders from './components/Customer/sections/Orders'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App () {
  useEffect( () => {
    Store.dispatch( LoadUser() )
    Store.dispatch( getAllProducts() )
  }, [] );

  return (
    <div>
      <ToastContainer position="top-center" autoClose={ 5000 } />
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

        <Route path="/success" element={ <Success /> } />
        <Route path="/cancel" element={ <Cancel /> } />




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
        <Route path="*" element={ <Layout><NotFound /></Layout> } />


        <Route
          path="/profile"
          element={
            <ProtectRoute>
              <Layout>
                <ProfileCustomer>
                  <div className="flex justify-center items-center h-full p-4 w-full shadow-md">
                    <CustomerProfile />
                  </div>
                </ProfileCustomer>
              </Layout>
            </ProtectRoute>
          }
        />
        <Route
          path="/profile/orders"
          element={
            <ProtectRoute>
              <Layout>
                <ProfileCustomer>
                  <div className="flex justify-center items-center h-full p-4 w-full shadow-md">
                    <CusomterOrders />
                  </div>
                </ProfileCustomer>
              </Layout>
            </ProtectRoute>
          }
        />
        <Route
          path="/profile/refunds"
          element={
            <ProtectRoute>
              <Layout>
                <ProfileCustomer>
                  <div>Refunds</div>
                </ProfileCustomer>
              </Layout>
            </ProtectRoute>
          }
        />
        <Route
          path="/profile/track-order"
          element={
            <ProtectRoute>
              <Layout>
                <ProfileCustomer>
                  <div>Refunds</div>
                </ProfileCustomer>
              </Layout>
            </ProtectRoute>
          }
        />
        <Route
          path="/profile/messages"
          element={
            <ProtectRoute>
              <Layout>
                <ProfileCustomer>
                  <div>Refunds</div>
                </ProfileCustomer>
              </Layout>
            </ProtectRoute>
          }
        />

        <Route path="/profile/order/:id" element={ <OrderDetails /> } />



        <Route
          path="/shop"
          element={
            <ProtectRoute>

              <Shop>
                <SellerDashboard />
              </Shop>

            </ProtectRoute>
          }
        />
        <Route
          path="/shop/profile"
          element={
            <ProtectRoute>

              <Shop>
                <ShopProfile />
              </Shop>

            </ProtectRoute>
          }
        />
        <Route
          path="/shop/orders"
          element={
            <ProtectRoute>

              <Shop>
                <div className="flex justify-center items-center h-full p-4 w-full shadow-md">
                  <Orders />
                </div>
              </Shop>

            </ProtectRoute>
          }
        />
        <Route
          path="/shop/products"
          element={
            <ProtectRoute>

              <Shop>
                <ShopProducts />
              </Shop>

            </ProtectRoute>
          }
        />
        <Route
          path="/shop/refunds"
          element={
            <ProtectRoute>

              <Shop>
                <div>Refunds</div>
              </Shop>

            </ProtectRoute>
          }
        />
        <Route
          path="/shop/events"
          element={
            <ProtectRoute>

              <Shop>
                <div>Events</div>
              </Shop>

            </ProtectRoute>
          }
        />

        <Route path="/shop/:id" element={ <Layout> <UserShopProfile /></Layout> } />

      </Routes>
    </div>
  );
}

export default App;
