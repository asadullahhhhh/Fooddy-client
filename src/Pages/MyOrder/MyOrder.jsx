import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/ContextProvider";
import Loading from "../../Shared/Loading/Loading";
import { MdDelete } from "react-icons/md";
import moment from "moment/moment";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAxiosSecure from "../../hook/useAxiosSecure";

const MyOrder = () => {
  const { user, darkLight } = use(AuthContext);
  const [orders, setOrders] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure(`ordered-food?email=${user?.email}`).then((data) => {
      setOrders(data?.data);
    });
  }, [user, axiosSecure]);

  const handelOrderDelete = (id, foodId, quantity) => {
    const idObj = { _id: id, foodId, quantity };
    const filteredData = orders.filter((item) => item._id !== id);

    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel your order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/ordered-food`, { data: idObj })
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your order has been canceled",
                showConfirmButton: false,
                timer: 1500,
              });
              setOrders(filteredData);
            }
          });
      }
    });
  };

  if (!orders) return <Loading />;

  if (orders.length === 0)
    return (
      <div
        className={`min-h-[calc(100vh-309px)] flex items-center justify-center bg-gray-100 dark:bg-gray-900 ${
          darkLight ? "dark" : ""
        }`}
      >
        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-semibold text-gray-600 dark:text-gray-300">
            No order available
          </h2>
          <Link to={"/all-foods"}>
            <button className="btn btn-neutral">Order Food</button>
          </Link>
        </div>
      </div>
    );

  return (
    <section
      className={`min-h-[calc(100vh-65px)] dark:bg-gray-900 ${
        darkLight ? "dark" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto pb-[100px] bg-gray-100 dark:bg-gray-900">
        <h2 className="uppercase text-center py-5 font-semibold text-4xl text-gray-800 dark:text-white">
          Your Orders
        </h2>

        <div className="overflow-x-auto px-5">
          <table className="table table-zebra w-full text-sm">
            <thead className="bg-gray-200 dark:bg-gray-800">
              <tr>
                <th className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white">
                  Image
                </th>
                <th className="text-gray-800 dark:text-white">Name</th>
                <th className="text-gray-800 dark:text-white">Quantity</th>
                <th className="text-gray-800 dark:text-white">Price</th>
                <th className="text-gray-800 dark:text-white">Owner</th>
                <th className="text-gray-800 dark:text-white">Order Date</th>
                <th className="text-center text-gray-800 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((group) => (
                <tr
                  key={group._id}
                  className="border-b border-gray-300 dark:border-gray-700"
                >
                  <td className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white font-semibold px-2 py-1">
                    <img
                      src={group.image}
                      className="w-[55px] h-[55px] object-cover mx-auto rounded-lg"
                      alt=""
                    />
                  </td>
                  <td className="font-semibold text-gray-800 dark:text-gray-200">
                    {group.name}
                  </td>
                  <td className="font-semibold text-gray-600 dark:text-gray-300">
                    {group.quantity}
                  </td>
                  <td className="font-semibold text-gray-600 dark:text-gray-300">
                    ${group.basePrice * group.quantity}
                  </td>
                  <td className="font-semibold text-gray-600 dark:text-gray-300">
                    {group.owner}
                  </td>
                  <td className="font-semibold text-gray-600 dark:text-gray-300">
                    {moment(group.date).format("LLLL")}
                  </td>
                  <td className="flex gap-2 justify-center py-2">
                    <button
                      onClick={() =>
                        handelOrderDelete(
                          group._id,
                          group.foodId,
                          group.quantity
                        )
                      }
                      className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MyOrder;
