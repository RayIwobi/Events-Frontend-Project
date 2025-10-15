# 🥗 NediFoods — Full-Stack eCommerce Website

**Live Site**: [https://nedifoods.co.uk](https://nedifoods.co.uk)  
**Backend API**: [https://nediecom.onrender.com/](https://nediecom.onrender.com/)

NediFoods is a modern and fully functional eCommerce platform for a food business, built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It supports full product management, Stripe payment integration, user authentication, admin dashboard, and order handling.

---

## ⚙️ Tech Stack

### Frontend
- **React** with Hooks and Context API
- **Axios** for API requests
- **Tailwind CSS** for UI design
- **React Router** for navigation

### Backend
- **Node.js** & **Express.js**
- **MongoDB** with Mongoose
- **Stripe Checkout** for secure payments
- **JWT Authentication** with HTTP-only cookies
- **Nodemailer** & **Mailtrap** for transactional emails
- **Webhooks** for post-payment order handling

---

## 🚀 Features

### ✅ User Features
- Browse products by category
- Add to cart, update quantities
- Secure checkout with Stripe
- Order confirmation email
- Order history on user dashboard

### 🔐 Authentication
- Register/Login with secure JWT cookies
- Role-based access (user/admin)

### 🛒 Admin Features
- Add, update, and delete products
- Manage categories
- View all orders
- Automatic email notifications on new orders

---

## 📦 Project Structure

nedifoods/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ └── App.jsx
├── server/ # Node.js backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── utils/
│ └── index.js