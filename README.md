Technology Stack
Frontend:
- React 19
- React Router DOM v7
- Axios
- Tailwind CSS
- Recharts
- React Icons
Backend:
- Node.js
- Express 5
- MongoDB (via Mongoose)
- JWT Authentication
- Bcrypt
- Dotenv
Project Structure & Dependencies
Frontend package.json

"dependencies": {
  "axios": "^1.9.0",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-icons": "^5.5.0",
  "react-router-dom": "^7.6.1",
  "recharts": "^2.15.3",
  "@headlessui/react": "^2.2.4"
},
"devDependencies": {
  "tailwindcss": "^3.4.1",
  "postcss": "^8.5.4",
  "autoprefixer": "^10.4.21"
}

Backend package.json

"dependencies": {
  "express": "^5.1.0",
  "mongoose": "^8.15.1",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^3.0.2",
  "cors": "^2.8.5",
  "dotenv": "^16.5.0"
},
"devDependencies": {
  "nodemon": "^3.1.10"
}

Setup Instructions
Prerequisites:
- Node.js v14+
- MongoDB (local or Atlas)
Backend Setup
1. Navigate to backend folder
2. Run `npm install`
3. Create a .env file with:
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret_key
4. Run server with `nodemon server.js`
Frontend Setup
1. Navigate to frontend folder
2. Run `npm install`
3. Run client with `npm start`
4. Visit: http://localhost:3000
Features

- Admin: Creates, Edit and Delete tasks, Assigns tasks to users, view task analytics.
- User: View tasks, submit tasks to mark as completed
- Realtime task status update
- Secure login via JWT
- Dashboard analytics with charts.
