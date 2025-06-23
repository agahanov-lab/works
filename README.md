# Dark Math Horizon

A personal portfolio and mathematics learning platform.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- MongoDB Community Server
- Git

## Quick Start (After Reopening)

1. Start MongoDB (if not running):
   - Open Services (Windows + R, type "services.msc")
   - Find "MongoDB" and make sure it's running
   - Or run MongoDB manually: `mongod`

2. Start the backend server:
```bash
cd backend
node server.js
```

3. In a new terminal, start the frontend:
```bash
cd dark-math-horizon  # if not already in the project folder
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/agahanov-lab/works.git
cd works
```

### 2. Install Dependencies

Install frontend dependencies:
```bash
npm install
```

Install backend dependencies:
```bash
cd backend
npm install
cd ..
```

### 3. Set up MongoDB

1. Make sure MongoDB is installed and running
2. Create a `.env` file in the `backend` directory with the following content:
```
MONGODB_URI=mongodb://localhost:27017/dark-math-horizon
PORT=5000
```

### 4. Start the Application

1. Start the backend server:
```bash
cd backend
node server.js
```

2. In a new terminal, start the frontend development server:
```bash
npm run dev
```

The application should now be running at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Features

- Interactive mathematics learning platform
- Project showcase
- Algorithm demonstrations
- Resume management
- Admin dashboard for content management

## Development Notes

- Frontend built with React + TypeScript + Vite
- Backend uses Express.js + MongoDB
- Styling with Tailwind CSS and Shadcn/ui components
- File uploads handled through Multer - Personal Portfolio

Built by Mekan Agahanov

## About This Project
I built this portfolio to showcase my passion for mathematics, algorithms, and software development. It serves as a dynamic platform where I can share my projects, mathematical insights, and algorithmic solutions. The portfolio features a modern, interactive interface with a secure admin dashboard that allows me to easily manage and update content.

## What You Can Do
- **Browse Projects**: Explore my technical projects with detailed descriptions and GitHub links
- **Discover Mathematics**: Dive into mathematical concepts, equations, and their real-world applications
- **Learn Algorithms**: Study various algorithmic solutions and their implementations
- **Download Resume**: Access my latest resume directly from the About page
- **Contact**: Connect with me through LinkedIn or GitHub

## Admin Features
Through the secure admin dashboard, I can:
- Add/edit projects with descriptions and GitHub links
- Upload and manage mathematical topics and equations
- Share algorithm implementations and explanations
- Upload and update my resume
- Manage all content dynamically without code changes

## Technical Stack

### Frontend
- **React** with **TypeScript** for robust development
- **Vite** for lightning-fast builds
- **Tailwind CSS** with **shadcn-ui** for sleek, modern UI
- **React Router** for seamless navigation
- **React Type Animation** for engaging text effects

### Backend
- **Node.js** with **Express.js** for API development
- **MongoDB** for flexible data storage
- **JWT** for secure authentication
- **Multer** for file uploads

### Features Highlight
- Responsive design that works on all devices
- Dark theme optimized for comfortable viewing
- Secure admin dashboard with authentication
- File upload system for resume management
- Real-time content updates
- API integration for dynamic content

## Local Development

1. Clone the repository:
```sh
git clone <YOUR_GIT_URL>
```

2. Install frontend dependencies:
```sh
cd dark-math-horizon
npm install
```

3. Install backend dependencies:
```sh
cd backend
npm install
```

4. Start the development servers:

Frontend (in the root directory):
```sh
npm run dev
```

Backend (in the backend directory):
```sh
npm run dev
```

## Features
- **Projects**: Showcase of technical projects and implementations
- **Mathematics**: Exploration of mathematical concepts and their applications
- **Algorithms**: Implementation and explanation of various algorithms
- **Admin Dashboard**: Secure content management system
- **Resume Management**: Upload and manage resume directly through the admin interface

## Project Structure

### Frontend (`/src`)
- `/components`: Reusable UI components and layouts
- `/pages`: Main application views (Home, About, Projects, etc.)
- `/lib`: Utility functions and API service
- `/hooks`: Custom React hooks
- `/components/ui`: shadcn-ui components

### Backend (`/backend`)
- `/models`: MongoDB schemas for Projects, Math Topics, Algorithms, and Resume
- `/routes`: API endpoints for each feature
- `/uploads`: Storage for uploaded files (resumes)

### Additional Directories
- `/public`: Static assets and favicon
- `/docs`: Project documentation (if any)

## Environment Setup
Make sure you have the following installed:
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

## Contact
Feel free to reach out to me:
- LinkedIn: [Mekan Agahanov](https://www.linkedin.com/in/mekan-agahanov/)
- GitHub: [agahanov-lab](https://github.com/agahanov-lab)
