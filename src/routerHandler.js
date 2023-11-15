import { useContext } from "react";
import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import UserContext from "./context/userContext";
import Layout from "./components/layout/index";
import Footer from "./components/footer";
import Error from "./pages/error";
import Home from "./pages/home";
import AiTool from "./pages/ai-tool";
import Subscription from "./pages/subscription";
import Pricing from "./pages/pricing";
import Contact from "./pages/contact";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import AuthHandler from "./pages/auth-handler";
import Sidebar from "./components/layout/sidebar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HandleRedirection />,
      },
      {
        path: "/home",
        element: <Protection from="user" children={<Home />} />,
      },
      {
        path: "/chat",
        element: <Protection from="non-user" children={<AiTool />} />,
      },
      {
        path: "/subscription",
        element: <Subscription />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/contact-us",
        element: <Contact />,
      },
      {
        path: "/signin",
        element: <Protection from="user" children={<Signin />} />,
      },
      {
        path: "/signup",
        element: <Protection from="user" children={<Signup />} />,
      },
      {
        path: "/auth-handler",
        element: <AuthHandler />,
      },
    ],
  },
]);

function HandleRedirection() {
  const { user } = useContext(UserContext);

  return user ? (
    <Navigate to="chat" replace={true} />
  ) : (
    <Navigate to="home" replace={true} />
  );
}

function Navigation() {
  const { user } = useContext(UserContext);

  return (
    <>
      {user ? (
        <Sidebar children={<Outlet />} />
      ) : (
        <>
          <Layout />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
}

function Protection({ from, children }) {
  const { user } = useContext(UserContext);

  if (from === "non-user") {
    return user ? children : <Navigate to="/signin" replace={true} />;
  } else if (from === "user") {
    return user ? <Navigate to="/chat" replace={true} /> : children;
  }
}

export default router;
