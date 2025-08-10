import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/ContextProvider";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAxiosSecure from "../../hook/useAxiosSecure";

const MyAddedFood = () => {
  const { user, darkLight } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure(`my-foods?email=${user?.email}`).then((res) => {
      setFoods(res.data);
    });
  }, [user, axiosSecure]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedFood((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handelUpdate = (e) => {
    e.preventDefault();

    const dummy = e.target;
    const form = new FormData(dummy);
    const formData = Object.fromEntries(form.entries());
    formData.price = parseInt(formData.price);
    formData.quantity = parseInt(formData.quantity);

    axios
      .put(
        `https://assignment-11-server-mocha-zeta.vercel.app/update/${selectedFood._id}`,
        {
          data: formData,
        }
      )
      .then((res) => {
        if (res.data.modifiedCount) {
          const updatedFood = foods.map((food) =>
            food._id === selectedFood._id ? { ...food, ...formData } : food
          );

          setFoods(updatedFood);

          document.getElementById("my_modal_1").close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your has been updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  if (foods.length === 0)
    return (
      <div
        className={`min-h-[calc(100vh-309px)] mt-[64px] flex items-center dark:bg-gray-900 justify-center ${
          darkLight ? "dark" : ""
        }`}
      >
        <div className="space-y-5 text-center">
          <h2 className="text-3xl font-semibold text-red-500/70 dark:text-red-400">
            No added foods found
          </h2>
          <Link to={"/add-food"} className="btn btn-neutral dark:btn-neutral">
            Add Food
          </Link>
        </div>
      </div>
    );

  return (
    <section
      className={`min-h-[calc(100vh-65px)] mt-[64px] lg:mt-[72px] px-5 ${
        darkLight
          ? "dark bg-gray-900 text-gray-300"
          : "bg-gray-100 text-gray-700"
      }`}
    >
      <h2 className="uppercase text-3xl font-semibold text-center py-5">
        my added food
      </h2>

      <div>
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="table table-zebra w-full text-sm border border-gray-300 dark:border-gray-700">
            <thead
              className={`${
                darkLight
                  ? "bg-gray-700 text-gray-200"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              <tr>
                <th className="bg-gray-300 inline-block px-5 dark:bg-gray-600">
                  Image
                </th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods?.map((item) => (
                <tr
                  key={item._id}
                  className={`border-b ${
                    darkLight
                      ? "border-gray-700 hover:bg-gray-800"
                      : "border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  <td
                    className={`inline-block px-5 font-semibold ${
                      darkLight ? "bg-gray-800 text-gray-300" : "bg-gray-200"
                    }`}
                  >
                    <img
                      src={item.image}
                      className="w-[55px] h-[55px] object-cover mx-auto rounded-lg"
                      alt=""
                    />
                  </td>
                  <td className="font-semibold">{item.name}</td>
                  <td className="font-semibold">{item.quantity}</td>
                  <td className="font-semibold">{item.price}</td>
                  <td className="flex gap-2 justify-center py-2">
                    <button
                      onClick={() => {
                        setSelectedFood(item);
                        document.getElementById("my_modal_1").showModal();
                      }}
                      className="btn btn-sm bg-orange-400 hover:bg-orange-500 text-white dark:bg-orange-600 dark:hover:bg-orange-700"
                    >
                      <MdEdit size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        <dialog
          id="my_modal_1"
          className={`modal ${
            darkLight ? "bg-gray-900 text-gray-300" : "bg-white text-gray-700"
          } rounded-lg p-0`}
        >
          <div
            className={`modal-box ${
              darkLight ? "bg-gray-900 text-gray-300" : "bg-white text-gray-700"
            }`}
          >
            <h2 className="text-3xl font-semibold text-center py-5 mb-5">
              Update Your Food
            </h2>
            <form
              onSubmit={handelUpdate}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Food Name */}
              <div>
                <label className="block mb-1 font-medium">Food Name</label>
                <input
                  type="text"
                  name="name"
                  className={`w-full px-4 py-2 border rounded-xl focus:ring-2 outline-none ${
                    darkLight
                      ? "bg-gray-800 border-gray-700 focus:ring-purple-600 text-gray-300"
                      : "bg-white border-gray-300 focus:ring-purple-400 text-gray-700"
                  }`}
                  value={selectedFood?.name}
                  onChange={handleInputChange}
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block mb-1 font-medium">Food Image URL</label>
                <input
                  type="text"
                  name="image"
                  className={`w-full px-4 py-2 border rounded-xl focus:ring-2 outline-none ${
                    darkLight
                      ? "bg-gray-800 border-gray-700 focus:ring-purple-600 text-gray-300"
                      : "bg-white border-gray-300 focus:ring-purple-400 text-gray-700"
                  }`}
                  value={selectedFood?.image}
                  onChange={handleInputChange}
                />
              </div>

              {/* Category */}
              <div>
                <label className="block mb-1 font-medium">Category</label>
                <select
                  name="category"
                  className={`w-full px-4 py-2 border rounded-xl focus:ring-2 outline-none ${
                    darkLight
                      ? "bg-gray-800 border-gray-700 focus:ring-purple-600 text-gray-300"
                      : "bg-white border-gray-300 focus:ring-purple-400 text-gray-700"
                  }`}
                  onChange={handleInputChange}
                  value={selectedFood?.category}
                >
                  <option value={selectedFood?.category} disabled>
                    {selectedFood?.category}
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
                <label className="block mb-1 font-medium">
                  Origin (Country)
                </label>
                <input
                  type="text"
                  name="origin"
                  className={`w-full px-4 py-2 border rounded-xl focus:ring-2 outline-none ${
                    darkLight
                      ? "bg-gray-800 border-gray-700 focus:ring-purple-600 text-gray-300"
                      : "bg-white border-gray-300 focus:ring-purple-400 text-gray-700"
                  }`}
                  value={selectedFood?.origin}
                  onChange={handleInputChange}
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block mb-1 font-medium">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  className={`w-full px-4 py-2 border rounded-xl focus:ring-2 outline-none ${
                    darkLight
                      ? "bg-gray-800 border-gray-700 focus:ring-purple-600 text-gray-300"
                      : "bg-white border-gray-300 focus:ring-purple-400 text-gray-700"
                  }`}
                  value={selectedFood?.quantity}
                  onChange={handleInputChange}
                />
              </div>

              {/* Price */}
              <div>
                <label className="block mb-1 font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  className={`w-full px-4 py-2 border rounded-xl focus:ring-2 outline-none ${
                    darkLight
                      ? "bg-gray-800 border-gray-700 focus:ring-purple-600 text-gray-300"
                      : "bg-white border-gray-300 focus:ring-purple-400 text-gray-700"
                  }`}
                  value={selectedFood?.price}
                  onChange={handleInputChange}
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  name="description"
                  rows="4"
                  className={`w-full px-4 py-2 border rounded-xl focus:ring-2 outline-none resize-none ${
                    darkLight
                      ? "bg-gray-800 border-gray-700 focus:ring-purple-600 text-gray-300"
                      : "bg-white border-gray-300 focus:ring-purple-400 text-gray-700"
                  }`}
                  value={selectedFood?.description}
                  onChange={handleInputChange}
                />
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="btn px-6 btn-neutral dark:btn-neutral text-[15px]"
                >
                  Update
                </button>
              </div>
            </form>
            <form method="dialog" className="mt-3 text-center">
              <button className="btn px-8 btn-error text-white">Close</button>
            </form>
          </div>
        </dialog>
      </div>
    </section>
  );
};

export default MyAddedFood;
