
import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import HomePage from "../Pages/HomePage/HomePage";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import AllFoods from "../Pages/AllFoods/AllFoods";
import FoodDetails from "../Pages/FoodDetails/FoodDetails";
import Private from "../Private/Private";
import FoodPurchase from "../Pages/FoodPurchase/FoodPurchase";
import MyOrder from "../Pages/MyOrder/MyOrder";

export const route = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "signup",
        Component: Signup,
      },
      {
        path: "all-foods",
        Component: AllFoods,
      },
      {
        path: "food-details/:id",
        Component: FoodDetails,
      },
      {
        path: "purchase-food/:id",
        element : <Private><FoodPurchase></FoodPurchase></Private>
      },
      {
        path : "my-orders",
        element : <Private><MyOrder></MyOrder></Private>
      }
    ],
  },
]);