import { useEffect, useState } from "react";
import { FaSearch, FaRegUserCircle, FaTimes, FaBars } from "react-icons/fa";
import { Link } from "react-router";
import { useAuth } from "../Context/AuthContext";
import { IoIosLogIn } from "react-icons/io";
import { RiShoppingCartLine } from "react-icons/ri";
import logo from "../assets/small-logo.png";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".user-menu")) {
        setIsOpen(false);
      }
      if (mobileMenuOpen && !event.target.closest(".mobile-menu")) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, mobileMenuOpen]);

  return (
    <nav className="bg-white flex flex-row justify-around items-center p-4 shadow-md sticky top-0 z-[100]">
      <div className="xl:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-black focus:outline-none transition-transform duration-300 hover:scale-110"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <FaTimes className="text-2xl" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaBars className="text-2xl" />
            </motion.div>
          )}
        </button>
      </div>

      <div className="xl:mr-[40px] w-[100px] lg:w-[190px]">
        <Link to="/" className="flex items-center gap-3 link">
          <img src={logo} alt="logo" className="w-[100px] mb-1" />
        </Link>
      </div>
      <div className="hidden xl:flex">
        <ul className="flex flex-row items-center justify-center gap-20 font-semibold">
          <li>
            <Link
              to="/All"
              className="text-black link hover:text-primary transition-all"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/whyCastro"
              className="text-black link hover:text-primary transition-all"
            >
              Why Castro?
            </Link>
          </li>
          <li>
            <Link
              to="/boy"
              className="text-black link hover:text-primary transition-all"
            >
              Boys
            </Link>
          </li>
          <li>
            <Link
              to="/girl"
              className="text-black link hover:text-primary transition-all"
            >
              Girls
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-black link hover:text-primary transition-all"
            >
              Contact US
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-5">
        <FaSearch className="text-xl hidden sm:block" />
        <RiShoppingCartLine className="text-xl font-bold hidden sm:block" />

        <div className="relative user-menu">
          <div
            className="flex items-center justify-center w-12 h-12 border-2 border-primary rounded-full cursor-pointer hover:bg-primary/20 transition-all duration-300 hover:scale-105 group"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaRegUserCircle
              size={24}
              className="text-black group-hover:text-primary transition-colors duration-300"
            />
          </div>

          {isOpen && (
            <div className="absolute bg-white mt-2 right-0 top-12 rounded-lg shadow-2xl z-50 w-48 overflow-hidden">
              <div className="p-4 mb-0">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/signout"
                      className="flex items-center font-bold gap-2 justify-center px-4 py-3 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors duration-200"
                    >
                      <IoIosLogIn size={20} />
                      <span>Sign Out</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      className="flex items-center font-bold gap-2 justify-center px-4 py-3 text-sm text-black hover:bg-assent-tertiary rounded-lg transition-colors duration-200"
                    >
                      Sign In
                    </Link>
                    <div className="border-t border-gray-200"></div>
                    <Link
                      to="/signup"
                      className="flex items-center font-bold gap-2 justify-center px-4 py-3 text-sm text-black hover:bg-assent-tertiary rounded-lg transition-colors duration-200"
                    >
                      <span>Sign Up</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40 xl:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ y: -300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -300, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="mobile-menu fixed top-16 left-0 right-0 bg-white shadow-lg z-50 xl:hidden"
            >
              <ul className="flex flex-col items-center py-4 space-y-4 font-semibold">
                <motion.li
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    to="/Rent"
                    className="text-black link hover:text-primary transition-all block w-full text-center py-2 px-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Shop
                  </Link>
                </motion.li>
                <motion.li
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  <Link
                    to="/whyCastro"
                    className="text-black link hover:text-primary transition-all block w-full text-center py-2 px-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Why Castro?
                  </Link>
                </motion.li>
                <motion.li
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    to="./Export"
                    className="text-black link hover:text-primary transition-all block w-full text-center py-2 px-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Export
                  </Link>
                </motion.li>
                <motion.li
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <Link
                    to="/Faq"
                    className="text-black link hover:text-primary transition-all block w-full text-center py-2 px-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Faq
                  </Link>
                </motion.li>
                <motion.li
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    to="/contact"
                    className="text-black link hover:text-primary transition-all block w-full text-center py-2 px-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact US
                  </Link>
                </motion.li>
                <motion.li
                  className="flex gap-6 pt-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  <FaSearch className="text-xl sm:hidden" />
                  <RiShoppingCartLine className="text-xl font-bold sm:hidden" />
                </motion.li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
