/**
=========================================================
* Customer Support System - Bus and Train Ticket Booking
=========================================================
*/

import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Sidenav from "examples/Sidenav";
import ChatBot from "components/ChatBot";
import Feedback from "components/Feedback";

// Themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Routes [Uncomment this when auth is implemented]
import { customerRoutes, adminRoutes } from "routes";

// Contexts
import { useMaterialUIController, setMiniSidenav } from "context";
import { useAuth } from "context/auth";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const { isAuthenticated /* eslint-disable-line no-unused-vars */, user } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(false);

  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });
    setRtlCache(cacheRtl);
  }, []);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (routes) =>
    routes.flatMap((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={<route.component />} key={route.key} />;
      }

      return [];
    });

  const chatButton = <ChatBot isOpen={isChatOpen} onClose={(state) => setIsChatOpen(state)} />;

  const renderContent = () => {
    if (isAdmin) {
      return (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Admin Portal"
            routes={adminRoutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <MDBox sx={{ p: 3, minHeight: "100vh", ml: "250px" }}>
            <MDButton
              variant="gradient"
              color="info"
              onClick={() => setIsAdmin(false)}
              sx={{ position: "fixed", top: "1rem", right: "1rem", zIndex: 1000 }}
            >
              Switch to Customer View
            </MDButton>
            <Routes>
              {getRoutes(adminRoutes)}
              <Route path="*" element={<Navigate to="/admin/dashboard" />} />
            </Routes>
          </MDBox>
        </>
      );
    }

    return (
      <>
        <Sidenav
          color={sidenavColor}
          brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
          brandName="Customer Support"
          routes={customerRoutes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
        <MDBox sx={{ p: 3, minHeight: "100vh", ml: "250px" }}>
          <MDButton
            variant="gradient"
            color="info"
            onClick={() => setIsAdmin(true)}
            sx={{ position: "fixed", top: "1rem", right: "1rem", zIndex: 1000 }}
          >
            Switch to Admin View
          </MDButton>
          <Routes>
            {getRoutes(customerRoutes)}
            <Route path="*" element={<Navigate to="/customer/dashboard" />} />
          </Routes>
        </MDBox>
      </>
    );
  };

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        {renderContent()}
        {layout === "dashboard" && chatButton}
        <Feedback />
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {renderContent()}
      {layout === "dashboard" && chatButton}
      <Feedback />
    </ThemeProvider>
  );
}
