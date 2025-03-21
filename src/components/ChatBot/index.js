import { useState } from "react";
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function ChatBot({ isOpen, onClose }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        text: message,
        sender: "user",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setMessage("");

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          text: "Thank you for your message. Our support team will get back to you soon.",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Box
          sx={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 9999,
          }}
        >
          <Fab
            color="info"
            aria-label="chat"
            onClick={() => onClose(true)}
            sx={{
              backgroundColor: "#1A73E8",
              "&:hover": {
                backgroundColor: "#1557B0",
              },
            }}
          >
            <Icon sx={{ color: "white" }}>chat</Icon>
          </Fab>
        </Box>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card
          sx={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            width: "300px",
            height: "400px",
            display: "flex",
            flexDirection: "column",
            zIndex: 9999,
            boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
          }}
        >
          {/* Header */}
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            sx={{
              backgroundColor: "#1A73E8",
              color: "white",
            }}
          >
            <MDBox display="flex" alignItems="center">
              <Icon sx={{ mr: 1, color: "white" }}>support_agent</Icon>
              <MDTypography variant="h6" color="white">
                Chat Support
              </MDTypography>
            </MDBox>
            <IconButton onClick={() => onClose(false)} sx={{ color: "white" }}>
              <Icon>close</Icon>
            </IconButton>
          </MDBox>

          {/* Messages */}
          <MDBox
            flex={1}
            p={2}
            sx={{
              overflowY: "auto",
              backgroundColor: "#f8f9fa",
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
            {messages.map((msg, index) => (
              <MDBox
                key={index}
                mb={2}
                display="flex"
                justifyContent={msg.sender === "user" ? "flex-end" : "flex-start"}
              >
                <MDBox
                  sx={{
                    maxWidth: "80%",
                    backgroundColor: msg.sender === "user" ? "#1A73E8" : "white",
                    color: msg.sender === "user" ? "white" : "#344767",
                    borderRadius: "12px",
                    padding: "8px 12px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <MDTypography variant="button" fontWeight="regular">
                    {msg.text}
                  </MDTypography>
                  <MDTypography
                    variant="caption"
                    sx={{
                      display: "block",
                      mt: 0.5,
                      color: msg.sender === "user" ? "rgba(255,255,255,0.7)" : "text.secondary",
                    }}
                  >
                    {msg.timestamp}
                  </MDTypography>
                </MDBox>
              </MDBox>
            ))}
          </MDBox>

          {/* Input */}
          <MDBox
            component="form"
            onSubmit={handleSendMessage}
            p={2}
            sx={{
              backgroundColor: "white",
              borderTop: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <TextField
              fullWidth
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#1A73E8",
                  },
                  "&:hover fieldset": {
                    borderColor: "#1A73E8",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "#344767",
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    type="submit"
                    disabled={!message.trim()}
                    sx={{
                      color: message.trim() ? "#1A73E8" : "rgba(0,0,0,0.3)",
                      "&:hover": {
                        backgroundColor: message.trim() ? "rgba(26,115,232,0.1)" : "transparent",
                      },
                    }}
                  >
                    <Icon>send</Icon>
                  </IconButton>
                ),
              }}
            />
          </MDBox>
        </Card>
      )}
    </>
  );
}

ChatBot.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ChatBot;
