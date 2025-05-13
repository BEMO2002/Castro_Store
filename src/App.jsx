import "./App.css";
import Home from "./Pages/Home/Index";
import Layout from "./Pages/Layout";
import { BrowserRouter, Route, Routes } from "react-router";
import Signin from "./Pages/SignIn";
import Signup from "./Pages/Signup";
import { Signout } from "./Pages/Signout";
import { ToastContainer } from "react-toastify";
import LuckySpin from "./Pages/LuckeySpin";
import Boys from "./Pages/Boys";
import Girls from "./Pages/Girls";
import ProductList from "./Pages/products";
import Details from "./Pages/Details";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/spin" element={<LuckySpin />} />
          <Route path="/boy" element={<Boys />} />
          <Route path="/girl" element={<Girls />} />
          <Route path="/All" element={<ProductList />} />
          <Route path="/details/:id" element={<Details />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signout" element={<Signout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
