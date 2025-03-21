import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function ChatSupport() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I help you today?",
      sender: "agent",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: message,
          sender: "user",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setMessage("");
    }
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
              >
                <MDTypography variant="h6" color="white">
                  Live Chat Support
                </MDTypography>
              </MDBox>
              <MDBox
                p={3}
                height="60vh"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <MDBox
                  flex={1}
                  mb={2}
                  sx={{
                    overflowY: "auto",
                    "&::-webkit-scrollbar": {
                      width: "0.4em",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "#f1f1f1",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#888",
                    },
                  }}
                >
                  {messages.map((msg) => (
                    <MDBox
                      key={msg.id}
                      mb={2}
                      display="flex"
                      flexDirection="column"
                      alignItems={msg.sender === "user" ? "flex-end" : "flex-start"}
                    >
                      <MDBox
                        p={2}
                        borderRadius="lg"
                        bgcolor={msg.sender === "user" ? "info.main" : "grey.100"}
                        color={msg.sender === "user" ? "white" : "text.primary"}
                        maxWidth="70%"
                      >
                        <MDTypography variant="body2">{msg.text}</MDTypography>
                      </MDBox>
                      <MDTypography variant="caption" color="text.secondary" mt={0.5}>
                        {msg.timestamp}
                      </MDTypography>
                    </MDBox>
                  ))}
                </MDBox>
                <MDBox component="form" onSubmit={handleSendMessage}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs>
                      <TextField
                        fullWidth
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item>
                      <IconButton
                        type="submit"
                        color="info"
                        disabled={!message.trim()}
                        sx={{ p: "10px" }}
                      >
                        <Icon>send</Icon>
                      </IconButton>
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ChatSupport;
