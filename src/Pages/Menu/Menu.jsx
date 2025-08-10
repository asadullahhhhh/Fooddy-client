import React, { use } from "react";
import menu1 from "../../assets/menu-image1.png"
import menu2 from "../../assets/menu-image2.png"
import menu3 from "../../assets/menu-image3.png"
import menu4 from "../../assets/pricing-img-1.png"
import menu5 from "../../assets/pricing-img-2.png"
import menu6 from "../../assets/menu-image6.png"
import menu7 from "../../assets/menu-image7.png"
import menu8 from "../../assets/menu-image8.png"
import menuGallery from "../../assets/menu-gallery-1.jpg"
import menuGallery1 from "../../assets/image-gallery-2.jpg"
import menuGallery2 from "../../assets/image-gallery-3.jpg"
import menuGallery3 from "../../assets/image-gallery-4.jpg"
import { AuthContext } from "../../Context/ContextProvider";

const Menu = () => {

 
   const {darkLight} = use(AuthContext)

  const menuItems = [
    {
      name: "SPAGHETTI BOLOGNESE",
      description: "Lorem ipsum dolor sit amet, feugiat delicata.",
      price: "$18.00",
      image: menu1,
      featured: true,
    },
    {
      name: "SALMON STEAK",
      description: "Lorem ipsum dolor sit amet, feugiat delicata.",
      price: "$35.00",
      image: menu2
    },
    {
      name: "VEGETARIAN PIZZA",
      description: "Lorem ipsum dolor sit amet, feugiat delicata.",
      price: "$20.00",
      image:menu3,
      featured: true,
    },
    {
      name: "CHICKEN PASTA",
      description: "Lorem ipsum dolor sit amet, feugiat delicata.",
      price: "$22.00",
      image: menu4
    },
    {
      name: "TOMATO SOUP",
      description: "Lorem ipsum dolor sit amet, feugiat delicata.",
      price: "$14.00",
      image: menu5
    },
    {
      name: "BEEF TACOS",
      description: "Lorem ipsum dolor sit amet, feugiat delicata.",
      price: "$23.00",
      image: menu6
    },
    {
      name: "CAESAR SALAD",
      description: "Lorem ipsum dolor sit amet, feugiat delicata.",
      price: "$13.00",
      image: menu7
    },
    {
      name: "SHRIMP ALFREDO",
      description: "Lorem ipsum dolor sit amet, feugiat delicata.",
      price: "$33.00",
      image: menu8
    },
  ];

  return (
    <div className={`${darkLight ? 'dark' : ''} mt-[64px] bg-gray-100 dark:bg-gray-900 lg:mt-[72px] min-h-screen`}>
  {/* Banner background */}
  <div
    className={`bg-cover bg-center relative h-56 md:h-72 w-full flex items-center justify-center`}
    style={{ backgroundImage: `url('../../../src/assets/menu-bg.jpg')` }}
  >
    <div className="absolute w-full h-full bg-black/30"></div>
    <h2 className=" text-5xl lg:text-7xl text-center text-white z-20">
      Our Menu
    </h2>
  </div>

  {/* Menu */}
  <div>
    <div className="flex justify-center px-5 lg:px-0 items-center text-center pt-[130px] pb-[80px]">
      <div className="space-y-3">
        <p className="text-gray-400 dark:text-gray-400 font-semibold">TASTY AND CRUNCHY</p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-gray-600 dark:text-gray-100">
          AWESOME STARTERS
        </h2>
        <p className="max-w-[700px] md:text-base text-xs text-gray-400 dark:text-gray-300 pt-2 lg:pt-5">
          Consectetur adipiscing elit, sed do eiusmod tempor incidition
          ullamco laboris nisi ut aliquip ex ea commodo condorico
          consectetur adipiscing elit, sed do eiusmod tempor incidition
          ullam.
        </p>
      </div>
    </div>

    {/* items */}
    <div className="max-w-7xl mx-auto px-4 pb-12 grid grid-cols-1 md:grid-cols-2 gap-10">
      {menuItems.map((item, index) => (
        <div key={index} className="flex items-start space-x-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 rounded-full object-cover border border-gray-300 dark:border-gray-700"
          />
          <div className="flex-1 border-b border-gray-300 dark:border-gray-700 pb-4">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-lg uppercase tracking-wide text-gray-800 dark:text-gray-100">
                {item.name}
                {item.featured && (
                  <span className="text-yellow-500 ml-1">*</span>
                )}
              </h4>
              <span className="font-semibold text-gray-600 dark:text-gray-200">
                {item.price}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
          </div>
        </div>
      ))}
    </div>

    {/* iamge gallery */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-5 pb-[100px]">
      <div className="group overflow-hidden">
        <img className="group-hover:scale-105 duration-500" src={menuGallery} alt="" />
      </div>
      <div className="group overflow-hidden">
        <img className="group-hover:scale-105 duration-500" src={menuGallery1} alt="" />
      </div>
      <div className="group overflow-hidden">
        <img className="group-hover:scale-105 duration-500" src={menuGallery2} alt="" />
      </div>
      <div className="group overflow-hidden">
        <img className="group-hover:scale-105 duration-500" src={menuGallery3} alt="" />
      </div>
    </div>
  </div>
</div>

  );
};

export default Menu;
