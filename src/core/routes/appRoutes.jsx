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
import Clients from "../../pages/Dashboard/Clients";
import Analytics from "../../pages/Dashboard/Analytics";
import Calendar from "../../pages/Dashboard/Calendar";
import Setting from "../../pages/Dashboard/Settings";
import Message from "../../pages/Dashboard/Message";
import Propertie from "../../pages/Dashboard/Properties";
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
