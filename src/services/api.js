import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Change this to your backend URL

// Mock data and services
const mockTickets = [{ id: "T1", date: "march-29", status: "Open" }, { id: "T2", date: "march-30", status: "Open" }, { id: "T3", date: "may-12", status: "Closed" }];

const mockBookings = [{ id: "trip1", date: "may-6", route: "B -> G" }, { id: "trip2", date: "", route: "" }];

export const ticketService = { getAllTickets: async () => { await new Promise((resolve) => setTimeout(resolve, 1000)); return mockTickets; } };

export const bookingService = { getRecentBookings: async () => { await new Promise((resolve) => setTimeout(resolve, 1000)); return mockBookings; } }; 