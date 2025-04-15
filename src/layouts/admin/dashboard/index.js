import React, { useState } from "react";
import { Grid, Menu, MenuItem, Card } from "@mui/material";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Dashboard components
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

function AdminDashboard() {
  const [menu, setMenu] = useState(null);

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = () => (
    <Menu
      anchorEl={menu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
    >
      <MenuItem onClick={closeMenu}>View Details</MenuItem>
      <MenuItem onClick={closeMenu}>Assign to Agent</MenuItem>
      <MenuItem onClick={closeMenu}>Mark as Resolved</MenuItem>
    </Menu>
  );

  const recentTicketsData = {
    columns: [
      { Header: "Ticket ID", accessor: "id", width: "10%" },
      { Header: "Customer", accessor: "customer", width: "20%" },
      { Header: "Subject", accessor: "subject", width: "30%" },
      { Header: "Priority", accessor: "priority", width: "15%" },
      { Header: "Status", accessor: "status", width: "15%" },
      { Header: "Action", accessor: "action", width: "10%" },
    ],
    rows: [
      {
        id: "TK001",
        customer: "John Doe",
        subject: "Refund Request for Booking #BK001",
        priority: (
          <MDTypography variant="caption" color="error" fontWeight="medium">
            High
          </MDTypography>
        ),
        status: (
          <MDTypography variant="caption" color="info" fontWeight="medium">
            Open
          </MDTypography>
        ),
        action: (
          <MDButton variant="text" color="info" size="small" onClick={openMenu}>
            <Icon>more_vert</Icon>
          </MDButton>
        ),
      },
      {
        id: "TK002",
        customer: "Jane Smith",
        subject: "Change Travel Date",
        priority: (
          <MDTypography variant="caption" color="warning" fontWeight="medium">
            Medium
          </MDTypography>
        ),
        status: (
          <MDTypography variant="caption" color="warning" fontWeight="medium">
            In Progress
          </MDTypography>
        ),
        action: (
          <MDButton variant="text" color="info" size="small" onClick={openMenu}>
            <Icon>more_vert</Icon>
          </MDButton>
        ),
      },
    ],
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* Key Metrics */}
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="info"
              icon="support_agent"
              title="Total Tickets"
              count="1,234"
              percentage={{
                color: "success",
                amount: "+12%",
                label: "than last month",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="success"
              icon="check_circle"
              title="Resolved Tickets"
              count="876"
              percentage={{
                color: "success",
                amount: "+8%",
                label: "than last month",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="warning"
              icon="pending"
              title="Pending Tickets"
              count="358"
              percentage={{
                color: "error",
                amount: "+5%",
                label: "than last month",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="error"
              icon="priority_high"
              title="High Priority"
              count="156"
              percentage={{
                color: "error",
                amount: "+3%",
                label: "than last month",
              }}
            />
          </Grid>

          {/* Recent Tickets */}
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
              >
                <MDTypography variant="h6" color="white">
                  Dashboard Overview
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={recentTicketsData}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>

          {/* Quick Actions */}
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
              >
                <MDTypography variant="h6" color="white">
                  Quick Actions
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      fullWidth
                      startIcon={<Icon>add</Icon>}
                    >
                      Create Ticket
                    </MDButton>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <MDButton
                      variant="gradient"
                      color="success"
                      fullWidth
                      startIcon={<Icon>people</Icon>}
                    >
                      Manage Agents
                    </MDButton>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <MDButton
                      variant="gradient"
                      color="warning"
                      fullWidth
                      startIcon={<Icon>settings</Icon>}
                    >
                      Settings
                    </MDButton>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <MDButton
                      variant="gradient"
                      color="error"
                      fullWidth
                      startIcon={<Icon>report</Icon>}
                    >
                      Reports
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      {renderMenu()}
    </DashboardLayout>
  );
}

export default AdminDashboard;
