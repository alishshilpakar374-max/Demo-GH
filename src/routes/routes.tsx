import { createBrowserRouter } from "react-router-dom";

import App from "../App";

import {
  Hero,
  Rooms,
  Amenities,
  Dining,
  Gallery,
  Contact,
  Login,
} from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Hero />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dining",
        element: <Dining />,
      },
      {
        path: "rooms",
        element: <Rooms />,
      },
      {
        path: "amenities",
        element: <Amenities />,
      },
      {
        path: "gallery",
        element: <Gallery />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);
