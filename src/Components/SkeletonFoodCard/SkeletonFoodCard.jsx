import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AuthContext } from "../../Context/ContextProvider";

export default function SkeletonFoodCard() {
  const { darkLight } = useContext(AuthContext);

  // Dark এবং Light mode এর জন্য skeleton color
  const baseColor = darkLight ? "#1A243B" : "#E5E7EB";
  const highlightColor = darkLight ? "#2A3A5E" : "#F3F4F6";

  return (
    <div
      className={`p-4 rounded-xl ${
        darkLight ? "bg-gray-800" : "bg-white"
      }`}
    >
      {/* Image Skeleton */}
      <Skeleton
        height={160}
        className="mb-4 rounded-lg"
        baseColor={baseColor}
        highlightColor={highlightColor}
      />

      {/* Category Badge */}
      <Skeleton
        width={70}
        height={18}
        className="mb-2 rounded"
        baseColor={baseColor}
        highlightColor={highlightColor}
      />

      {/* Title */}
      <Skeleton
        width={`80%`}
        height={22}
        className="mb-2 rounded"
        baseColor={baseColor}
        highlightColor={highlightColor}
      />

      {/* Description */}
      <Skeleton
        count={2}
        height={14}
        className="mb-3 rounded"
        baseColor={baseColor}
        highlightColor={highlightColor}
      />

      {/* Price */}
      <Skeleton
        width={80}
        height={20}
        className="mb-3 rounded"
        baseColor={baseColor}
        highlightColor={highlightColor}
      />

      {/* Button */}
      <Skeleton
        height={40}
        className="rounded-lg"
        baseColor={baseColor}
        highlightColor={highlightColor}
      />
    </div>
  );
}
