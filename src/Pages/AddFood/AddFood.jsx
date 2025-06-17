import React, { use } from "react";
import { AuthContext } from "../../Context/ContextProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddFood = () => {
  const { user, darkLight } = use(AuthContext);
  const navigate = useNavigate();

  const categories = [
    "Bagetci",
    "Burgers",
    "Cook King",
    "Desserts",
    "Drinks",
    "Fusion",
    "Italian",
    "Meat",
    "Munch",
    "Ocean Poke",
    "Pasta",
    "Phuket",
    "Pizza",
    "Salads",
    "Sushi",
    "Vegetarian",
  ];

  const handelFormSubmit = (e) => {
    e.preventDefault();

    const addedBy = {
      name: user?.displayName,
      email: user?.email,
    };

    const form = e.target;
    const formData = new FormData(form);
    const formFields = Object.fromEntries(formData.entries());
    formFields.addedBy = addedBy;
    formFields.purchaseCount = 0;

    axios
      .post("https://assignment-11-server-mocha-zeta.vercel.app/all-foods", {
        data: formFields,
      })
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your food has been added",
            showConfirmButton: false,
            timer: 1500,
          });

          navigate("/my-food");
        }
      });
  };

  return (
    <section
      className={`${
        darkLight ? "dark" : ""
      } min-h-[calc(100vh-65px)] bg-gray-100 dark:bg-gray-900 `}
    >
      <section className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-800 dark:to-gray-900 py-10">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-10">
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
            🍽️ Add a New Food Item
          </h2>
          <form
            onSubmit={handelFormSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Food Name */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Food Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none bg-white dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Enter food name"
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Food Image URL
              </label>
              <input
                type="text"
                name="image"
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none bg-white dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="https://example.com/food.jpg"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Category
              </label>
              <select
                name="category"
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none bg-white dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              >
                <option value="" className="text-gray-500 dark:text-gray-400">
                  select category
                </option>
                {categories.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Origin */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Origin (Country)
              </label>
              <input
                type="text"
                name="origin"
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none bg-white dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="e.g., Italy"
                required
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none bg-white dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="quantity"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none bg-white dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="price"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none bg-white dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Ingredients, how it's made, etc."
                required
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                className="bg-gradient-to-r w-full from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold cursor-pointer hover:from-pink-500 hover:to-purple-500"
              >
                Add Item
              </button>
            </div>
          </form>
        </div>
      </section>
    </section>
  );
};

export default AddFood;
