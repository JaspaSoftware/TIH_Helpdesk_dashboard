# 📊 TIH Helpdesk Dashboard

🚀 A modern, full-stack Helpdesk Dashboard and Ticketing System designed for efficient facility management and issue tracking. Built with **React 19**, **Node.js**, and **MySQL**, it provides a streamlined experience for both reporters and administrators.

---

## ✨ Key Features

-   **🔍 Issue Tracking**: Comprehensive list of all reported tickets with advanced filtering and search.
-   **📝 Streamlined Submission**: Easy-to-use form for reporting issues with category, priority, building, and location details.
-   **📈 Real-time Analytics**: Visual data representations of helpdesk performance, ticket status, and trends using Recharts.
-   **📋 Kanban Task Board**: Intuitive drag-and-drop style interface for managing ticket progress.
-   **📱 Responsive Design**: Fully responsive UI built with Tailwind CSS and Radix UI primitives.
-   **🔒 Secure Authentication**: Robust security using JWT and bcrypt for user authentication.

---

## 🛠 Tech Stack

### Frontend
-   **Core**: React 19, TypeScript, Vite
-   **Styling**: Tailwind CSS (v4), Lucide React (Icons)
-   **UI Components**: Radix UI, Shadcn/UI (Primitives)
-   **State Management**: TanStack Query (React Query)
-   **Visualizations**: Recharts
-   **Navigation**: React Router 7

### Backend
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MySQL (mysql2)
-   **Security**: JSON Web Token (JWT), bcryptjs

---

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   MySQL Server
-   npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/JaspaSoftware/TIH_Helpdesk_dashboard.git
    cd TIH_Helpdesk_dashboard
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file in the root directory and configure your database and server settings:
    ```env
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=your_mysql_password
    DB_NAME=helpdesk_db
    PORT=5000
    JWT_SECRET=your_jwt_secret
    FRONTEND_URL=http://localhost:5173
    ```

4.  **Database Setup**:
    Initialize your MySQL database using the provided schema (if available) or create the necessary tables for tickets, users, categories, and buildings.

### Running the Application

1.  **Start the Backend Server**:
    ```bash
    node server.js
    ```

2.  **Start the Frontend Dev Server**:
    ```bash
    npm run dev
    ```

The application will be accessible at `http://localhost:5173`.

---

## 📁 Project Structure

```text
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Application pages (Dashboard, Issues, etc.)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and configurations
│   ├── types/          # TypeScript type definitions
│   └── App.tsx         # Main application entry and routing
├── config/             # Backend configurations (Database)
├── server.js           # Express server entry point
└── tailwind.config.ts  # Tailwind CSS configuration
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the ISC License.
