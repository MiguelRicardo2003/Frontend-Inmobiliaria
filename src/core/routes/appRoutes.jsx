import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/Home/Home";
import About from "../../pages/About/About";
import Contact from "../../pages/Contact/Contact";
import Properties from "../../pages/Properties/Properties";
import Service from "../../pages/Services/Service";
import Login from "../../pages/Login/Login";
import PublicLayout from "../../layouts/publicLayout";
import Dashboard from "../../pages/Dashboard/Dashboard";
import DashboardLayout from "../../layouts/DashboardLayout";

const appRoutes = createBrowserRouter([


  {
    path: "/",
    element: <PublicLayout />,
    children: [
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
        element: <Properties />,
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
  {
    path: "dashboard",
    element: <DashboardLayout/>,
    children: [
      { path: "", element: <Dashboard /> },
      // { path: "clientes", element: <Clientes /> },
      // { path: "analytics", element: <Analytics /> },
      // más rutas internas
    ]
  }

]);

export default appRoutes;
