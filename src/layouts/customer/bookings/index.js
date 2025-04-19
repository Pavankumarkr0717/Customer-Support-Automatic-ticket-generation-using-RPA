import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

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

const bookingsTableData = {
  columns: [
    { Header: "Booking ID", accessor: "id", width: "10%" },
    { Header: "Type", accessor: "type", width: "15%" },
    { Header: "From", accessor: "from", width: "15%" },
    { Header: "To", accessor: "to", width: "15%" },
    { Header: "Date", accessor: "date", width: "15%" },
    { Header: "Status", accessor: "status", width: "15%" },
    { Header: "Action", accessor: "action", width: "15%" },
  ],
  rows: [
    {
      id: "BK001",
      type: "Train",
      from: "New York",
      to: "Washington",
      date: "2024-03-25",
      status: (
        <MDTypography variant="caption" color="success" fontWeight="medium">
          Confirmed
        </MDTypography>
      ),
      action: (
        <MDButton variant="text" color="info" size="small">
          View Details
        </MDButton>
      ),
    },
    // Add more sample data as needed
  ],
};

function Bookings() {
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
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
                py={1.5}
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
                  My Tickets
                </MDTypography>
                <MDButton variant="gradient" color="dark">
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;New Booking
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={bookingsTableData}
                  isSorted={false}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
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

export default Bookings;
