
import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import HomePage from "../Pages/HomePage/HomePage";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import AllFoods from "../Pages/AllFoods/AllFoods";

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
        Component : AllFoods
      },
    ],
  },
]);