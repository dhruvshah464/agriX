import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/layout/Layout";
import AssistantPage from "../pages/AssistantPage";
import ForecastPage from "../pages/ForecastPage";
import MapInsightsPage from "../pages/MapInsightsPage";
import NotFoundPage from "../pages/NotFoundPage";
import OverviewPage from "../pages/OverviewPage";
import PredictionPage from "../pages/PredictionPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: "predict", element: <PredictionPage /> },
      { path: "forecast", element: <ForecastPage /> },
      { path: "maps", element: <MapInsightsPage /> },
      { path: "assistant", element: <AssistantPage /> },
    ],
    errorElement: <NotFoundPage />,
  },
]);
