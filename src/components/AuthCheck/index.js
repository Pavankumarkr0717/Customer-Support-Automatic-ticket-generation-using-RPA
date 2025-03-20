import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AuthCheck({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/authentication");

  useEffect(() => {
    const checkAuth = async () => {
      // For development - bypass all auth checks
      /*
      const token = localStorage.getItem("access_token");

      if (isAuthPage && token) {
        console.log("in auth page and token found");
        try {
          const response = await fetch("http://127.0.0.1:8000/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            const userData = await response.json();
            localStorage.setItem(
              "userData",
              JSON.stringify({
                username: userData.username,
                email: userData.email,
              })
            );
            navigate("/dashboard");
          } else {
            // If token is invalid, clear it
            localStorage.removeItem("access_token");
            localStorage.removeItem("userData");
          }
        } catch (error) {
          // Handle network errors
          localStorage.removeItem("access_token");
          localStorage.removeItem("userData");
        }
        return;
      }

      // If we're not on an auth page and don't have a token, redirect to sign-in
      if (!isAuthPage && !token) {
        // Only redirect if we're not already on the sign-in page
        if (location.pathname !== "/authentication/sign-in") {
          navigate("/authentication/sign-in");
        }
        // navigate("/authentication/sign-in");
        return;
      }

      // If we have a token and we're not on an auth page, verify it
      if (!isAuthPage && token) {
        console.log("not in auth page and token found");
        try {
          const response = await fetch("http://127.0.0.1:8000/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            const userData = await response.json();
            localStorage.setItem(
              "userData",
              JSON.stringify({
                username: userData.username,
                email: userData.email,
              })
            );
          } else {
            // If token is invalid, clear it and redirect to sign-in
            localStorage.removeItem("access_token");
            localStorage.removeItem("userData");
            if (location.pathname !== "/authentication/sign-in") {
              navigate("/authentication/sign-in");
            }
          }
        } catch (error) {
          // Handle network errors
          localStorage.removeItem("access_token");
          localStorage.removeItem("userData");
          if (location.pathname !== "/authentication/sign-in") {
            navigate("/authentication/sign-in");
          }
        }
      }
      */

      // For development - always redirect to dashboard if on auth pages
      if (isAuthPage) {
        navigate("/dashboard");
      }
    };

    checkAuth();
  }, [navigate, isAuthPage, location.pathname]);

  return children;
}

export default AuthCheck;
