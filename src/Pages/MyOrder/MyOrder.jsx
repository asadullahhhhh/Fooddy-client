import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/ContextProvider';
import Loading from '../../Shared/Loading/Loading';
import { MdDelete } from "react-icons/md";
import moment from 'moment/moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyOrder = () => {

    const {user} = use(AuthContext)
    const [orders, setOrders] = useState(null)


    useEffect(() => {
        fetch(
          `http://localhost:5000/ordered-food?email=${user?.email}`
        ).then(res => res.json())
            .then(data => setOrders(data))
    }, [user])

    // Handel the delete order-button here
    const handelOrderDelete = (id, foodId, quantity) => {
      const idObj = {
        _id: id,
        foodId,
        quantity,
      };

      const filteredData = orders.filter(
        (item) => item._id !== id
      );

      Swal.fire({
        title: "Are you sure?",
        text: "You want to cancle your order?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://localhost:5000/ordered-food`, {
            data : idObj
          })
            .then(res => {
              if(res.data.deletedCount){
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Your has been cancled",
                  showConfirmButton: false,
                  timer: 1500,
                });
                  setOrders(filteredData)
              }
            })

          // 
        }
      });

      

      
    }

    // console.log(orders)

    if(!orders) return <Loading></Loading>

    if(orders.length === 0) return (
      <div className="min-h-[calc(100vh-309px)] bg-gray-100 flex items-center justify-center">
        <div className="space-y-4">
          <h2 className="text-4xl font-semibold text-gray-600">
            No order available
          </h2>
          <div className='text-center'>
            <Link to={'/all-foods'}>
              <button className="btn btn-neutral">order food</button>
            </Link>
          </div>
        </div>
      </div>
    );

    return (
      <section className="min-h-[calc(100vh-65px)] bg-gray-100 px-5">
        <div className="max-w-7xl mx-auto pb-[100px]">
          <h2 className="uppercase text-center py-5 font-semibold text-4xl">
            Your orders
          </h2>

          <div className=" overflow-x-auto">
            <table className="table table-zebra w-full text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="bg-gray-300 inline-block px-5">Image</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Owner</th>
                  <th>Order Date</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((group) => (
                  <tr key={group._id} className="border-b border-b-gray-300">
                    <td className="bg-gray-200 text-black font-semibold inline-block">
                      <img
                        src={group.image}
                        className="w-[55px] h-[55px] object-cover mx-auto rounded-lg"
                        alt=""
                      />
                    </td>
                    <td className="font-semibold text-gray-800">
                      {group.name}
                    </td>
                    <td className="font-semibold text-gray-600">
                      {group.quantity}
                    </td>
                    <td className="font-semibold text-gray-600">
                      {group.basePrice * group.quantity}
                    </td>
                    <td className="font-semibold text-gray-600">
                      {group.owner}
                    </td>
                    <td className="font-semibold text-gray-600">
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