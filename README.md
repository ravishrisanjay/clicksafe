# 🛡️ Phishing Awareness Simulator - ClickSafe

> An ethical web-based phishing simulation platform to raise cybersecurity awareness through realistic but safe phishing scenarios.

---

## 📖 Overview

Phishing Awareness Simulator is a full-stack application built to **educate users about phishing attacks** through ethical simulations. Users can create fake login links and pair them with SMS/Email message templates, then observe how many people click those links — **without collecting any sensitive data**.

The goal is to teach people how phishing works, how attackers exploit trust, and how to recognize such scams in real life.

---

## 🎯 Key Features

- ✅ **Simulate Phishing Attacks** via SMS and Email templates
- ✅ **Generate fake login links** (e.g., Facebook, Instagram, Amazon)
- ✅ **Track how many people click** the generated links
- ✅ **No credentials collected** — purely for awareness
- ✅ **User profile dashboard** showing stats (links created & clicked)
- ✅ **Awareness redirect page** warns users after clicking links

---

## 🧠 Architecture

### 🔧 Backend (Spring Boot)

- `User`: Stores login credentials (JWT-secured)
- `UserProfile`: Stores name, email, linksCreated, linksClicked
- `AuthController`: Handles login/signup via JWT
- `UserController`: Handles profile management
- `SimulationController`: Tracks phishing link clicks

### 🌐 Frontend (React.js)

- **Login/Register UI**
- **Attack Simulation Page** (SMS, Email, Login Pages)
- **Fake Login Page Preview in iframe**
- **Profile Analytics Dashboard**
- **Awareness Page** for victims

---

## 🔐 Authentication

JWT-based authentication system:
- On login, JWT is issued and stored in `localStorage`
- Every protected route/API checks for the JWT
- Secure user-specific link tracking

---

## 🧪 Simulation Flow

1. User selects a phishing template category (e.g., Bank, Social Media)
2. Chooses a message template and fake login page
3. Generates a custom shareable link like:
<<<<<<< HEAD
...
=======
>>>>>>> d322129cfddd84fc63e21138ac62fcba14f8bc2c
