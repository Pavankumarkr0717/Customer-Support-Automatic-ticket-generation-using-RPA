import { useState } from "react";
import {
  Card,
  Grid,
  TextField,
  IconButton,
  Avatar,
  Typography,
  Box,
  Divider,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function Requests() {
  const [messages, setMessages] = useState([
    {
      id: 2,
      text: "Hi, Charlotte! Our worker can come in 20 mins. Is it ok?",
      sender: "support",
      time: "8:43 AM",
      user: {
        name: "Antoine Cooper",
        avatar: "/images/avatar2.jpg",
      },
    },
    {
      id: 3,
      text: "OFC! Thank you!",
      sender: "user",
      time: "8:43 AM",
      user: {
        name: "Charlotte Larue",
        avatar: "/images/avatar1.jpg",
      },
    },
    {
      id: 4,
      text: "You're welcome! Feel free to ask",
      sender: "support",
      time: "8:43 AM",
      user: {
        name: "Antoine Cooper",
        avatar: "/images/avatar2.jpg",
      },
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: newMessage,
          sender: "user",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          user: {
            name: "Charlotte Larue",
            avatar: "/images/avatar1.jpg",
          },
        },
      ]);
      setNewMessage("");
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
                  Requests
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box p={3}>
                      {/* Request Header */}
                      <Box mb={2}>
                        <Typography variant="h6">Connection destroyed</Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                          #T-874-01
                        </Typography>
                        <Box display="flex" gap={2} mt={1}>
                          <Typography variant="body2" color="textSecondary">
                            Request type: Technical support
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Date: March 21, 2023
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Priority: High
                          </Typography>
                        </Box>
                      </Box>
                      <Divider />
                      {/* Chat Messages */}
                      <Box sx={{ height: "400px", overflowY: "auto", my: 2 }}>
                        {messages.map((message) => (
                          <Box
                            key={message.id}
                            sx={{
                              display: "flex",
                              flexDirection: message.sender === "user" ? "row" : "row-reverse",
                              mb: 2,
                              gap: 1,
                            }}
                          >
                            <Avatar src={message.user.avatar} />
                            <Box
                              sx={{
                                maxWidth: "70%",
                              }}
                            >
                              <Paper
                                elevation={1}
                                sx={{
                                  p: 2,
                                  bgcolor: message.sender === "user" ? "grey.100" : "primary.light",
                                  color: message.sender === "user" ? "text.primary" : "white",
                                  borderRadius: 2,
                                }}
                              >
                                <Typography variant="body1">{message.text}</Typography>
                              </Paper>
                              <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
                                {message.time}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                      {/* Message Input */}
                      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                        <TextField
                          fullWidth
                          placeholder="Type your message here..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleSendMessage();
                            }
                          }}
                        />
                        <IconButton
                          color="primary"
                          onClick={handleSendMessage}
                          sx={{
                            bgcolor: "primary.main",
                            color: "white",
                            "&:hover": {
                              bgcolor: "primary.dark",
                            },
                          }}
                        >
                          <SendIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Requests;
