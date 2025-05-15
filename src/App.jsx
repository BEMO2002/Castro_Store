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
import NotFound from "./Pages/NotFound";
import Cart from "./Pages/Cart";
import ContactUs from "./Pages/ContactUs";
import OurServices from "./Pages/OurServices";
import Checkout from "./Pages/Checkout";
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
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/service" element={<OurServices />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signout" element={<Signout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
