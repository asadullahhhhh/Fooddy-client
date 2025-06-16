import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/ContextProvider';
import { MdEdit } from 'react-icons/md';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyAddedFood = () => {

    const {user} = use(AuthContext)
    const [foods, setFoods] = useState([])
    const [selectedFood, setSelectedFood] = useState(null);

    

    useEffect(() => {
        fetch(`http://localhost:5000/my-foods?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setFoods(data))
    }, [user])

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

    const handelUpdate = e => {
        e.preventDefault()

        const dummy = e.target
        const form = new FormData(dummy)
        const formData = Object.fromEntries(form.entries()); 
        formData.price = parseInt(formData.price)
        formData.quantity = parseInt(formData.quantity)

        axios.put(`http://localhost:5000/update/${selectedFood._id}`, {
            data : formData
        })
            .then(res => {
                if(res.data.modifiedCount){

                  const updatedFood = foods.map(food => 
                    food._id === selectedFood._id 
                     ? {...food, ...formData}
                     : food
                  )

                  setFoods(updatedFood)

                    document.getElementById("my_modal_1").close();
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "Your has been updated successfully",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                      
                }
            })
    }

    if(foods.length === 0) return (
      <div className="min-h-[calc(100vh-309px)] flex items-center justify-center">
        <div className='space-y-5'>
          <h2 className="text-3xl font-semibold text-red-500/70">
            No added foods found
          </h2>
          <div className='text-center'>
            <Link to={"/add-food"} className='btn btn-neutral'>Add Food</Link>
          </div>
        </div>
      </div>
    );

    return (
      <section className="min-h-[calc(100vh-65px)] bg-gray-100 px-5">
        <h2 className="uppercase text-3xl font-semibold text-center py-5 text-gray-700">
          {" "}
          my added food
        </h2>

        <div>
          <div className=" overflow-x-auto">
            <table className="table table-zebra w-full text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="bg-gray-300 inline-block px-5">Image</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {foods?.map((item) => (
                  <tr key={item._id} className="border-b border-b-gray-300">
                    <td className="bg-gray-200 text-black font-semibold inline-block">
                      <img
                        src={item.image}
                        className="w-[55px] h-[55px] object-cover mx-auto rounded-lg"
                        alt=""
                      />
                    </td>
                    <td className="font-semibold text-gray-800">{item.name}</td>
                    <td className="font-semibold text-gray-600">
                      {item.quantity}
                    </td>
                    <td className="font-semibold text-gray-600">
                      {item.price}
                    </td>
                    <td className="flex gap-2 justify-center py-2">
                      <button
                        onClick={() => {
                          setSelectedFood(item);
                          document.getElementById("my_modal_1").showModal();
                        }}
                        className="btn btn-sm bg-orange-400 hover:bg-orange-500 text-white"
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
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h2 className="text-3xl font-semibold text-center py-5 mb-5">
                Update Your Food
              </h2>
              <form
                onSubmit={handelUpdate}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Food Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Food Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
                    value={selectedFood?.name}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Food Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
                    value={selectedFood?.image}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
                    onChange={handleInputChange}
                  >
                    <option value={selectedFood?.category} selected disabled>{selectedFood?.category}</option>
                    {categories.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Origin */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Origin (Country)
                  </label>
                  <input
                    type="text"
                    name="origin"
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
                    value={selectedFood?.origin}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
                    value={selectedFood?.quantity}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
                    value={selectedFood?.price}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows="4"
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
                    value={selectedFood?.description}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="btn px-6 btn-neutral text-[15px]"
                  >
                    Update
                  </button>
                </div>
              </form>
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn px-8 mt-3 btn-error text-white">
                  Close
                </button>
              </form>
            </div>
          </dialog>
        </div>
      </section>
    );
};

export default MyAddedFood;