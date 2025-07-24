import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CloseToMePage from "./pages/CloseToMePage";
import ListPage from "./pages/ListPage";
import StationDetailPage from "./pages/StationDetailPage";
import "./styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import '@fontsource-variable/manrope';
import '@fontsource-variable/sora';
import '@fontsource-variable/chivo';
import '@fontsource-variable/lexend';
import '@fontsource/space-mono';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/nearby",
    element: <CloseToMePage />,
  },
  {
    path: "/list",
    element: <ListPage />,
  },
  {
    path: "/station/:id",
    element: <StationDetailPage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <RouterProvider router={router} />
      </HeroUIProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
