import React, { useEffect, useState } from 'react';
import FoodCard from '../FoodCard/FoodCard';
import { Link } from 'react-router';

const TopSellingFood = () => {


    const [topFood, setTopFood] = useState([])

    useEffect(()=> {
        fetch("http://localhost:5000/all-foods")
            .then(res => res.json())
            .then(data => {
                const sortedFood = data.sort((a, b) => b.purchaseCount - a.purchaseCount)
                const topSix = sortedFood.slice(0, 6)
                setTopFood(topSix)
            })
    }, [])

    if(topFood.length === 0) return (
      <div className='flex items-center justify-center min-h-[50vh]'>
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );

    return (
        <section className='py-[70px] max-w-7xl mx-auto px-5'>
            <h2 className='text-3xl font-semibold text-center text-gray-700 uppercase'>top selling foods</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
                {
                    topFood.map(food => <FoodCard key={food._id} food={food}></FoodCard>)
                }
            </div>
            <div className='mt-10'>
                <Link to={'/all-foods'}>
                    <button className='btn btn-warning text-white'>See All Foods</button>
                </Link>
            </div>
        </section>
    );
};

export default TopSellingFood;