import { Link } from "react-router";
import { AuthContext } from "../../Context/ContextProvider";
import { use } from "react";

const FoodCard = ({ food }) => {
  const { _id, name, image, category, description, price } = food;
  const { darkLight } = use(AuthContext);

  return (
    <div
      className={`rounded-[30px] shadow-md overflow-hidden hover:scale-101 duration-200 
        ${darkLight ? "dark" : ""}
        bg-white dark:bg-gray-800`}
    >
      <img src={image} alt={name} className="w-full h-56 object-cover" />
      <div className="p-5 text-center">
        <div className="mb-2 text-xs uppercase tracking-wide font-semibold space-x-1">
          {category.split(",").map((cat, index) => (
            <span
              className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-sm"
              key={index}
            >
              {cat.trim()}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {description}
        </p>

        <p className="text-orange-500 text-xl font-bold mt-2">${price}.00</p>

        <div className="flex flex-col space-y-2 mt-4">
          <Link
            to={`/food-details/${_id}`}
            className="bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 rounded-full flex items-center justify-center gap-2"
          >
            <button>Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
