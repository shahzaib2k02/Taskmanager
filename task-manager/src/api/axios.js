import axios from 'axios';

const api = axios.create({
  baseURL: 'https://taskmanager-dl2q.onrender.com/api', // 🔁 Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
