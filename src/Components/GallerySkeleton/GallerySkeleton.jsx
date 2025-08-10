import React, { use } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AuthContext } from "../../Context/ContextProvider";

const GallerySkeleton = () => {
  
    const { darkLight } = use(AuthContext);

  return (
    <div className={`${darkLight ? "dark" : ""} dark:bg-gray-900 mt-[64px] lg:mt-[72px]`}>
      <div
        className="gallery-skeleton max-w-7xl columns-1 md:columns-2 lg:columns-3 gap-5 py-16 mx-auto"
        // style={{
        //   display: "grid",
        //   gridTemplateColumns: "repeat(3, 1fr)",
        //   gap: "10px",
        //   padding: "10px",
        // }}
      >
        {/* Left big rectangle (pizza) */}
        <Skeleton
          height={300}
          baseColor={darkLight ? "#1A243B" : "#E5E7EB"}
          highlightColor={darkLight ? "#2A3A5E" : "#F3F4F6"}
        />

        {/* Top middle (salad) */}
        <Skeleton
          height={150}
          baseColor={darkLight ? "#1A243B" : "#E5E7EB"}
          highlightColor={darkLight ? "#2A3A5E" : "#F3F4F6"}
        />

        {/* Right tall rectangle (chocolate cake) */}
        <Skeleton
          height={350}
          baseColor={darkLight ? "#1A243B" : "#E5E7EB"}
          highlightColor={darkLight ? "#2A3A5E" : "#F3F4F6"}
        />

        {/* Below left big pizza (another pizza) */}
        <Skeleton
          height={200}
          baseColor={darkLight ? "#1A243B" : "#E5E7EB"}
          highlightColor={darkLight ? "#2A3A5E" : "#F3F4F6"}
        />

        {/* Middle center (salad) */}
        <Skeleton
          height={180}
          baseColor={darkLight ? "#1A243B" : "#E5E7EB"}
          highlightColor={darkLight ? "#2A3A5E" : "#F3F4F6"}
        />

        {/* Below right cake (oven pizza) */}
        <Skeleton
          height={130}
          baseColor={darkLight ? "#1A243B" : "#E5E7EB"}
          highlightColor={darkLight ? "#2A3A5E" : "#F3F4F6"}
        />

        {/* Left narrow rectangle (pasta) */}
        <Skeleton
          height={140}
          baseColor={darkLight ? "#1A243B" : "#E5E7EB"}
          highlightColor={darkLight ? "#2A3A5E" : "#F3F4F6"}
        />

        {/* Middle bottom (stir fry) */}
        <Skeleton
          height={220}
          baseColor={darkLight ? "#1A243B" : "#E5E7EB"}
          highlightColor={darkLight ? "#2A3A5E" : "#F3F4F6"}
        />

        {/* Right bottom (salad bowl) */}
        <Skeleton
          height={220}
          baseColor={darkLight ? "#1A243B" : "#E5E7EB"}
          highlightColor={darkLight ? "#2A3A5E" : "#F3F4F6"}
        />
      </div>
    </div>
  );
};

export default GallerySkeleton;
