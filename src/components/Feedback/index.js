import React, { useState } from "react";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Feedback";

function Feedback() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [category, setCategory] = useState("");
  const [responseTime, setResponseTime] = useState("");
  const [satisfaction, setSatisfaction] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setRating(0);
    setComment("");
    setCategory("");
    setResponseTime("");
    setSatisfaction("");
  };

  const handleSubmit = () => {
    console.log({ 
      rating, 
      comment, 
      category, 
      responseTime, 
      satisfaction 
    });
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          position: "fixed",
          right: 0,
          bottom: "40%",
          width: "36px",
          height: "140px",
          borderRadius: "4px 0 0 4px",
          backgroundColor: "#1a73e8",
          color: "#ffffff",
          fontWeight: 500,
          letterSpacing: "0.5px",
          "&:hover": {
            backgroundColor: "#1557b0",
          },
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 0",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "rotate(180deg)",
          textTransform: "none",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <FeedbackIcon sx={{ 
          transform: "rotate(180deg)",
          mb: 1,
          color: "#ffffff",
        }} />
        Feedback
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h5" component="div" fontWeight="500">
            Customer Support Feedback
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ my: 2 }}>
            <Typography variant="h6" gutterBottom>
              Overall Experience
            </Typography>
            <Rating
              name="feedback-rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              size="large"
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Feedback Category</InputLabel>
            <Select
              value={category}
              label="Feedback Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="ticket-resolution">Ticket Resolution</MenuItem>
              <MenuItem value="customer-service">Customer Service</MenuItem>
              <MenuItem value="response-time">Response Time</MenuItem>
              <MenuItem value="system-usability">System Usability</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>

          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              How satisfied were you with the response time?
            </Typography>
            <RadioGroup
              value={responseTime}
              onChange={(e) => setResponseTime(e.target.value)}
            >
              <FormControlLabel value="very-fast" control={<Radio />} label="Very Fast" />
              <FormControlLabel value="fast" control={<Radio />} label="Fast" />
              <FormControlLabel value="average" control={<Radio />} label="Average" />
              <FormControlLabel value="slow" control={<Radio />} label="Slow" />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Was your issue resolved to your satisfaction?
            </Typography>
            <RadioGroup
              value={satisfaction}
              onChange={(e) => setSatisfaction(e.target.value)}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes, completely" />
              <FormControlLabel value="partially" control={<Radio />} label="Partially" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>

          <TextField
            margin="dense"
            id="feedback"
            label="Additional Comments"
            placeholder="Please share more details about your experience..."
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            sx={{
              backgroundColor: "#1a73e8",
              color: "#ffffff",
              fontWeight: 500,
              letterSpacing: "0.5px",
              "&:hover": {
                backgroundColor: "#1557b0",
              },
              "&.Mui-disabled": {
                backgroundColor: "rgba(26, 115, 232, 0.7)",
                color: "rgba(255, 255, 255, 0.8)",
              }
            }}
            disabled={!rating || !category || !responseTime || !satisfaction}
          >
            Submit Feedback
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Feedback; 