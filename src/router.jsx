import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  useLocation,
} from "react-router-dom";
import PropTypes from "prop-types";
import LoginPage from "./pages/login-page";
import HomePage from "./pages/home-page";
import SignupPage from "./pages/signup-page";
import ForgotPasswordPage from "./pages/forgot-password-page";
import MyResumes from "./pages/app/my-resumes-page";
import useAuth from "./hooks/useAuth";
import MainLayout from "./layouts/main-layout";
import BuildResume from "./pages/app/build-resume-page";
import ReviewSystem from "./pages/app/review-system-page";
import TemplatesPage from "./pages/app/templates-page";
import ErrorPage from "./pages/error-page";
import UserProfilePage from "./pages/app/user-profile-page";
import Skeleton from "react-loading-skeleton";
import ResetPasswordPage from "./pages/reset-password-page";
import CreateTemplatePage from "./pages/app/create-template-page";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-screen relative">
        <div className="z-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-3xl text-gray-800 font-semibold">Loading...</h1>
        </div>
        <Skeleton className="w-full h-screen" baseColor="#e5e7eb" />
      </div>
    );
  }
  return !isAuthenticated ? children : <Navigate to="/app" replace />;
};
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="w-full h-screen relative">
        <div className="z-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-3xl text-gray-800 font-semibold">Loading...</h1>
        </div>
        <Skeleton className="w-full h-screen" baseColor="#e5e7eb" />
      </div>
    );
  }
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={`/login?redirect=${location.pathname}`} replace />
  );
};

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

PublicRoute.propTypes = {
  children: propTypes.children,
};
PrivateRoute.propTypes = {
  children: propTypes.children,
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <HomePage />
      </PublicRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/app",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="./my-resumes" replace />,
      },
      {
        path: "my-resumes",
        element: (
          <PrivateRoute>
            <MyResumes />
          </PrivateRoute>
        ),
      },
      {
        path: "user-profile",
        element: (
          <PrivateRoute>
            <UserProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "build-resume/:action/:templateId/:resumeId?",
        element: (
          <PrivateRoute>
            <BuildResume />
          </PrivateRoute>
        ),
      },
      {
        path: "build-resume",
        element: (
          <PrivateRoute>
            <TemplatesPage />
          </PrivateRoute>
        ),
      },
      {
        path: "review-system",
        element: (
          <PrivateRoute>
            <ReviewSystem />
          </PrivateRoute>
        ),
      },
      {
        path: "create-template",
        element: (
          <PrivateRoute>
            <CreateTemplatePage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <SignupPage />
      </PublicRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <PublicRoute>
        <ForgotPasswordPage />
      </PublicRoute>
    ),
  },
  {
    path: "/reset-password/:token",
    element: (
      <PublicRoute>
        <ResetPasswordPage />
      </PublicRoute>
    ),
  },
]);

function Router() {
  return (
    <div className="h-full">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default Router;
