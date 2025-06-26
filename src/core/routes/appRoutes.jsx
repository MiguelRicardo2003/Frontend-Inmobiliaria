import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/Home/Home";
import About from "../../pages/About/About"; 
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
    ]
  },
  {
    path: "about",
    element: <About />,
  },

]);

export default appRoutes;
