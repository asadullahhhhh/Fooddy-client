import React, { useEffect, useState } from 'react';

const AllGallery = () => {

    const [foods, setFoods] = useState(null)

    useEffect(()=> {
        fetch("http://localhost:5000/all-foods")
            .then(res => res.json())
            .then(data => setFoods(data))
    }, [])

    return (
      <section className="bg-gray-100 min-h-[calc(100vh-65px)]">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-center py-5 uppercase md:text-4xl font-medium">
            Our <span className="text-yellow-400/80">Gallery</span>
          </h2>

          {/* imgs */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-5 ">
            {foods?.map((food) => (
              <div key={food._id} className="group relative break-inside-avoid mb-5 rounded-lg overflow-hidden cursor-pointer">
                <div className='absolute w-full h-full bg-black opacity-40 hidden group-hover:block z-20'></div>
                <img className=' w-full group-hover:scale-105 transition-all duration-300' src={food.image}></img>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};

export default AllGallery;