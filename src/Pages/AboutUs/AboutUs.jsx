import React, { use, useState } from "react";
import bg1 from "../../assets/aboutus1.jpg";
import bg2 from "../../assets/aboutus2.jpg";
import bg3 from "../../assets/aboutus3.jpg";
import sef from "../../assets/aboutsef.png";
import ms1 from "../../assets/mx4.jpg";
import ms2 from "../../assets/mx5.jpg";
import { Link } from "react-router";
import { AuthContext } from "../../Context/ContextProvider";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("Starters");
  const tabs = ["Starters", "Mains", "Desserts"];
  const {darkLight} = use(AuthContext)

  const items = [
    {
      title: "Spain Appetizer",
      description:
        "A delightful starter inspired by traditional Spanish flavors, combining fresh ingredients with a Mediterranean touch for a vibrant experience.",
      image: bg1,
    },
    {
      title: "Wine and Cheese",
      description:
        "An elegant pairing of fine wine and gourmet cheese, perfect for a relaxing evening or a sophisticated gathering with friends.",
      image: bg2,
    },
    {
      title: "Cups Of Coffee",
      description:
        "Richly brewed coffee served in warm ceramic cups, capturing the aroma and comfort of a cozy morning or a midday break.",
      image: bg3,
    },
  ];

  const content = {
    Starters: {
      description:
        "Freshly prepared appetizers to excite your taste buds – from crispy golden fries with homemade dips to fresh garden salads drizzled with tangy dressings.",
      img1: ms1,
      img2: ms2,
    },
    Mains: {
      description:
        "Hearty and flavorful main courses crafted with love – from grilled salmon served with buttery asparagus to creamy pasta topped with freshly shaved parmesan",
      img1: ms1,
      img2: ms2,
    },
    Desserts: {
      description:
        "End your meal on a sweet note – indulgent chocolate lava cake, creamy cheesecakes, and fresh fruit tarts, all baked daily to perfection. A dessert experience you won’t forget.",
      img1: ms1,
      img2: ms2,
    },
  };

  return (
  <div
  className={`${darkLight ? "dark" : ""} mt-[64px] bg-gray-100 dark:bg-gray-900 lg:mt-[72px] min-h-screen`}
>
  {/* Banner */}
  <div
    className="bg-cover bg-center relative h-56 md:h-72 w-full flex items-center justify-center"
    style={{ backgroundImage: `url('../../../src/assets/aboutUs.jpg')` }}
  >
    <div className="absolute w-full h-full bg-black/40"></div>
    <h2 className="text-5xl lg:text-7xl text-center text-white z-20">
      About Us
    </h2>
  </div>

  {/* heading */}
  <div className="flex justify-center px-5 lg:px-0 items-center text-center pt-[130px] pb-[80px]">
    <div className="space-y-3">
      <p className="text-gray-400 dark:text-gray-300 font-semibold">
        TASTY AND CRUNCHY
      </p>
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-gray-600 dark:text-gray-100">
        Our Story
      </h2>
      <p className="max-w-[700px] md:text-base text-xs text-gray-400 dark:text-gray-300 pt-2 lg:pt-5">
        This website is created for you to discover the best recipes, cooking
        tips, and healthy food ideas. Our goal is to make delicious and
        nutritious cooking easy and accessible for everyone.
      </p>
    </div>
  </div>

  {/* card */}
  <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
    {items.map((item, index) => (
      <div key={index} className="text-center">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
          {item.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 font-extralight mb-3">
          {item.description}
        </p>
      </div>
    ))}
  </div>

  {/* meet our chef */}
  <div className="bg-gray-200 dark:bg-gray-800 mt-28">
    <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row pt-10 lg:pt-0 items-center">
      {/* Left Side Text */}
      <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
        <p className="text-sm tracking-widest text-gray-500 dark:text-gray-300 font-semibold uppercase">
          Tasty and Crunchy
        </p>
        <h2 className="text-6xl font-medium text-gray-800 dark:text-gray-100 mt-2">
          Our Chef
        </h2>
        <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed font-extralight">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi.
        </p>
        <Link to={"/menu"}>
          <button className="mt-6 bg-white dark:bg-gray-700 font-light px-6 py-3 text-gray-800 dark:text-gray-100 cursor-pointer transition">
            View Our Menu
          </button>
        </Link>
      </div>

      {/* Right Side Image */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src={sef}
          alt="Chef"
          className="w-full h-[482px] object-contain"
        />
      </div>
    </div>
  </div>

  {/* specialties */}
  <div className="py-28">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
      {/* Left Images */}
      <div className="flex flex-col sm:flex-row items-center gap-6 md:w-1/2 justify-center">
        <img
          src={content[activeTab].img1}
          alt="Dish 1"
          className="w-40 h-40 object-cover rounded-full shadow-lg"
        />
        <img
          src={content[activeTab].img2}
          alt="Dish 2"
          className="w-40 h-40 object-cover rounded-full shadow-lg"
        />
      </div>

      {/* Right Content */}
      <div className="md:w-1/2 text-center md:text-left">
        <p className="text-sm tracking-widest text-gray-500 dark:text-gray-300 font-semibold uppercase">
          Tasty and Crunchy
        </p>
        <h2 className="text-6xl font-medium text-gray-800 dark:text-gray-100 mt-2">
          Our Specialties
        </h2>

        {/* Tabs */}
        <div className="flex justify-center md:justify-start gap-6 mt-6 border-b border-gray-200 dark:border-gray-600">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-semibold uppercase tracking-widest ${
                activeTab === tab
                  ? "border-b-2 border-black dark:border-white text-black dark:text-white"
                  : "text-gray-500 dark:text-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Description */}
        <p className="mt-6 text-gray-600 dark:text-gray-300 leading-relaxed">
          {content[activeTab].description}
        </p>
      </div>
    </div>
  </div>
</div>

  );
};

export default AboutUs;
