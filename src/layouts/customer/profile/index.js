import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Icon from "@mui/material/Icon";

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

function CustomerProfile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user_data"));
    if (userData) {
      setFormData({
        firstName: userData.username || "", // Use username for firstName
        lastName: "",
        email: userData.email || "", // Use email from user data
        phone: userData.phone || "",
        address: userData.address || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://127.0.0.1:8000/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          username: formData.firstName, // Map firstName back to username when updating
        }),
      });

      if (response.ok) {
        // Update localStorage with new data
        const updatedUserData = JSON.parse(localStorage.getItem("user_data"));
        localStorage.setItem(
          "user_data",
          JSON.stringify({
            ...updatedUserData,
            username: formData.firstName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
          })
        );
        setNotification({
          open: true,
          message: "Profile updated successfully!",
          type: "success",
        });
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      setNotification({
        open: true,
        message: "Failed to update profile. Please try again.",
        type: "error",
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8} sx={{ mx: "auto" }}>
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
              >
                <MDTypography variant="h6" color="white">
                  Customer Profile
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox mb={4} display="flex" justifyContent="center">
                  <MDAvatar
                    src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff"
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
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="email"
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
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
          <Grid item xs={12} md={4} sx={{ mx: "auto" }}>
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

export default CustomerProfile;
