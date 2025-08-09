import React, { use, useEffect, useState } from "react";
import FoodCard from "../../Components/FoodCard/FoodCard";
import Loading from "../../Shared/Loading/Loading";
import { AuthContext } from "../../Context/ContextProvider";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { RingLoader } from "react-spinners";
import FoodCardSkeleton from "../../Components/FoodCardSkeleton/FoodCardSkeleton";

const AllFoods = () => {
  const [search, setSearch] = useState("");
  const { darkLight } = use(AuthContext);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["foods", { search }],
    queryFn: async ({ pageParam = 1, queryKey }) => {
      const [_key, { search }] = queryKey;
      const res = await axios.get(`http://localhost:5000/all-foods`, {
        params: {
          page: pageParam,
          limit: 9,
          search,
        },
      });
      return res?.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.hasMore ? allPages.length + 1 : undefined;
    },
  });

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const foods = data?.pages.flatMap((page) => page.foods);

  console.log(foods);

  return (
    <section className={`${darkLight ? "dark" : ""}`}>
      <div className="bg-gray-100 dark:bg-gray-900 pb-[100px] min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div>
            <h2 className="text-4xl font-semibold text-center py-5 text-gray-800 dark:text-white">
              All Foods
            </h2>
          </div>

          {/* Search */}
          <div className="flex justify-center items-center">
            <label className="input input-bordered flex items-center gap-2 bg-white dark:bg-gray-800 dark:text-white border dark:border-gray-600">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                required
                placeholder="Search"
                className="grow bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </label>
          </div>

          {isLoading ? (
            <FoodCardSkeleton></FoodCardSkeleton>
          ) : (
            <>
              {/* Food Grid */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-5">
                {foods?.map((food, index) => (
                  <FoodCard key={food._id} food={food} index={index} />
                ))}
              </div>
            </>
          )}

          {/* Infinite scroll trigger */}
          {hasNextPage && (
            <div ref={ref} className="h-10 my-10 py-10">
              {isFetchingNextPage && (
                <div className="flex justify-center items-center">
                  <RingLoader color={darkLight ? "#fff" : "#000"} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllFoods;
