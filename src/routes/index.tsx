import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  BOOKING_PATH,
  HOME_PATH,
  LOGIN_PATH,
  MY_RIDES_PATH,
  REGISTER_PATH,
  RIDER,
  ROOT_PATH,
} from "./path";
import { DashboardLayout } from "../features/dashboard";
import { HomePage } from "../features/dashboard/pages/HomePage";
import { BookingPage } from "../features/dashboard/pages/BookingPage";
import { Login } from "../features/auth/pages/Login";
import { Register } from "../features/auth/pages/Register";
import { MyRides } from "../features/myRides/MyRides";
import { Rider } from "../rider/Rider";

export const routes = createBrowserRouter([
  {
    children: [
      {
        element: <HomePage />,
        path: HOME_PATH,
      },
      {
        element: <Navigate to={HOME_PATH} replace />,
        path: ROOT_PATH,
      },
      {
        element: <BookingPage />,
        path: BOOKING_PATH,
      },
      {
        element: <MyRides />,
        path: MY_RIDES_PATH,
      },
      {
        element: <Login />,
        path: LOGIN_PATH,
      },
      {
        element: <Register />,
        path: REGISTER_PATH,
      },
      {
        element: <Rider />,
        path: RIDER,
      },
    ],
    element: <DashboardLayout />,
  },
]);
