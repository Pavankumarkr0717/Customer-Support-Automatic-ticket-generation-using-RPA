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

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

function TicketManagement() {
  const [menu, setMenu] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  const handleStatusChange = (status) => {
    closeMenu();
    setNotification({
      open: true,
      message: `Ticket status updated to ${status}`,
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
      <MenuItem onClick={() => handleStatusChange("In Progress")}>In Progress</MenuItem>
      <MenuItem onClick={() => handleStatusChange("Resolved")}>Resolved</MenuItem>
      <MenuItem onClick={() => handleStatusChange("Closed")}>Closed</MenuItem>
    </Menu>
  );

  const ticketsTableData = {
    columns: [
      { Header: "Ticket ID", accessor: "id", width: "10%" },
      { Header: "Customer", accessor: "customer", width: "15%" },
      { Header: "Subject", accessor: "subject", width: "25%" },
      { Header: "Created", accessor: "created", width: "15%" },
      { Header: "Status", accessor: "status", width: "15%" },
      { Header: "Actions", accessor: "actions", width: "20%" },
    ],
    rows: [
      {
        id: "TK001",
        customer: "John Doe",
        subject: "Refund Request for Booking #BK001",
        created: "2024-03-20",
        status: (
          <MDTypography variant="caption" color="info" fontWeight="medium">
            Open
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
      {
        id: "TK002",
        customer: "Jane Smith",
        subject: "Change Travel Date",
        created: "2024-03-19",
        status: (
          <MDTypography variant="caption" color="warning" fontWeight="medium">
            In Progress
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
                  Ticket Management
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
                  table={ticketsTableData}
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

export default TicketManagement;
