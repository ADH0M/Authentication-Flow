# 🦷 Next.js Authentication Flow Task

## 📌 Overview

This project is a simple **Next.js** application that implements an authentication flow including **Register, Login, and Account Verification**.  
After successful login, the **JWT Token** is stored in `localStorage`, and the user is redirected to a simple Dashboard displaying a welcome message.

---

## 🚀 Features

- **Register Page**:
  - Full Name
  - Email
  - Password
  - Phone Number
  - Country Code
- **Login Page**:
  - Email + Password
  - Store token in `localStorage`
- **Verify Account Page**:
  - Enter 6-digit verification code (test code: `123456`)
- **Dashboard Page**:
  - Shown after successful login
- **UI**:
  - Pixel-perfect according to provided mockup
  - Fully responsive (Desktop + Mobile)
- **API Integration**:
  - All pages are integrated with provided API endpoints (from Postman Collection)

---

## 🗂 Project Structure

```
project-root/
│── public/              # Static assets (images, icons, etc.)
│── src/
│   ├── app/             # Next.js 13 App Router
│   │   ├── login/       # Login page
│   │   ├── signup/      # Register page
│   │   ├── verify/      # Verify account page
│   │   ├── dashboard/   # Dashboard page (protected)
│   │   └── layout.tsx   # Root layout
│   │
│   ├── components/      # Reusable UI components
│   │   ├── ui/inputs.tsx
│   │   └── ...
│   │
│   ├── lib/             # Helper functions (API calls, auth utils)
│   │   ├── api.ts       # Functions to call Register/Login/Verify APIs
│   │   └── auth.ts      # Handle token storage + auth checks
│   │
│   └── middleware.ts    # Protect routes with authentication
│
├── .gitignore           # Ignore node_modules, .next, .env, etc.
├── package.json         # Project dependencies
├── README.md            # Project documentation
└── tsconfig.json        # TypeScript config
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/username/nextjs-auth-task.git
cd nextjs-auth-task
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env.local` file in the project root and add your API URL:

```
NEXT_PUBLIC_API_URL=https://your-api-endpoint.com
```

### 4️⃣ Run the Project Locally

```bash
npm run dev
```

The app will run on:  
👉 `http://localhost:3000`

### 5️⃣ Build for Production

```bash
npm run build
npm run start
```

---

## ☁️ Deployment (Vercel)

1. Push the project to GitHub.
2. Go to [Vercel](https://vercel.com/) and log in with your GitHub account.
3. Click **Import Project** and select your repository.
4. Add Environment Variables (same as `.env.local`).
5. Click **Deploy** → You will get a live demo link.

---

## 📚 API Endpoints (from Postman Collection)

- **POST** `/register` → Register new user
- **POST** `/login` → Login user & get token
- **POST** `/verify` → Verify account with code

---

## ✅ Deliverables

- GitHub Repo link: `https://github.com/ADH0M/Authentication-Flow`
- Live Demo link: `https://authentication-flow-gilt.vercel.app/`[Demo](https://authentication-flow-gilt.vercel.app/)

---

## 👨‍💻 Developer

Developed by **Adham Said** 🚀
