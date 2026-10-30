# Customer Support – Automatic Ticket Generation using RPA

A React web application for a customer-support platform where customers can raise and track support tickets, and support staff / admins can manage tickets, employees and customers. The project is the front end of a system whose goal is to **generate support tickets automatically using RPA (Robotic Process Automation)** from customer interactions such as chat and contact requests.

The UI is built on the open-source [Material Dashboard 2 React](https://github.com/creativetimofficial/material-dashboard-react) template (MIT licensed) by Creative Tim, using React 18 and Material UI 5.

> **Project status:** The front end is working. Parts of it (tickets, bookings) currently use **mock data**, and the authentication calls expect a separate backend API that is **not included** in this repository. The RPA automation itself is not part of this repository yet.

## Features

### Customer portal (`/customer/...`)
- Dashboard with a summary of tickets and recent bookings
- My Bookings
- View Tickets and Create Ticket
- Chat Support (and a floating chatbot button)
- Contact Us
- Profile
- Feedback widget (response time and satisfaction ratings)

### Admin / support portal (`/admin/...`)
- Admin dashboard
- Ticket Management
- Employee Management
- My Assigned Tickets
- Customer Management
- Profile

### General
- Sign In / Sign Up pages
- Role-based navigation (customer view and admin view)
- Light / dark theme and RTL support (from the template)
- Charts, tables and responsive layout

## Tech stack

| Area | Technology |
|---|---|
| Framework | React 18 (Create React App / `react-scripts` 5) |
| UI library | Material UI 5, Emotion |
| Routing | React Router 6 |
| Charts / tables | Chart.js, react-chartjs-2, react-table |
| Validation | Yup |
| HTTP | Fetch API, Axios |
| Linting / formatting | ESLint, Prettier |

## Prerequisites

Install these before running the project:

1. **[Node.js](https://nodejs.org/)** 18 or newer (LTS recommended). This includes **npm**.
2. **[Git](https://git-scm.com/)** to clone the repository.
3. A modern browser (Chrome, Edge, Firefox).
4. *(Optional)* **[Visual Studio Code](https://code.visualstudio.com/)** with the ESLint and Prettier extensions.
5. *(Optional)* A backend API for login and user data (see [Backend / API configuration](#backend--api-configuration)).

Check your installation:

```bash
node -v
npm -v
git --version
```

## Getting started

```bash
# 1. Clone the repository
git clone https://github.com/Pavankumarkr0717/Customer-Support-Automatic-ticket-generation-using-RPA.git
cd Customer-Support-Automatic-ticket-generation-using-RPA

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Start the development server
npm start
```

The app opens at **http://localhost:3000**. Without a backend, it opens on the Customer Dashboard.

> **Windows note:** the `start` and `build` scripts use `set "GENERATE_SOURCEMAP=false"`, which works in Windows `cmd`/PowerShell. On macOS/Linux, run `GENERATE_SOURCEMAP=false npx react-scripts start` instead.

## Available scripts

| Command | Description |
|---|---|
| `npm start` | Run the app in development mode on port 3000 |
| `npm run build` | Create an optimized production build in `build/` |
| `npm test` | Run the test runner |
| `npm run lint` | Lint and auto-fix `src/**/*.{js,jsx}` |
| `npm run format` | Format source files with Prettier |
| `npm run format:check` | Check formatting without changing files |

## Backend / API configuration

The front end talks to backend services at hard-coded addresses. Change them to match your backend:

| File | Setting | Default | Purpose |
|---|---|---|---|
| [`src/context/auth.js`](src/context/auth.js) | `fetch("http://127.0.0.1:8000/auth/me")` | `http://127.0.0.1:8000` | Validates the stored `access_token` and loads the current user |
| [`src/services/api.js`](src/services/api.js) | `API_BASE_URL` | `http://localhost:5000/api` | Base URL for the ticket and booking services (currently returning mock data) |

If no backend is running, the stored token is treated as invalid and you are treated as signed out.

## Project structure

```
├── public/                 Static files and index.html
├── src/
│   ├── App.js              Root component, routing and layout
│   ├── routes.js           Customer, admin and authentication routes
│   ├── assets/             Images, themes (light / dark), styles
│   ├── components/         MD* UI components, ChatBot, Feedback, AuthCheck
│   ├── context/            UI state context and auth context
│   ├── examples/           Template building blocks (Sidenav, Navbars, Charts, Tables ...)
│   ├── layouts/            Pages: customer, admin, authentication, dashboard, requests ...
│   ├── services/           API / mock data services
│   └── utils/              Helpers
├── package.json
├── jsconfig.json           Absolute import paths from `src/`
└── genezio.yaml            Optional deployment config
```

## Roadmap

- Connect to a real backend API for tickets, bookings and authentication
- Add the RPA workflow that creates tickets automatically from chat and contact requests
- Persist chat conversations and link them to tickets
- Add automated tests

## Troubleshooting

- **Peer dependency errors during install:** use `npm install --legacy-peer-deps` (also set in `.npmrc`).
- **Port 3000 already in use:** run `set PORT=3001 && npm start` (Windows) or `PORT=3001 npm start` (macOS/Linux).
- **Blank page or login problems:** check that the backend URLs above are reachable, or clear `access_token` from your browser's local storage.

## License and credits

Built on [Material Dashboard 2 React](https://www.creative-tim.com/product/material-dashboard-react) by [Creative Tim](https://www.creative-tim.com/), released under the MIT License. See [LICENSE.md](LICENSE.md).
