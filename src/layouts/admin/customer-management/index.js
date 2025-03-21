import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

function CustomerManagement() {
  const [menu, setMenu] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  const handleAction = (action) => {
    closeMenu();
    setNotification({
      open: true,
      message: `Customer ${action} successfully`,
      type: "success",
    });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const renderMenu = (
    <Menu
      anchorEl={menu}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <MenuItem onClick={() => handleAction("details updated")}>Edit Details</MenuItem>
      <MenuItem onClick={() => handleAction("status updated")}>Change Status</MenuItem>
      <MenuItem onClick={() => handleAction("account suspended")} sx={{ color: "error.main" }}>
        Suspend Account
      </MenuItem>
    </Menu>
  );

  const customersData = {
    columns: [
      { Header: "Customer", accessor: "customer", width: "25%" },
      { Header: "Email", accessor: "email", width: "25%" },
      { Header: "Phone", accessor: "phone", width: "20%" },
      { Header: "Status", accessor: "status", width: "15%" },
      { Header: "Actions", accessor: "actions", width: "15%" },
    ],
    rows: [
      {
        customer: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDBox ml={2} lineHeight={1}>
              <MDTypography display="block" variant="button" fontWeight="medium">
                John Doe
              </MDTypography>
              <MDTypography variant="caption">Customer ID: #12345</MDTypography>
            </MDBox>
          </MDBox>
        ),
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Active
          </MDTypography>
        ),
        actions: (
          <MDBox display="flex" alignItems="center">
            <IconButton onClick={openMenu} size="small">
              <Icon>more_vert</Icon>
            </IconButton>
            {renderMenu}
          </MDBox>
        ),
      },
      {
        customer: (
          <MDBox display="flex" alignItems="center">
            <MDAvatar
              src="https://ui-avatars.com/api/?name=Jane+Smith&background=0D8ABC&color=fff"
              alt="Jane Smith"
              size="sm"
              sx={{ mr: 1 }}
            />
            <MDBox display="flex" flexDirection="column">
              <MDTypography variant="button" fontWeight="medium">
                Jane Smith
              </MDTypography>
              <MDTypography variant="caption" color="text">
                Member since Feb 2024
              </MDTypography>
            </MDBox>
          </MDBox>
        ),
        email: "jane.smith@example.com",
        phone: "+1 (555) 987-6543",
        status: (
          <MDTypography variant="caption" color="success" fontWeight="medium">
            Active
          </MDTypography>
        ),
        actions: (
          <MDBox display="flex" alignItems="center">
            <MDButton variant="text" color="info" size="small">
              View
            </MDButton>
            <IconButton onClick={openMenu} size="small">
              <Icon>more_vert</Icon>
            </IconButton>
          </MDBox>
        ),
      },
    ],
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Customer Management
                </MDTypography>
                <MDBox display="flex" gap={2}>
                  <MDButton variant="gradient" color="dark" size="small">
                    <Icon>filter_list</Icon>&nbsp; Filter
                  </MDButton>
                  <MDButton variant="gradient" color="dark" size="small">
                    <Icon>download</Icon>&nbsp; Export
                  </MDButton>
                </MDBox>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={customersData}
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  noEndBorder
                  canSearch
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      {renderMenu}
      <MDSnackbar
        color={notification.type}
        icon={notification.type === "success" ? "check" : "warning"}
        title={notification.type === "success" ? "Success" : "Error"}
        content={notification.message}
        open={notification.open}
        onClose={handleCloseNotification}
        close={handleCloseNotification}
        bgWhite
      />
    </DashboardLayout>
  );
}

export default CustomerManagement;
