import React, { use, useState } from "react";
import { AuthContext } from "../../Context/ContextProvider";

const FoodPurchase = () => {
  const { user } = use(AuthContext)

  // Getting food data from route stat
  const [quantity, setQuantity] = useState(1);

  const handlePurchase = async (e) => {
    e.preventDefault();

    

    
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
              readOnly
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium">Price (BDT)</label>
            <input
              type="text"
              readOnly
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium">Quantity</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Purchase
          </button>
        </form>
      </div>
    </div>
  );
};

export default FoodPurchase;
