import Home from "./components/Home/Home"
import Layout from "./layout/Layout"
import { Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import SignUp from "./page/SignUp";

function App () {
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
          path="/register"
          element={
            <SignUp />
          }
        />
        <Route
          path="/login"
          element={
            <Login />
          }
        />
      </Routes>
    </div>
  )
}

export default App
