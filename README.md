# 🏥 VitalCare

A full-stack **doctor appointment booking system** that allows users to find doctors based on specialization, schedule appointments, and make secure payments. It includes separate dashboards for **patients, doctors, and administrators** to ensure efficient appointment management.

## 📌 Features

### 👤 **User Panel**
- User registration and login.
- Browse doctors based on specialization.
- Book appointments with time selection.
- Make secure payments via **Razorpay**.

### 🩺 **Doctor Panel**
- Use login
- Edit profile information.
- View scheduled appointments and earnings.
- Mark appointments as **completed** or **canceled**.

### 🔧 **Admin Panel**
- Use login
- Add and manage doctor profiles.
- View all doctors and their availability status.
- Manage all appointments and doctor listings.
- Enable or disable doctors for appointment bookings.

## 🛠 Tech Stack

| Technology | Description |
|------------|------------|
| **Frontend** | React (Vite), Tailwind CSS, HTML, CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Payment Gateway** | Razorpay |

## 🚀 Getting Started

### 🔹 **Installation**
    Clone the repository:
   git clone [https://github.com/ritishri/VitalCare.git]

## Install dependencies
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install

## Start the application
# Run backend
cd backend
npm start

# Run frontend
cd frontend
npm run dev

## Create .env for server
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
CURRENCY = INR
CLOUDINARY_CLOUD_NAME = your_cloudinary_cloud_name
CLOUDINARY_API_KEY = your_cloudinary_API_key
CLOUDINARY_API_SECRET = your_cloudinary_API_seceret 

## Create .env for client
RAZORPAY_KEY=your_razorpay_key
