import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/Home/Home";
import About from "../../pages/About/About"; 
import Contact from "../../pages/Contact/Contact";
import Propertie from "../../pages/Properties/Propertie";
import Service from "../../pages/Services/Service";
import Login from "../../pages/Login/Login";
import PublicLayout from "../../layouts/publicLayout";

const appRoutes = createBrowserRouter([

  {
    path: "/",
    element: <PublicLayout />,
    children:[
      {
        path: "/",
        element: <Home />,
      },    
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "properties",
        element: <Propertie />,
      },
      {
        path: "services",
        element: <Service />,
      },
    ]
  },
  {
    path: "login",
    element: <Login />,
  },

]);

export default appRoutes;
