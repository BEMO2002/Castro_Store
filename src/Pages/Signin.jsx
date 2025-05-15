import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/small-logo.png";
const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const { isAuthenticated, Signout, Signin } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (ev) => {
    ev.preventDefault();
    if (isAuthenticated) Signout();

    try {
      const userData = await Signin(formData.email, formData.password);
      toast.success(`Welcome ${userData.User.email}`);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data || "Login failed!", {
        theme: "#ff413",
      });
    }
  };

  return (
    <div className="auth-container flex items-center justify-center p-4">
      <div className="form-container w-full max-w-md p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3">
            <img src={logo} alt="logo" className="w-[100px]" />
          </Link>
        </div>

        <form onSubmit={submitHandler} className="space-y-4">
          <h3 className="text-2xl font-bold text-center text-primary mb-6">
            Login to Your Account
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={(ev) =>
                setFormData({ ...formData, email: ev.target.value })
              }
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary pr-10"
              placeholder="Enter your password"
              required
              minLength={4}
              value={formData.password}
              onChange={(ev) =>
                setFormData({ ...formData, password: ev.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
            >
              {showPass ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-black to-primary text-white  py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
          >
            Login
          </button>

          <p className="text-center text-sm">
            Don't have an account?
            <Link to="/signup" className="text-primary font-semibold ml-1">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
