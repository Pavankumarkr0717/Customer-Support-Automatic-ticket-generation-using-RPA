import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Icon from "@mui/material/Icon";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

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

const getLevelInfo = (skillPoints) => {
  if (typeof skillPoints !== 'number' || skillPoints < 0) {
    return { 
      level: 'B',
      color: "#A9A9A9", 
      stars: 0, 
      nextLevel: 5,
      shape: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" // Hexagon shape for Bronze
    };
  }
  
  if (skillPoints >= 100) return { 
    level: 'D',
    color: "#B9F2FF",
    gradient: "linear-gradient(135deg, #B9F2FF, #00BFFF, #B9F2FF)",
    stars: 100,
    nextLevel: null,
    shape: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)" // Diamond shape
  };
  if (skillPoints >= 80) return { 
    level: 'P',
    color: "#E6E6FA",
    gradient: "linear-gradient(135deg, #E6E6FA, #9370DB, #E6E6FA)",
    stars: 80,
    nextLevel: 100,
    shape: "polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)" // Platinum shield
  };
  if (skillPoints >= 60) return { 
    level: 'G',
    color: "#FFD700",
    gradient: "linear-gradient(135deg, #FFD700, #DAA520, #FFD700)",
    stars: 60,
    nextLevel: 80,
    shape: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)" // Gold shield
  };
  return { 
    level: 'S',
    color: "#C0C0C0",
    gradient: "linear-gradient(135deg, #C0C0C0, #808080, #C0C0C0)",
    stars: 0,
    nextLevel: 60,
    shape: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)" // Silver shield
  };
};

function AdminProfile() {
  const [formData, setFormData] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    phone: "+1 (555) 123-4567",
    department: "Customer Support",
    role: "Senior Support Agent",
    slaLevel: "Gold",
    skillPoints: 75,
    performanceMetrics: {
      ticketsResolved: 0,
      deadlinesMet: 0,
      customerSatisfaction: 0,
      escalations: 0,
      lastUpdated: new Date().toISOString(),
    },
  });

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const levelInfo = getLevelInfo(formData.skillPoints);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotification({
      open: true,
      message: "Profile updated successfully!",
      type: "success",
    });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          {/* Main Profile Card */}
          <Grid item xs={12} md={8}>
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
                  Admin Profile
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox mb={4} display="flex" justifyContent="center">
                  <MDAvatar
                    src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff"
                    alt="Profile Picture"
                    size="xxl"
                    shadow="xl"
                  />
                </MDBox>
                <MDBox component="form" role="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <MDTypography variant="h6" color="text" mb={2}>
                        Performance Metrics
                      </MDTypography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <MDTypography variant="body2" color="text">
                            Tickets Resolved: {formData.performanceMetrics.ticketsResolved}
                          </MDTypography>
                        </Grid>
                        <Grid item xs={6}>
                          <MDTypography variant="body2" color="text">
                            Deadlines Met: {formData.performanceMetrics.deadlinesMet}
                          </MDTypography>
                        </Grid>
                        <Grid item xs={6}>
                          <MDTypography variant="body2" color="text">
                            Customer Satisfaction: {formData.performanceMetrics.customerSatisfaction}/5 {" "}
                          </MDTypography>
                        </Grid>
                        <Grid item xs={6}>
                          <MDTypography variant="body2" color="text">
                            Escalations: {formData.performanceMetrics.escalations}
                          </MDTypography>
                        </Grid>
                        <Grid item xs={12}>
                          <MDTypography variant="caption" color="text">
                            Last Updated: {new Date(formData.performanceMetrics.lastUpdated).toLocaleString()} {" "}
                          </MDTypography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <MDButton type="submit" variant="gradient" color="info">
                        <Icon>save</Icon>&nbsp; Save Changes
                      </MDButton>
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            {/* Level Badge Card */}
            <Card sx={{ mb: 6 }}>
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
                  Support Level
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <MDBox
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    py: 2,
                  }}
                >
                  {/* Badge Background */}
                  <MDBox
                    sx={{
                      width: "120px",
                      height: "120px",
                      background: levelInfo.gradient || `linear-gradient(135deg, ${levelInfo.color}, ${levelInfo.color}88)`,
                      clipPath: levelInfo.shape,
                      border: "3px solid white",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: "-50%",
                        left: "-50%",
                        right: "-50%",
                        bottom: "-50%",
                        background: `linear-gradient(
                          45deg,
                          transparent 20%,
                          rgba(255,255,255,0.15) 25%,
                          transparent 25%,
                          transparent 45%,
                          rgba(255,255,255,0.15) 50%,
                          transparent 50%,
                          transparent 70%,
                          rgba(255,255,255,0.15) 75%,
                          transparent 75%
                        )`,
                        backgroundSize: "250% 250%",
                        animation: "shine 3s linear infinite",
                        zIndex: 1,
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(135deg,
                          rgba(255,255,255,0.4) 0%,
                          transparent 50%,
                          rgba(255,255,255,0.4) 100%)`,
                        zIndex: 2,
                      },
                      "@keyframes shine": {
                        "0%": {
                          backgroundPosition: "200% 200%",
                        },
                        "100%": {
                          backgroundPosition: "0% 0%",
                        },
                      },
                    }}
                  >
                    <MDTypography
                      variant="h2"
                      sx={{
                        color: "white",
                        textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        zIndex: 3,
                        fontWeight: "bold",
                      }}
                    >
                      {levelInfo.level}
                    </MDTypography>
                  </MDBox>

                  {/* Points Display */}
                  <MDTypography
                    variant="h2"
                    sx={{
                      color: levelInfo.color,
                      marginTop: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {formData.skillPoints}
                  </MDTypography>

                  {levelInfo.nextLevel && (
                    <Box sx={{ width: "100%", mt: 2 }}>
                      <LinearProgress
                        variant="determinate"
                        value={(formData.skillPoints / 100) * 100}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: levelInfo.color,
                          },
                        }}
                      />
                    </Box>
                  )}
                </MDBox>
              </MDBox>
            </Card>

            {/* Account Settings Card */}
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
                  Account Settings
                </MDTypography>
              </MDBox>
              <MDBox p={3}>
                <MDBox py={2}>
                  <MDButton variant="outlined" color="info" fullWidth startIcon={<Icon>lock</Icon>}>
                    Change Password
                  </MDButton>
                </MDBox>
                <MDBox py={2}>
                  <MDButton
                    variant="outlined"
                    color="info"
                    fullWidth
                    startIcon={<Icon>notifications</Icon>}
                  >
                    Notification Settings
                  </MDButton>
                </MDBox>
                <MDBox py={2}>
                  <MDButton
                    variant="outlined"
                    color="info"
                    fullWidth
                    startIcon={<Icon>security</Icon>}
                  >
                    Security Settings
                  </MDButton>
                </MDBox>
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

export default AdminProfile;
