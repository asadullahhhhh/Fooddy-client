import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { AnimatePresence, motion } from "motion/react";

const FoodDetails = () => {
    const { id } = useParams(); // Get ID from route

    const [food, setFood] = useState(null);

    useEffect(() => {
      fetch(`http://localhost:5000/food/${id}`)
        .then((res) => res.json())
        .then((data) => setFood(data));
    }, [id]);

    if (!food)
      return <div className="text-center mt-10 text-lg">Loading...</div>;

    return (
      <section className="bg-gray-100 min-h-[calc(100vh-65px)] flex justify-center items-center">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.98,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="max-w-6xl mx-auto px-4 py-10 "
        >
          <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-2xl shadow-md">
            <div className="flex-1">
              <img
                src={food.image}
                alt={food.name}
                className="w-full object-cover rounded-xl h-[400px]"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{food.name}</h2>
                    <p className="text-gray-600 mb-4">{food.description}</p>
                  </div>

                  <div className="space-y-2 text-gray-700">
                    <p>
                      <strong>Category:</strong> {food.category}
                    </p>
                    <p>
                      <strong>Origin:</strong> {food.origin}
                    </p>
                    <p>
                      <strong>Price:</strong> ৳{food.price}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {food.quantity}
                    </p>
                    <p>
                      <strong>Purchase :</strong> {food.purchaseCount || 0}
                    </p>
                    <p>
                      <strong>Owner :</strong> {food.addedBy?.name}
                    </p>
                  </div>
                </div>
                <Link to={"/purchase-food"}>
                  <button className="mt-5 cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200">
                    Purchase
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    );
};

export default FoodDetails;