/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

/**
=========================================================
* Customer Support System - Bus and Train Ticket Booking
=========================================================
*/

// Customer layouts
import CustomerDashboard from "layouts/customer/dashboard";
import Bookings from "layouts/customer/bookings";
import SupportTickets from "layouts/customer/support-tickets";
import CreateTicket from "layouts/customer/create-ticket";
import ChatSupport from "layouts/customer/chat-support";
import ContactUs from "layouts/customer/contact-us";
import CustomerProfile from "layouts/customer/profile";

// Admin layouts
import AdminDashboard from "layouts/admin/dashboard";
import TicketManagement from "layouts/admin/ticket-management";
import AssignedTickets from "layouts/admin/assigned-tickets";
import CustomerManagement from "layouts/admin/customer-management";
import AdminProfile from "layouts/admin/profile";
import EmployeeManagement from "layouts/admin/employee-management";

// Authentication
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";

const handleLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_role");
  localStorage.removeItem("userData");
  window.location.href = "/authentication/sign-in";
};

const customerRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "customer-dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/customer/dashboard",
    component: CustomerDashboard,
  },
  {
    type: "collapse",
    name: "My Bookings",
    key: "my-bookings",
    icon: <Icon fontSize="small">confirmation_number</Icon>,
    route: "/customer/bookings",
    component: Bookings,
  },
  {
    type: "collapse",
    name: "View Tickets",
    key: "support-tickets",
    icon: <Icon fontSize="small">visibility</Icon>,
    route: "/customer/tickets",
    component: SupportTickets,
  },
  {
    type: "collapse",
    name: "Create Ticket",
    key: "create-ticket",
    icon: <Icon fontSize="small">add_circle</Icon>,
    route: "/customer/create-ticket",
    component: CreateTicket,
  },
  {
    type: "collapse",
    name: "Chat Support",
    key: "chat-support",
    icon: <Icon fontSize="small">chat</Icon>,
    route: "/customer/chat",
    component: ChatSupport,
  },
  {
    type: "collapse",
    name: "Contact Us",
    key: "contact-us",
    icon: <Icon fontSize="small">contact_support</Icon>,
    route: "/customer/contact",
    component: ContactUs,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "customer-profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/customer/profile",
    component: CustomerProfile,
  },
  {
    type: "divider",
  },
  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small">logout</Icon>,
    onClick: handleLogout,
  },
];

const adminRoutes = [
  {
    type: "collapse",
    name: "Admin Dashboard",
    key: "admin-dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/admin/dashboard",
    component: AdminDashboard,
  },
  {
    type: "collapse",
    name: "Ticket Management",
    key: "ticket-management",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/admin/tickets",
    component: TicketManagement,
  },
  {
    type: "collapse",
    name: "Employee Management",
    key: "employee-management",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/admin/employees",
    component: EmployeeManagement,
  },
  {
    type: "collapse",
    name: "My Assigned Tickets",
    key: "assigned-tickets",
    icon: <Icon fontSize="small">work</Icon>,
    route: "/admin/assigned-tickets",
    component: AssignedTickets,
  },
  {
    type: "collapse",
    name: "Customer Management",
    key: "customer-management",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/admin/customers",
    component: CustomerManagement,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "admin-profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/admin/profile",
    component: AdminProfile,
  },
  {
    type: "divider",
  },
  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small">logout</Icon>,
    onClick: handleLogout,
  },
];

const authRoutes = [
  {
    type: "route",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    component: SignIn,
  },
  {
    type: "route",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    component: SignUp,
  },
];

export { customerRoutes, adminRoutes, authRoutes };
