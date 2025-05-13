import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const localData = localStorage.getItem("userData");
  const [userData, setUserData] = useState(
    localData ? JSON.parse(localData) : null
  );

  useEffect(() => {
    if (userData && userData.Token) {
      localStorage.setItem("userData", JSON.stringify(userData));
      axios.defaults.headers.common.Authorization = `Bearer ${userData.Token}`;
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("userData");
      delete axios.defaults.headers.common.Authorization;
      setIsAuthenticated(false);
    }
  }, [userData]);

  const Signin = async (email, password) => {
    const res = await axios.post("http://localhost:8080/api/auth/login", {
      email,
      password,
    });

    const newUserData = {
      Token: res.data.token,
      User: { email },
    };

    setUserData(newUserData);
    return newUserData;
  };

  const Signup = async (
    firstName,
    lastName,
    email,
    password,
    phone,
    gender
  ) => {
    const res = await axios.post("http://localhost:8080/api/auth/register", {
      firstName,
      lastName,
      email,
      password,
      phone,
      gender,
    });
    const loginRes = await Signin(email, password);
    return loginRes;
  };

  const Signout = () => {
    setUserData(null);
    setIsAuthenticated(false);
    delete axios.defaults.headers.common.Authorization;
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userData, Signin, Signup, Signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
