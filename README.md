# 🛡️ ClickSafe - Enterprise Phishing Defense Platform

> **AI-Powered Cybersecurity Awareness & Simulation Hub** > *Democratizing digital safety through interactive education, realistic simulations, and advanced threat detection.*

![Project Status](https://img.shields.io/badge/Status-Active-success)
![Tech Stack](https://img.shields.io/badge/Stack-Full%20Stack-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📖 Overview

**ClickSafe** is a sophisticated, full-stack cybersecurity platform designed to educate users about the dangers of phishing through **safe, ethical simulations** and **gamified learning**. 

Unlike traditional training tools, ClickSafe combines a **Premium Glassmorphism UI** with a powerful **Spring Boot Backend** and an **AI-based Phishing Detector** to provide a complete defense ecosystem. Users can test their skills against realistic fake login pages, learn from interactive modules, and even analyze suspicious text messages in real-time.

**Mission:** To empower digital citizens with the knowledge to recognize, avoid, and report cyber threats.

---

## ✨ Key Features

### 🧠 AI & Detection
- **🤖 Phishing AI Detector:** A heuristic analysis engine that scans messages for urgency, suspicious links, and common fraud patterns to give a safety verdict.
- **🛡️ Real-time Threat Analysis:** Instant feedback on potential threats.

### 🎭 Simulation Engine
- **Ethical Phishing Campaigns:** Generate safe, trackable links that mimic popular platforms (Netflix, Facebook, Amazon, etc.).
- **Safe Environment:** If a user clicks a simulation link, they are redirected to a friendly "Awareness Page" that explains what they missed—**no credentials are ever stored**.
- **Interactive Demos:** Live previews of how attacks look on Mobile vs. Desktop.

### 🎓 Educational Hub
- **Gamified Learning:** Complete modules on "Psychology of Attacks," "Red Flags," and more.
- **Progress Tracking:** Earn badges and track completion status via a persistent sidebar.
- **Interactive Quizzes:** Test knowledge with instant feedback.

### 📊 Analytics & Dashboard
- **Campaign Manager:** Track active links, click-through rates, and expiration statuses.
- **Visual Reports:** Beautiful charts showing engagement and vulnerability statistics.
- **User Profiles:** Manage personal stats and campaign history.

### 🚨 Victim Support
- **Incident Response Center:** Actionable guides for Financial Fraud, Social Media Hacks, and Sextortion.
- **Emergency Contacts:** Direct links to national cybercrime helplines (1930) and portals.

---

## 🛠️ Tech Stack

### **Frontend (The Experience)**
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS (Custom "Cyber Security" Dark Theme)
- **UI Components:** Glassmorphism design, Lucide React Icons
- **Visualization:** Recharts for analytics data
- **State Management:** React Context API

### **Backend (The Engine)**
- **Framework:** Java Spring Boot
- **Security:** Spring Security with JWT (JSON Web Token) Auth
- **Database:** MySQL with Hibernate/JPA
- **Architecture:** RESTful API with Service Layer pattern

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v16+)
- **Java JDK** (17 or 21)
- **MySQL Database**

### 1️⃣ Database Setup
Create a MySQL database named `clicksafe_db`:
```sql
CREATE DATABASE clicksafe_db;
