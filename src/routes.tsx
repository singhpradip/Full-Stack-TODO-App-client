import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/LoginPage.tsx";
import SignUp from "./pages/SignUpPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import AppLayout from "./pages/AppLayout.tsx";
import AllTasks from "./components/TaskComponents/AllTasks.tsx";
import PendingTasks from "./components/TaskComponents/PendingTasks.tsx";
import InProgressTasks from "./components/TaskComponents/InProgressTasks.tsx";
import CompletedTasks from "./components/TaskComponents/CompletedTasks.tsx";
import EditProfile from "./components/EditProfile.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <AllTasks /> },
      { path: "pending", element: <PendingTasks /> },
      { path: "in-progress", element: <InProgressTasks /> },
      { path: "completed", element: <CompletedTasks /> },
      { path: "profile", element: <EditProfile /> },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthProvider>
        <Login />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: (
      <AuthProvider>
        <SignUp />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

const MainRoutes = () => {
  return <RouterProvider router={router} />;
};

export default MainRoutes;
