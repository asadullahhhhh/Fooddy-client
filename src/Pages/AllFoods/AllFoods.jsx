import React, { useEffect, useState } from 'react';
import FoodCard from '../../Components/FoodCard/FoodCard';

const AllFoods = () => {

    const [allFoods, setAllFoods] = useState([])
    const [search, setSearch] = useState("")

    useEffect(()=> {
        fetch("http://localhost:5000/all-foods")
            .then(res => res.json())
            .then(data => setAllFoods(data))
    }, [])

    const filteredFoods = allFoods.filter(
      (food) =>
        food.name.toLowerCase().includes(search.toLowerCase()) ||
        food.category.toLowerCase().includes(search.toLowerCase())
    );

    // console.log(filteredFoods);


    if(allFoods.length === 0) return <div><h2>Loading....</h2></div>

    return (
      <section className="bg-gray-100/5">
        <div className="max-w-7xl mx-auto">
          <div>
            <h2 className="text-4xl font-semibold text-center py-5">
              All Foods
            </h2>
          </div>
          <div>
            {allFoods && (
              <div className="text-center">
                <label className="input">
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
                  />
                </label>
              </div>
            )}
          </div>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-5">
            {filteredFoods.map((food, index) => (
              <FoodCard key={food._id} food={food} index={index}></FoodCard>
            ))}
          </div>
        </div>
      </section>
    );
};

export default AllFoods;