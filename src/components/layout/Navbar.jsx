import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  User,
  LogOut,
  Shield,
  FileText,
  Plus,
  Phone,
  Info,
  Moon,
  Sun,
  StickyNote,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "@/store/authStore";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Zustand store se auth state lena
  const { token, isAdmin, logout, currentUser } = useAuthStore();

  // Theme context se theme aur toggle function lena
  const { theme, toggleTheme } = useTheme();

  // Logout handler - saari state clear karke login page par redirect
  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileMenuOpen(false);
  };

  // Active link check karne ka helper function
  const isActive = (path) => location.pathname === path;

  return (
    <header className="h-[74px] bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300 border-b dark:border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo with Icon */}
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <StickyNote className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-playfair hidden sm:block">
              Notify
            </h3>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-6 font-poppins">
          {token && (
            <>
              <Link to="/notes">
                <li
                  className={`cursor-pointer transition-colors ${
                    isActive("/notes")
                      ? "text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  My Notes
                </li>
              </Link>
              <Link to="/create-note">
                <li
                  className={`cursor-pointer transition-colors ${
                    isActive("/create-note")
                      ? "text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  Create Note
                </li>
              </Link>
            </>
          )}

          <Link to="/contact">
            <li
              className={`cursor-pointer transition-colors ${
                isActive("/contact")
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              Contact
            </li>
          </Link>

          <Link to="/about">
            <li
              className={`cursor-pointer transition-colors ${
                isActive("/about")
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              About
            </li>
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 text-gray-700" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-400" />
            )}
          </button>

          {token ? (
            <>
              {/* User Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="gap-2 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <User className="h-4 w-4" />
                    {currentUser?.username || "User"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 dark:bg-gray-800 dark:border-gray-700"
                >
                  <DropdownMenuItem
                    onClick={() => navigate("/profile")}
                    className="dark:hover:bg-gray-700 dark:text-gray-300"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem
                      onClick={() => navigate("/admin/users")}
                      className="dark:hover:bg-gray-700 dark:text-gray-300"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Panel
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="dark:bg-gray-700" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 dark:text-red-400 dark:hover:bg-gray-700"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Sign Up
              </Button>
            </Link>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow-lg"
          >
            <ul className="flex flex-col gap-2 p-4 font-poppins">
              {token && (
                <>
                  <Link to="/notes" onClick={() => setMobileMenuOpen(false)}>
                    <li
                      className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                        isActive("/notes")
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      <FileText className="h-5 w-5" />
                      My Notes
                    </li>
                  </Link>
                  <Link
                    to="/create-note"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <li
                      className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                        isActive("/create-note")
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      <Plus className="h-5 w-5" />
                      Create Note
                    </li>
                  </Link>
                </>
              )}

              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                <li
                  className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                    isActive("/contact")
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <Phone className="h-5 w-5" />
                  Contact
                </li>
              </Link>

              <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
                <li
                  className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                    isActive("/about")
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <Info className="h-5 w-5" />
                  About
                </li>
              </Link>

              {token ? (
                <>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <li
                      className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                        isActive("/profile")
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      <User className="h-5 w-5" />
                      Profile
                    </li>
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin/users"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <li className="flex items-center gap-3 p-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <Shield className="h-5 w-5" />
                        Admin Panel
                      </li>
                    </Link>
                  )}

                  <li
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors cursor-pointer"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </li>
                </>
              ) : (
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <li className="mt-2">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Sign Up
                    </Button>
                  </li>
                </Link>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
