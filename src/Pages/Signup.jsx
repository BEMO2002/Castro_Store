import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
  });

  const { Signup } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (ev) => {
    ev.preventDefault();

    try {
      await Signup(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
        formData.phone,
        formData.gender
      );
      toast.success("Registration successful! You can now login.", {
        theme: "colored",
      });
      navigate("/signin");
    } catch (error) {
      toast.error(error.response?.data || "Registration failed!", {
        theme: "colored",
      });
    }
  };

  return (
    <div className="auth-container flex items-center justify-center p-4">
      <div className="form-container w-full max-w-md p-8 rounded-2xl shadow-2xl">
        <form onSubmit={submitHandler} className="space-y-4">
          <h3 className="text-2xl font-bold text-center text-primary mb-6">
            Create New Account
          </h3>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your first name"
              required
              value={formData.firstName}
              onChange={(ev) =>
                setFormData({ ...formData, firstName: ev.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
              placeholder="Enter your last name"
              required
              value={formData.lastName}
              onChange={(ev) =>
                setFormData({ ...formData, lastName: ev.target.value })
              }
            />
          </div>

          <div className="mb-4">
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
              placeholder="Enter your phone number"
              required
              value={formData.phone}
              onChange={(ev) =>
                setFormData({ ...formData, phone: ev.target.value })
              }
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
              placeholder="Create a password"
              required
              minLength={4}
              value={formData.password}
              onChange={(ev) =>
                setFormData({ ...formData, password: ev.target.value })
              }
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
              type="button"
            >
              {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
              required
              value={formData.gender}
              onChange={(ev) =>
                setFormData({ ...formData, gender: ev.target.value })
              }
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <button
            className="w-full bg-gradient-to-r from-black to-primary text-white  py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            type="submit"
          >
            Sign Up
          </button>

          <p className="text-center text-sm">
            Already have an account?
            <Link to="/signin" className="text-primary font-semibold ml-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
