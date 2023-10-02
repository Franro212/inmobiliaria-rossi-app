import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import RegistrarInmueble from "./Components/ComponentsInmu/RegistrarInmueble";
import GestionPublicaciones from "./Pages/GestionPublicaciones/GestionPublicaciones";
import GestionUsuarios from "./Pages/GestionUsuarios/GestionUsuarios";
import HomeAdmin from "./Pages/HomeAdmin/HomeAdmin.jsx";
import PageLogin from "./Pages/PageLogin/PageLogin";

import App from "./Routes/App/App";

import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import Empresa from "./Pages/Empresa/Empresa";
import Estudio from "./Pages/Estudio/Estudio";
import Propiedades from "./Pages/Propiedades/Propiedades";
import DetallePropiedad from "./Pages/DetallePropiedad/DetallePropiedad";



const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/"} replace />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "pageLogin",
    element: <PageLogin />,
  },
  {
    path: "pagePropiedades",
    element: <Propiedades />,
  },
  {
    path: "pageDetallePropiedade/:id",
    element: <DetallePropiedad />,
  },

  {
    path: "homeAdmin",
    element: (
      <ProtectedRoute>
        <HomeAdmin />,
      </ProtectedRoute>
    ),
  },

  {
    path: "gestionUsuarios",
    element: (
      <ProtectedRoute>
        <GestionUsuarios />,
      </ProtectedRoute>
    ),
  },

  {
    path: "gestionPublicaciones",
    element: (
      <ProtectedRoute>
        <GestionPublicaciones />,
      </ProtectedRoute>
    ),
  },
  {
    path: "registrarInmueble",
    element: (
      <ProtectedRoute>
        <RegistrarInmueble />,
      </ProtectedRoute>
    ),
  },
  {
    path: "registrarInmueble/:id",
    element: (
      <ProtectedRoute>
        <RegistrarInmueble />,
      </ProtectedRoute>
    ),
  },
  {
    path: "empresa",
    element: <Empresa />,
  },
  {
    path: "estudio",
    element: <Estudio />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);
