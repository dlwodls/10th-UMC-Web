import MoviesPage from "./pages/MoviePage";
import { createBrowserRouter, Router } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { RouterProvider } from "react-router-dom";
import MovieDetailPage from "./pages/MovieDetailPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
      path: 'movies/:category',
      element: <MoviesPage />,
      },
      {
        path: 'movies/:category/:movieId',
        element: <MovieDetailPage />
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;