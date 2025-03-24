import { useState, useEffect, useRef } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import CircularProgress from "@mui/material/CircularProgress";

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
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wsRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user_data"));
    if (!userData || !userData.id) {
      console.error("User data not found");
      return;
    }

    // Create WebSocket connection
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${userData.id}`);

    ws.onopen = () => {
      console.log("WebSocket Connected");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      setIsLoading(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          text: data.content,
          sender: "assistant",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected");
      setIsConnected(false);
      setIsLoading(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
      setIsConnected(false);
      setIsLoading(false);
    };

    wsRef.current = ws;

    // Cleanup on unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && wsRef.current && isConnected) {
      const userData = JSON.parse(localStorage.getItem("user_data"));
      if (!userData || !userData.id) {
        console.error("User data not found");
        return;
      }

      // Set loading state
      setIsLoading(true);

      // Send message through WebSocket
      wsRef.current.send(
        JSON.stringify({
          user_id: userData.id,
          query: message.trim(),
        })
      );

      // Add message to local state
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
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
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Live Chat Support
                </MDTypography>
                <MDTypography
                  variant="caption"
                  color={isConnected ? "success" : "error"}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Icon sx={{ fontSize: "1rem", mr: 0.5 }}>
                    {isConnected ? "fiber_manual_record" : "radio_button_unchecked"}
                  </Icon>
                  {isConnected ? "Connected" : "Disconnected"}
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
                  {isLoading && (
                    <MDBox mb={2} display="flex" flexDirection="column" alignItems="flex-start">
                      <MDBox
                        p={2}
                        borderRadius="lg"
                        bgcolor="grey.100"
                        color="text.primary"
                        maxWidth="70%"
                        display="flex"
                        alignItems="center"
                        gap={1}
                      >
                        <CircularProgress size={16} />
                        <MDTypography variant="body2">Assistant is typing...</MDTypography>
                      </MDBox>
                    </MDBox>
                  )}
                  <div ref={messagesEndRef} />
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
                        disabled={!isConnected || isLoading}
                      />
                    </Grid>
                    <Grid item>
                      <IconButton
                        type="submit"
                        color="info"
                        disabled={!message.trim() || !isConnected || isLoading}
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
