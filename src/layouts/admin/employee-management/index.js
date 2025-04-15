import { useState } from "react";
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

// Initial employees with different SLA levels
const initialEmployees = [
  {
    id: "EMP001",
    name: "John Smith",
    email: "john.smith@example.com",
    department: "Customer Support",
    role: "Senior Support Agent",
    slaLevel: "Platinum",
    skillPoints: 95,
    ticketsResolved: 120,
    averageResolutionTime: "2h 15m",
    customerSatisfaction: "98%",
  },
  {
    id: "EMP002",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    department: "Customer Support",
    role: "Support Agent",
    slaLevel: "Gold",
    skillPoints: 75,
    ticketsResolved: 85,
    averageResolutionTime: "3h 30m",
    customerSatisfaction: "92%",
  },
  {
    id: "EMP003",
    name: "Mike Wilson",
    email: "mike.wilson@example.com",
    department: "Customer Support",
    role: "Junior Support Agent",
    slaLevel: "Silver",
    skillPoints: 45,
    ticketsResolved: 50,
    averageResolutionTime: "4h 45m",
    customerSatisfaction: "85%",
  },
  {
    id: "EMP004",
    name: "Emily Brown",
    email: "emily.brown@example.com",
    department: "Customer Support",
    role: "Trainee Support Agent",
    slaLevel: "Bronze",
    skillPoints: 20,
    ticketsResolved: 15,
    averageResolutionTime: "6h 20m",
    customerSatisfaction: "78%",
  },
];

function EmployeeManagement() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [menu, setMenu] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const openMenu = (event, employeeId) => {
    setSelectedEmployee(employeeId);
    setMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setSelectedEmployee(null);
    setMenu(null);
  };

  const handlePromoteEmployee = (employeeId) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) => {
        if (emp.id === employeeId) {
          let newLevel;
          let additionalPoints;
          switch (emp.slaLevel) {
            case "Bronze":
              newLevel = "Silver";
              additionalPoints = 25;
              break;
            case "Silver":
              newLevel = "Gold";
              additionalPoints = 30;
              break;
            case "Gold":
              newLevel = "Platinum";
              additionalPoints = 35;
              break;
            default:
              return emp; // Already at highest level
          }
          return {
            ...emp,
            slaLevel: newLevel,
            skillPoints: emp.skillPoints + additionalPoints,
          };
        }
        return emp;
      })
    );
    setNotification({
      open: true,
      message: "Employee promoted successfully!",
      type: "success",
    });
    closeMenu();
  };

  const handleAddSkillPoints = (employeeId, points) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === employeeId
          ? {
              ...emp,
              skillPoints: Math.min(emp.skillPoints + points, 100), // Cap at 100 points
            }
          : emp
      )
    );
    setNotification({
      open: true,
      message: `Added ${points} skill points!`,
      type: "success",
    });
    closeMenu();
  };

  const employeesData = {
    columns: [
      { Header: "Employee ID", accessor: "id", width: "10%" },
      { Header: "Name", accessor: "name", width: "15%" },
      { Header: "Email", accessor: "email", width: "20%" },
      { Header: "Department", accessor: "department", width: "15%" },
      { Header: "Role", accessor: "role", width: "15%" },
      { Header: "SLA Level", accessor: "slaLevel", width: "10%" },
      { Header: "Skill Points", accessor: "skillPoints", width: "10%" },
      { Header: "Performance", accessor: "performance", width: "15%" },
      { Header: "Actions", accessor: "actions", width: "10%" },
    ],
    rows: employees.map((employee) => ({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      department: employee.department,
      role: employee.role,
      slaLevel: (
        <MDTypography
          variant="caption"
          color={
            employee.slaLevel === "Platinum"
              ? "primary"
              : employee.slaLevel === "Gold"
              ? "warning"
              : employee.slaLevel === "Silver"
              ? "info"
              : "text"
          }
          fontWeight="medium"
        >
          {employee.slaLevel}
        </MDTypography>
      ),
      skillPoints: (
        <MDTypography variant="caption" fontWeight="medium">
          {employee.skillPoints}/100
        </MDTypography>
      ),
      performance: (
        <MDBox>
          <MDTypography variant="caption" display="block">
            Resolved: {employee.ticketsResolved}
          </MDTypography>
          <MDTypography variant="caption" display="block">
            Avg. Time: {employee.averageResolutionTime}
          </MDTypography>
          <MDTypography variant="caption" display="block">
            Satisfaction: {employee.customerSatisfaction}
          </MDTypography>
        </MDBox>
      ),
      actions: (
        <MDButton
          variant="text"
          color="info"
          size="small"
          onClick={(e) => openMenu(e, employee.id)}
        >
          <Icon>more_vert</Icon>
        </MDButton>
      ),
    })),
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
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
                  Employee Management
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={employeesData}
                  isSorted={false}
                  entriesPerPage={true}
                  showTotalEntries={true}
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
        <MenuItem onClick={() => handlePromoteEmployee(selectedEmployee)}>
          Promote SLA Level
        </MenuItem>
        <MenuItem onClick={() => handleAddSkillPoints(selectedEmployee, 50)}>
          Add 50 Skill Points
        </MenuItem>
        <MenuItem onClick={() => handleAddSkillPoints(selectedEmployee, 100)}>
          Add 100 Skill Points
        </MenuItem>
      </Menu>
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

export default EmployeeManagement; 