import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/ContextProvider';
import Loading from '../../Shared/Loading/Loading';
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Link } from 'react-router';
import moment from 'moment/moment';

const MyOrder = () => {

    const {user} = use(AuthContext)
    const [orders, setOrders] = useState(null)

    useEffect(() => {
        fetch(
          `http://localhost:5000/ordered-food?email=${user?.email}`
        ).then(res => res.json())
            .then(data => setOrders(data))
    }, [user])

    // console.log(user);

    if(!orders) return <Loading></Loading>

    return (
      <section className="min-h-[calc(100vh-65px)] bg-gray-100">
        <div className="max-w-7xl mx-auto pb-[100px]">
          <h2 className="uppercase text-center py-5 font-semibold text-4xl">
            Your orders
          </h2>

          <div className=' overflow-x-auto'>
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
                  <tr
                    key={group._id}
                    className="border-b border-b-gray-300"
                  >
                    <td className="bg-gray-200 text-black font-semibold inline-block">
                      <img src={group.image} className='w-[55px] h-[55px] object-cover mx-auto rounded-lg' alt="" />
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
                      {moment(group.date).format('LLLL')}
                    </td>
                    <td className="flex gap-2 justify-center py-2">
                      <button
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