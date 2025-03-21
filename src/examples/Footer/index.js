import { Link } from "react-router-dom";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function Footer() {
  return (
    <MDBox
      component="footer"
      py={3}
      sx={{
        width: "100%",
        position: "relative",
        bottom: 0,
        left: 0,
        zIndex: 10,
        backgroundColor: ({ palette: { dark } }) => dark.main,
      }}
    >
      <MDBox
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          color="white"
          fontSize={{ xs: 12, sm: 14 }}
          px={1.5}
        >
          © 2025, made with
          <MDBox component="span" display="flex" alignItems="center" mx={0.5} color="white">
            <Icon fontSize="small">favorite</Icon>
          </MDBox>
          by
          <MDTypography
            component={Link}
            to="https://www.creative-tim.com/"
            target="_blank"
            variant="button"
            color="white"
            sx={{ textDecoration: "none" }}
          >
            &nbsp;Creative Tim&nbsp;
          </MDTypography>
          for a better web.
        </MDBox>
        <MDBox
          component="ul"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            listStyle: "none",
            mt: 3,
            mb: 0,
            p: 0,
          }}
        >
          <MDBox component="li" px={2} lineHeight={1}>
            <MDTypography
              component={Link}
              to="https://www.creative-tim.com/"
              target="_blank"
              variant="button"
              color="white"
              sx={{ textDecoration: "none" }}
            >
              Creative Tim
            </MDTypography>
          </MDBox>
          <MDBox component="li" px={2} lineHeight={1}>
            <MDTypography
              component={Link}
              to="https://www.creative-tim.com/presentation"
              target="_blank"
              variant="button"
              color="white"
              sx={{ textDecoration: "none" }}
            >
              About Us
            </MDTypography>
          </MDBox>
          <MDBox component="li" px={2} lineHeight={1}>
            <MDTypography
              component={Link}
              to="https://www.creative-tim.com/blog"
              target="_blank"
              variant="button"
              color="white"
              sx={{ textDecoration: "none" }}
            >
              Blog
            </MDTypography>
          </MDBox>
          <MDBox component="li" px={2} lineHeight={1}>
            <MDTypography
              component={Link}
              to="https://www.creative-tim.com/license"
              target="_blank"
              variant="button"
              color="white"
              sx={{ textDecoration: "none" }}
            >
              License
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

export default Footer;
