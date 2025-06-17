import { use } from "react";
import {
  FaMapMarkerAlt,
  FaUtensils,
  FaHamburger,
  FaMotorcycle,
} from "react-icons/fa";
import { AuthContext } from "../../Context/ContextProvider";

export default function Fastorder() {
  const { darkLight } = use(AuthContext);

  const steps = [
    {
      icon: <FaMapMarkerAlt size={40} />,
      label: "Choose your location",
    },
    {
      icon: <FaUtensils size={40} />,
      label: "Choose restaurant",
    },
    {
      icon: <FaHamburger size={40} />,
      label: "Make your order",
    },
    {
      icon: <FaMotorcycle size={40} />,
      label: "Food is on the way",
    },
  ];

  return (
    <div
      className={`relative text-center pb-[60px] px-5 ${
        darkLight ? "dark" : ""
      } dark:bg-gray-900`}
    >
      <h2 className="md:text-3xl text-2xl font-bold mb-2 dark:text-white">
        GET YOUR FOOD FAST & EASY
      </h2>
      <p className="text-gray-400 mb-10 dark:text-gray-300">Follow the Steps</p>

      <div className="relative flex flex-col md:flex-row justify-center items-center gap-16 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center relative"
          >
            <div className="text-gray-700 mb-4 dark:text-yellow-300">
              {step.icon}
            </div>
            <div className="bg-yellow-400 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold mb-2 dark:bg-yellow-500">
              {index + 1}
            </div>
            <p className="text-gray-700 font-medium dark:text-white">
              {step.label}
            </p>

            {/* Arrow (for all except last item) */}
            {index < steps.length - 1 && (
              <svg
                className="hidden md:block absolute top-1/2 -right-[60px] transform -translate-y-1/2"
                width="60"
                height="24"
                viewBox="0 0 60 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 12H55"
                  stroke="#ccc"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                <path
                  d="M45 6L55 12L45 18"
                  fill="none"
                  stroke="#ccc"
                  strokeWidth="2"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
