import { FaFacebookF, FaInstagram, FaPhone } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AuthContext } from "../../Context/ContextProvider";
import { use } from "react";
import { Link } from "react-router";

export default function Footer() {
  const { darkLight } = use(AuthContext);

  return (
    <footer
      className={`bg-gray-200/80 text-gray-700 py-10 px-4 border-t border-t-gray-50 shadow-inner ${
        darkLight
          ? "dark bg-gray-900 dark:text-gray-300 dark:border-gray-700"
          : ""
      }`}
    >
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Address */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>babukhan, Rangpur</p>
            <p>60606 123, Bangladesh</p>
          </div>

          {/* Logo */}
          <div className="text-gray-600 dark:text-gray-200 top-10 left-10 text-4xl font-semibold">
            <Link to={"/"}>
              <p>
                F<span className="text-orange-400">O</span>
                <span className="-ml-4 text-orange-400">O</span>DY
              </p>
            </Link>
          </div>

          {/* Contact */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Call us 24/7</p>
            <p className="text-gray-800 dark:text-white font-semibold flex gap-2 items-center">
              <FaPhone className="rotate-90" /> 01308150275
            </p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-700 rounded-full shadow cursor-pointer text-gray-800 dark:text-white">
            <FaXTwitter />
          </div>
          <div className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-700 rounded-full shadow cursor-pointer text-gray-800 dark:text-white">
            <FaFacebookF />
          </div>
          <div className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-700 rounded-full shadow cursor-pointer text-gray-800 dark:text-white">
            <FaInstagram />
          </div>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-400 dark:text-gray-500">
          AncoraThemes © 2025. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
