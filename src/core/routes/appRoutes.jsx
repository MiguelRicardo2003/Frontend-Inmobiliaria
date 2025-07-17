import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/Home/Home";
import About from "../../pages/About/About";
import Contact from "../../pages/Contact/Contact";
import Properties from "../../pages/Properties/Properties";
import Service from "../../pages/Services/Service";
import Login from "../../pages/Login/Login";
import PublicLayout from "../../layouts/publicLayout";
import Dashboard from "../../pages/Dashboard/Home/Home";
import DashboardLayout from "../../layouts/DashboardLayout";
import Clients from "../../pages/Dashboard/Clients/Clients";
import Analytics from "../../pages/Dashboard/Analytics/Analytics";
import Calendar from "../../pages/Dashboard/Calendar/Calendar";
import Setting from "../../pages/Dashboard/Settings/Settings";
import Message from "../../pages/Dashboard/Messages/Message";
import Propertie from "../../pages/Dashboard/Properties/Properties";
import Register from "../../pages/Register/Register";

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
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "clients", element: <Clients /> },
      { path: "analytics", element: <Analytics /> },
      { path: "calendar", element: <Calendar /> },
      { path: "properties", element: <Propertie /> },
      { path: "settings", element: <Setting /> },
      { path: "messages", element: <Message /> },
    ],
  },
]);

export default appRoutes;
