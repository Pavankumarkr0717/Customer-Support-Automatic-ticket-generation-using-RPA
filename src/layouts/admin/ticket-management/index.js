import { useState, useEffect } from "react";
import { Grid, Card, Icon, Menu, MenuItem } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Performance tracking utilities
import { updateEmployeePerformance } from "utils/performanceTracker";

// Sample data for demonstration
const initialTickets = [
  {
    id: "TK001",
    subject: "System Outage",
    priority: "High",
    status: "Open",
    customer: "John Doe",
    slaLevel: "Platinum",
    assignedTo: "John Smith",
    createdAt: "2024-03-15 10:00",
    deadline: "2024-03-15 14:00",
    customerSatisfaction: 0,
  },
];

// Sample employees data with initial performance metrics
const initialEmployees = [
  { name: "John Smith", slaLevel: "Platinum" },
  { name: "Sarah Johnson", slaLevel: "Gold" },
  { name: "Mike Wilson", slaLevel: "Silver" },
  { name: "Emily Brown", slaLevel: "Bronze" },
];

function TicketManagement() {
  const [tickets, setTickets] = useState(initialTickets);
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [menu, setMenu] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "success",
  });

  // Update employee performance weekly
  useEffect(() => {
    const updatePerformance = () => {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const updatedEmployees = employees.map((employee) =>
        updateEmployeePerformance(employee, tickets, oneWeekAgo, new Date())
      );

      setEmployees(updatedEmployees);
    };

    // Update performance every week
    const interval = setInterval(updatePerformance, 7 * 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [tickets, employees]);

  const openMenu = (event, ticketId) => {
    setSelectedTicket(ticketId);
    setMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setSelectedTicket(null);
    setMenu(null);
  };

  const handleAssignTicket = (ticketId, employeeName) => {
    const ticket = tickets.find((t) => t.id === ticketId);
    const employeeData = employees.find((e) => e.name === employeeName);

    if (!ticket || !employeeData) {
      setNotification({
        open: true,
        message: "Invalid ticket or employee selection",
        type: "error",
      });
      return;
    }

    if (employeeData.slaLevel !== ticket.slaLevel) {
      setNotification({
        open: true,
        message: `Cannot assign ticket: Employee SLA level (${employeeData.slaLevel}) does not match ticket SLA level (${ticket.slaLevel})`,
        type: "error",
      });
      return;
    }

    setTickets((prevTickets) =>
      prevTickets.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              assignedTo: employeeName,
              status: "In Progress",
              assignedAt: new Date().toISOString(),
            }
          : t
      )
    );

    setNotification({
      open: true,
      message: `Ticket assigned to ${employeeName}`,
      type: "success",
    });
    closeMenu();
  };

  const handleUpdateStatus = (ticketId, status) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) => {
        if (ticket.id === ticketId) {
          const updatedTicket = {
            ...ticket,
            status,
            statusUpdatedAt: new Date().toISOString(),
          };

          if (status === "Resolved") {
            updatedTicket.resolvedAt = new Date().toISOString();
            updatedTicket.customerSatisfaction = Math.floor(Math.random() * 5) + 1;
          }

          return updatedTicket;
        }
        return ticket;
      })
    );

    setNotification({
      open: true,
      message: `Status updated to ${status}`,
      type: "success",
    });
    closeMenu();
  };

  const handleEscalateTicket = (ticketId) => {
    const ticket = tickets.find((t) => t.id === ticketId);
    if (!ticket) {
      setNotification({
        open: true,
        message: "Invalid ticket selection",
        type: "error",
      });
      return;
    }

    const currentEmployee = employees.find((e) => e.name === ticket.assignedTo);
    if (!currentEmployee) {
      setNotification({
        open: true,
        message: "Ticket must be assigned before escalation",
        type: "error",
      });
      return;
    }

    const currentSlaLevel = currentEmployee.slaLevel;
    let nextSlaLevel;
    switch (currentSlaLevel) {
      case "Bronze":
        nextSlaLevel = "Silver";
        break;
      case "Silver":
        nextSlaLevel = "Gold";
        break;
      case "Gold":
        nextSlaLevel = "Platinum";
        break;
      default:
        setNotification({
          open: true,
          message: "Ticket is already at highest SLA level",
          type: "warning",
        });
        return;
    }

    const nextLevelEmployee = employees.find((e) => e.slaLevel === nextSlaLevel);

    if (nextLevelEmployee) {
      setTickets((prevTickets) =>
        prevTickets.map((t) =>
          t.id === ticketId
            ? {
                ...t,
                assignedTo: nextLevelEmployee.name,
                status: "Escalated",
                slaLevel: nextSlaLevel,
                escalationHistory: [
                  ...(t.escalationHistory || []),
                  {
                    from: currentEmployee.name,
                    to: nextLevelEmployee.name,
                    timestamp: new Date().toISOString(),
                    reason: "Unable to resolve at current level",
                  },
                ],
              }
            : t
        )
      );
      setNotification({
        open: true,
        message: `Ticket escalated to ${nextLevelEmployee.name} (${nextSlaLevel})`,
        type: "info",
      });
    } else {
      setNotification({
        open: true,
        message: "No higher level employee available for escalation",
        type: "error",
      });
    }
    closeMenu();
  };

  const ticketsData = {
    columns: [
      { Header: "Ticket ID", accessor: "id", width: "10%" },
      { Header: "Subject", accessor: "subject", width: "20%" },
      { Header: "Priority", accessor: "priority", width: "10%" },
      { Header: "Status", accessor: "status", width: "10%" },
      { Header: "Customer", accessor: "customer", width: "15%" },
      { Header: "SLA Level", accessor: "slaLevel", width: "10%" },
      { Header: "Assigned To", accessor: "assignedTo", width: "15%" },
      { Header: "Timeline", accessor: "timeline", width: "10%" },
      { Header: "Actions", accessor: "actions", width: "10%" },
    ],
    rows: tickets.map((ticket) => ({
      id: ticket.id,
      subject: ticket.subject,
      priority: (
        <MDTypography
          variant="caption"
          color={
            ticket.priority === "High"
              ? "error"
              : ticket.priority === "Medium"
              ? "warning"
              : "success"
          }
          fontWeight="medium"
        >
          {ticket.priority}
        </MDTypography>
      ),
      status: (
        <MDTypography
          variant="caption"
          color={
            ticket.status === "Open"
              ? "error"
              : ticket.status === "In Progress"
              ? "warning"
              : ticket.status === "Escalated"
              ? "info"
              : "success"
          }
          fontWeight="medium"
        >
          {ticket.status}
        </MDTypography>
      ),
      customer: ticket.customer,
      slaLevel: ticket.slaLevel,
      assignedTo: ticket.assignedTo || "Unassigned",
      timeline: (
        <MDBox>
          <MDTypography variant="caption" display="block">
            Created: {new Date(ticket.createdAt).toLocaleString()}
          </MDTypography>
          <MDTypography variant="caption" display="block">
            Deadline: {new Date(ticket.deadline).toLocaleString()}
          </MDTypography>
          {ticket.escalationHistory && (
            <MDTypography variant="caption" display="block" color="info">
              Escalated: {ticket.escalationHistory.length} times
            </MDTypography>
          )}
        </MDBox>
      ),
      actions: (
        <MDButton variant="text" color="info" size="small" onClick={(e) => openMenu(e, ticket.id)}>
          <Icon>more_vert</Icon>
        </MDButton>
      ),
    })),
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
                py={1.5}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Ticket Management
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={ticketsData}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      <Menu
        anchorEl={menu}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        open={Boolean(menu)}
        onClose={closeMenu}
        keepMounted
      >
        {employees.map((employee) => (
          <MenuItem
            key={employee.name}
            onClick={() => handleAssignTicket(selectedTicket, employee.name)}
          >
            Assign to {employee.name} ({employee.slaLevel})
          </MenuItem>
        ))}
        <MenuItem divider />
        <MenuItem onClick={() => handleUpdateStatus(selectedTicket, "In Progress")}>
          Mark as In Progress
        </MenuItem>
        <MenuItem onClick={() => handleUpdateStatus(selectedTicket, "Resolved")}>
          Mark as Resolved
        </MenuItem>
        <MenuItem onClick={() => handleEscalateTicket(selectedTicket)}>Escalate Ticket</MenuItem>
      </Menu>
      <MDSnackbar
        color={notification.type}
        icon={notification.type === "success" ? "check" : "warning"}
        title={notification.type === "success" ? "Success" : "Error"}
        content={notification.message}
        open={notification.open}
        onClose={() => setNotification({ ...notification, open: false })}
        close={() => setNotification({ ...notification, open: false })}
        bgWhite
      />
    </DashboardLayout>
  );
}

export default TicketManagement;
