import React from "react";
import { Grid, Typography, Box, Paper, Container } from "@mui/material";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Dummy data for tickets
const dummyTickets = [
  { id: "T1", date: "march-29", status: "Open" },
  { id: "T2", date: "march-30", status: "Open" },
  { id: "T3", date: "may-12", status: "Closed" },
];

// Dummy data for recent bookings
const dummyBookings = [
  { id: "trip1", date: "may-6", route: "B -> G" },
  { id: "trip2", date: "", route: "" },
];

function TicketCard({ ticketId, date, status }) {
  return (
    <Paper
      elevation={1}
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        height: "100%",
        minHeight: 100,
        backgroundColor: "#ffffff",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box p={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="500">
            {ticketId}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              backgroundColor: status === "Open" ? "#e3f2fd" : "#eeeeee",
              color: status === "Open" ? "#1976d2" : "#616161",
              padding: "4px 8px",
              borderRadius: "4px",
              fontWeight: "500",
            }}
          >
            {status}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {date}
        </Typography>
      </Box>
    </Paper>
  );
}

function BookingCard({ tripId, date, route }) {
  return (
    <Paper
      elevation={1}
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        height: "100%",
        minHeight: 100,
        backgroundColor: "#ffffff",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box p={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="500">
            {tripId}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {date}
        </Typography>
        {route && (
          <Typography variant="body2" sx={{ color: "#1976d2", fontWeight: "500" }}>
            {route}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

function SectionHeader({ title }) {
  return (
    <Box mb={3}>
      <Typography
        variant="h5"
        fontWeight="500"
        sx={{
          borderBottom: "2px solid #e0e0e0",
          paddingBottom: "8px",
          position: "relative",
          "&:after": {
            content: '""',
            position: "absolute",
            bottom: "-2px",
            left: 0,
            width: "60px",
            height: "2px",
            backgroundColor: "#1976d2",
          },
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}

function CustomerDashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container maxWidth="lg">
        <MDBox py={3}>
          <Box mb={4}>
            <Typography variant="h4" fontWeight="500" gutterBottom>
              Customer Dashboard
            </Typography>
          </Box>

          {/* Tickets Section */}
          <Box mb={4}>
            <SectionHeader title="Tickets" />
            <Grid container spacing={2}>
              {dummyTickets.map((ticket) => (
                <Grid item xs={12} sm={6} md={4} key={ticket.id}>
                  <TicketCard ticketId={ticket.id} date={ticket.date} status={ticket.status} />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Recent Bookings Section */}
          <Box mb={4}>
            <SectionHeader title="Recent Bookings" />
            <Grid container spacing={2}>
              {dummyBookings.map((booking) => (
                <Grid item xs={12} sm={6} md={4} key={booking.id}>
                  <BookingCard tripId={booking.id} date={booking.date} route={booking.route} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </MDBox>
      </Container>
      <Footer />
    </DashboardLayout>
  );
}

export default CustomerDashboard;
