import Home from "./components/Home/Home"
import Layout from "./layout/Layout"
import { Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import { useEffect } from "react";
import Store from "./redux/store";
import { LoadUser } from "./redux/actions/user";

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
      </Routes>
    </div>
  )
}

export default App
