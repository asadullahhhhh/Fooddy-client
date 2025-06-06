import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from "motion/react";
import { Link } from 'react-router';

const Banner = () => {
    const [current, setCurrent] = useState(0)

    // banner slides details
    const slides = [
      {
        title: "ORDER FOOD DELIEVERY",
        description: "Experience the taste of gourmet dishes.",
        image:
          "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
      },
      {
        title: "ORDER TAKEAWAY ONLINE",
        description: "Only the freshest ingredients used.",
        image:
          "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M=",
      },
      {
        title: "WE GET WHAT YOU LOVE",
        description: "Enjoy your meal in a cozy setting.",
        image:
          "https://thumbs.dreamstime.com/b/unhealthy-fast-food-delivery-menu-featuring-assorted-burgers-cheeseburgers-nuggets-french-fries-soda-high-calorie-low-356045884.jpg",
      },
    ];

    // looping functionality
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 10000);
      return () => clearInterval(interval);
    }, [slides.length]);
    console.log(current);

    return (
      <div className="lg:h-[80vh] md:h-[60vh] h-[40vh] w-full relative overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="h-full w-full absolute bg-cover bg-center inset-0"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          >
            {/* 🔹 Dark overlay layer */}
            <div className="absolute inset-0 bg-black opacity-35"></div>

            {/* 🔹 Text/content layer */}
            <div className="relative z-10 flex justify-center items-center h-full">
              <div className="lg:space-y-5 space-y-2">
                <motion.h2
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.3, ease: "easeInOut" }}
                  className="lg:text-6xl md:text-4xl text-center text-2xl text-white font-semibold"
                >
                  {slides[current].title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.5, ease: "easeInOut" }}
                  className="text-white/80 text-center lg:text-lg md:text-sm text-[10px] font-medium "
                >
                  {slides[current].description}
                </motion.p>
                <div className="flex justify-center mt-4 md:mt-0">
                  <Link
                    to={"all-foods"}
                    className="bg-yellow-400 md:px-6 md:py-2 px-5 py-1 font-semibold md:text-lg text-white rounded-full"
                  >
                    All foods
                  </Link>
                </div>

                <div className="flex justify-center gap-3 absolute bottom-4 left-[50%] translate-[-50%]">
                  {slides.map((_, index) => (
                    <div
                      key={index}
                      onClick={()=> setCurrent(index)}
                      className={`lg:w-3 lg:h-3 w-2 h-2 rounded-full ${
                        index === current ? "bg-white" : 'bg-gray-300/40'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
};

export default Banner;