import React, { use, useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Loading from "../../Shared/Loading/Loading";
import { AuthContext } from "../../Context/ContextProvider";
import GallerySkeleton from "../../Components/GallerySkeleton/GallerySkeleton";

const AllGallery = () => {
  const [foods, setFoods] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { darkLight } = use(AuthContext);

  const slides = foods?.map((food) => ({
    src: food.image,
  }));

  useEffect(() => {
    fetch("https://assignment-11-server-mocha-zeta.vercel.app/all-foods")
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, []);

  if (!foods) return <GallerySkeleton></GallerySkeleton>

  return (
    <section className={`${darkLight ? "dark" : ""}`}>
      <div className="bg-gray-100 dark:bg-gray-900 min-h-[calc(100vh-65px)] pb-[100px]">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-center py-5 uppercase md:text-4xl font-medium text-gray-800 dark:text-white">
            Our <span className="text-yellow-400/80">Gallery</span>
          </h2>

          {/* Images */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-5">
            {foods?.map((food, index) => (
              <div
                key={food._id}
                className="group relative break-inside-avoid mb-5 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => {
                  setCurrentIndex(index);
                  setOpen(true);
                }}
              >
                <div className="absolute w-full h-full bg-black opacity-40 hidden group-hover:block z-20"></div>
                <img
                  className="w-full group-hover:scale-105 transition-all duration-300"
                  src={food.image}
                  alt="food"
                />
              </div>
            ))}
          </div>

          {/* Lightbox */}
          {slides && (
            <Lightbox
              open={open}
              close={() => setOpen(false)}
              slides={slides}
              index={currentIndex}
              plugins={[Zoom, Fullscreen]}
              zoom={{
                scrollToZoom: true,
                maxZoomPixelRatio: 2,
                zoomInMultiplier: 1.5,
                doubleClickDelay: 300,
                doubleTapDelay: 300,
                pinchZoomDistance: 20,
              }}
              styles={{
                container: {
                  backgroundColor: darkLight ? "#111" : "#fff",
                },
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AllGallery;
