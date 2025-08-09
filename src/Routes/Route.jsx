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
import AllGallery from "../Pages/AllGallery/AllGallery";
import AddFood from "../Pages/AddFood/AddFood";
import MyAddedFood from "../Pages/MyAddedFood/MyAddedFood";
import Error from "../Pages/ErrorPage/ErrorPage";

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
        path: "all-foods",
        Component: AllFoods,
      },
      {
        path: "food-details/:id",
        Component: FoodDetails,
      },
      {
        path: "purchase-food/:id",
        element: (
          <Private>
            <FoodPurchase></FoodPurchase>
          </Private>
        ),
      },
      {
        path: "my-orders",
        element: (
          <Private>
            <MyOrder></MyOrder>
          </Private>
        ),
      },
      {
        path: "all-gallery",
        Component: AllGallery,
      },
      {
        path: "add-food",
        element: (
          <Private>
            <AddFood></AddFood>
          </Private>
        ),
      },
      {
        path: "my-food",
        element: (
          <Private>
            <MyAddedFood></MyAddedFood>
          </Private>
        ),
      },
    ],
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
    path: "*",
    Component: Error,
  },
]);
