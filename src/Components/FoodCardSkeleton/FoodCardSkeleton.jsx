// FoodCardSkeleton.jsx
import { use } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AuthContext } from "../../Context/ContextProvider";

export default function FoodCardSkeleton({ count = 6 }) {
  const { darkLight } = use(AuthContext);

  return (
    <div className={`${
        darkLight ? "dark" : ""
      } dark:bg-gray-900`}>
        <div
      className={`grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-6`}
    >
      {Array.from({ length: count }).map((_, index) => {
        const isDark = darkLight;

        return (
          <div
            key={index}
            className={`${
              isDark ? "bg-[#0E1628]" : "bg-white"
            } p-4 rounded-2xl shadow-lg flex flex-col`}
          >
            {/* Image */}
            <Skeleton
              height={180}
              borderRadius="0.75rem"
              baseColor={isDark ? "#1A243B" : "#E5E7EB"}
              highlightColor={isDark ? "#2A3A5E" : "#F3F4F6"}
            />

            <div className="mt-4 space-y-2">
              {/* Category */}
              <Skeleton
                width={80}
                height={20}
                baseColor={isDark ? "#1A243B" : "#E5E7EB"}
                highlightColor={isDark ? "#2A3A5E" : "#F3F4F6"}
              />

              {/* Title */}
              <Skeleton
                width="60%"
                height={20}
                baseColor={isDark ? "#1A243B" : "#E5E7EB"}
                highlightColor={isDark ? "#2A3A5E" : "#F3F4F6"}
              />

              {/* Description */}
              <Skeleton
                count={2}
                height={15}
                baseColor={isDark ? "#1A243B" : "#E5E7EB"}
                highlightColor={isDark ? "#2A3A5E" : "#F3F4F6"}
              />

              {/* Price */}
              <Skeleton
                width={100}
                height={20}
                baseColor={isDark ? "#1A243B" : "#E5E7EB"}
                highlightColor={isDark ? "#2A3A5E" : "#F3F4F6"}
              />

              {/* Button */}
              <Skeleton
                height={40}
                borderRadius="0.5rem"
                baseColor={isDark ? "#1A243B" : "#E5E7EB"}
                highlightColor={isDark ? "#2A3A5E" : "#F3F4F6"}
              />
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
}
