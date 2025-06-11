import { FaFacebookF, FaInstagram, FaPhone} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-200/80 text-gray-700 py-10 px-4">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Address */}
          <div className="text-sm text-gray-500">
            <p>babukhan, Rangpur</p>
            <p>60606 123, Bangladesh</p>
          </div>

          {/* Logo */}
          <div className="text-3xl font-semibold flex items-center justify-center">
            <span className="text-gray-800 italic">food</span>
            <span className="text-yellow-500 italic">dy</span>
          </div>

          {/* Contact */}
          <div className="text-sm text-gray-500">
            <p>Call us 24/7</p>
            <p className="text-gray-800 font-semibold flex gap-2 items-center">
              <FaPhone className="rotate-90" /> 01308150275
            </p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4">
          <div className="w-10 cursor-pointer h-10 flex items-center justify-center bg-white rounded-full shadow">
            <FaXTwitter />
          </div>
          <div className="w-10 cursor-pointer h-10 flex items-center justify-center bg-white rounded-full shadow">
            <FaFacebookF className="text-gray-700" />
          </div>
          <div className="w-10 cursor-pointer h-10 flex items-center justify-center bg-white rounded-full shadow">
            <FaInstagram className="text-gray-700" />
          </div>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-400">
          AncoraThemes © 2025. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
