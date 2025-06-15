import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/ContextProvider";
import { data, useNavigate, useParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const FoodPurchase = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate()

  // Getting food data from route stat
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0)
  const { id } = useParams(); // Get ID from route


  useEffect(() => {
    fetch(`http://localhost:5000/food/${id}`)
      .then((res) => res.json())
      .then((data) =>{
        setItem(data);
        setTotalPrice(data.price); // ✅ set price when data loads
      } 
        
    );
  }, [id]);

  useEffect(()=> {
    if (item) {
      setTotalPrice(parseInt(quantity) * item.price);
    }
  }, [quantity, item])

  const handlePurchase = async (e) => {
    e.preventDefault();

    const email = user?.email
    const foodId = item?._id
    const quantity = e.target.quantity.value 
    const docPrice = e.target.price.value; 

    const time = new Date(Date.now())
    const year = time.getFullYear()
    const month = String(time.getMonth() + 1).padStart(2, "0")
    const day = String(time.getDate()).padStart(2, "0")
    const hour = String(time.getHours()).padStart(2, "0")
    const minute = String(time.getMinutes()).padStart(2, "0")
    const sec = String(time.getSeconds()).padStart(2, "0")

    const formatted = `${year}-${month}-${day} ${hour}:${minute}:${sec}`;

    const dataObj = {
      email,
      foodId,
      quantity,
      docPrice,
      date : formatted
    }



    if(item?.quantity !== 0){
      axios.post("http://localhost:5000/ordered-food", dataObj)
        .then(data => {
          if(data.data.insertedId || data.data.modifiedCount){
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your order purchase successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(`/my-orders`)
          }
        })
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Purchase Food</h2>
        <form onSubmit={handlePurchase} className="space-y-4">
          <div>
            <label className="block font-medium">Food Name</label>
            <input
              type="text"
              defaultValue={item?.name}
              readOnly
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium">Price (BDT)</label>
            <input
              type="text"
              value={totalPrice}
              name="price"
              readOnly
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-medium">Quantity</label>
            <div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev - 1)}
                  disabled={quantity <= 1}
                  className={`px-3 py-1 rounded text-white ${
                    quantity <= 1
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500"
                  }`}
                >
                  −
                </button>
                <input
                  type="text"
                  name="quantity"
                  className="border p-2 rounded bg-gray-100"
                  readOnly
                  value={quantity}
                />
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  disabled={item && quantity >= item.quantity}
                  className={`px-3 py-1 rounded text-white ${
                    item && quantity >= item.quantity
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500"
                  }`}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block font-medium">Buyer Name</label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium">Buyer Email</label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          <div>
            {item?.quantity === 0 ? (
              <p className="text-red-500 text-lg font-medium">
                Item is not available
              </p>
            ) : (
              ""
            )}
          </div>

          <button
            type="submit"
            className={`w-full ${
              item?.quantity !== 0
                ? "bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
                : "bg-blue-600/5 py-2 rounded cursor-not-allowed font-medium text-gray-500"
            }`}
          >
            Purchase
          </button>
        </form>
      </div>
    </div>
  );
};

export default FoodPurchase;
