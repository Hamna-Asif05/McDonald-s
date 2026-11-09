<div align="center">

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/200px-McDonald%27s_Golden_Arches.svg.png" alt="Golden Arch Dining logo" width="90"/>

# 🍟 McDonald's Clone

### A Full-Stack Food Delivery Store Locator & Community Web Application

*Fast. Responsive. Delicious by design.* 🍔

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://pk-mcdonald.netlify.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Hamna--Asif05-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Hamna-Asif05)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hamna-asif5)
[![Fiverr](https://img.shields.io/badge/Fiverr-Hire_Me-1DBF73?style=for-the-badge&logo=fiverr&logoColor=white)](https://www.fiverr.com/hamnaasif738)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)

</div>

---

## 📑 Table of Contents

- [📌 Overview](#-overview)
- [🚀 Live Demo](#-live-demo)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture](#️-architecture)
- [📂 Project Structure](#-project-structure)
- [⚙️ Getting Started](#️-getting-started)
- [🔌 Backend Modules](#-backend-modules)
- [🗺️ Roadmap](#️-roadmap)
- [👩‍💻 Author](#-author)

---

## 📌 Overview

**Golden Arch Dining** is a full-stack web application inspired by the McDonald's digital experience. The client is built with clean, vanilla web technologies and the server runs on **Express.js**, delivering a modern, responsive platform for **food ordering, store discovery, event bookings, and careers**.

> 🎯 **Goal:** Show how a real-world brand website can be built end-to-end — from pixel-perfect UI to modular REST-style backend handlers — without heavy frameworks.

---

## 🚀 Live Demo

| 🔗 Resource | 📍 Link |
| :--- | :--- |
| 🌐 **Production Site** | [pk-mcdonald.netlify.app](https://pk-mcdonald.netlify.app/) |
| 💻 **Source Code** | [github.com/Hamna-Asif05/McDonalds](https://github.com/Hamna-Asif05) |

---

## ✨ Key Features

### 🍔 1. Dynamic Menu & Category Filtering
- Instant switching between **Breakfast, Beef, Chicken, Crispy Meals, Wraps, Happy Meals, McCafé & Desserts**
- Two-way sync between the top dropdown menu and sidebar category pills
- Pricing cards with real-time **Add to Tray** interaction

### 🛍️ 2. Live Food Tray & Checkout
- Slide-in order drawer with **quantity updates**, **delivery fee** and **total calculation**
- Auto-generated **order IDs**
- Checkout sends `Customer Name`, `Phone`, `Address` and `Items` to the backend

### 📱 3. Fully Responsive Design
| 🖥️ Desktop | 📱 Mobile |
| :--- | :--- |
| Multi-column mega menu | App-style navigation drawer |
| Full-width headers | Animated hamburger (☰) |
| Spacious layouts | Collapsible footer accordions |

### 🎉 4. Events & Community Portals
- 🏭 **Kitchen Tour Booking** — slot registration with a custom "Other" branch/address field
- 🎂 **Birthday Celebrations** — reservation modal
- 📚 **Parents Reading Club** — reservation modal
- 👗 **IMA Fashion Runway 2026** — embedded video player + design voting

### 📍 5. Smart Store Locator
- City filters: **Gujranwala, Lahore, Karachi, Islamabad**
- **Geolocation API** to detect the user and find the nearest drive-thru

### 💼 6. Careers & Contact
- Careers listing handled by a dedicated controller
- Contact / support tickets saved via the backend

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| 🎨 **Frontend** | HTML5 · CSS3 (Flexbox, Grid, Responsive Layouts) · JavaScript (ES6+) |
| ⚙️ **Backend** | Node.js · Express.js |
| 🗄️ **Data** | JSON file store (`/data`) |
| 🖼️ **Icons & Media** | FontAwesome 6 · Google CDN video assets |
| ☁️ **Hosting** | Netlify (frontend) · Local / Cloud Node server |
| 🔧 **Version Control** | Git · GitHub |

---

## 🏗️ Architecture

```text
  ┌──────────────┐      fetch()       ┌──────────────┐      ┌──────────────┐
  │   Browser    │ ─────────────────► │  Express.js  │ ───► │ Controllers  │
  │ HTML/CSS/JS  │ ◄───────────────── │  (server.js) │ ◄─── │  (logic)     │
  └──────────────┘      JSON          └──────┬───────┘      └──────┬───────┘
                                              │                     │
                                       ┌──────▼───────┐      ┌──────▼───────┐
                                       │ apiRoutes.js │      │  /data/*.json│
                                       └──────────────┘      └──────────────┘
```

---

## 📂 Project Structure

```text
McDonalds/
│
├── controllers/            # 🧠 Backend logic handlers
│   ├── branchController.js
│   ├── careerController.js
│   ├── contactController.js
│   ├── menuController.js
│   └── orderController.js
│
├── data/                   # 🗄️ JSON data stores
│   ├── branches.json
│   ├── careers.json
│   ├── menu.json
│   ├── orders.json
│   └── tickets.json
│
├── routes/                 # 🛣️ API route dispatcher
│   └── apiRoutes.js
│
├── index.html              # 🧱 Single Page layout
├── style.css               # 🎨 Responsive design system
├── script.js               # ⚡ DOM, routing & async API calls
├── server.js               # 🚀 Express server setup
├── package.json            # 📦 Dependencies & metadata
└── README.md               # 📖 Documentation
```

---

## ⚙️ Getting Started

### ✅ Prerequisites
- [Node.js](https://nodejs.org/) v16 or higher
- Git

### 📥 Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/Hamna-Asif05/McDonalds.git

# 2️⃣ Go to the project folder
cd McDonalds

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start the server
node server.js
```

Then open the app in your browser (use the port shown in your terminal).

---

## 🔌 Backend Modules

| 🧩 Module | 📝 Responsibility | 🗄️ Data File |
| :--- | :--- | :--- |
| `menuController` | Serves menu items & categories | `menu.json` |
| `orderController` | Receives & stores customer orders | `orders.json` |
| `branchController` | Branch lookup by city / location | `branches.json` |
| `careerController` | Job listings | `careers.json` |
| `contactController` | Contact & support tickets | `tickets.json` |

---

## 🗺️ Roadmap

- [ ] 🔐 User authentication (login / signup)
- [ ] 🗃️ Move from JSON files to a real database (MongoDB / MySQL)
- [ ] 💳 Online payment integration
- [ ] 📦 Live order tracking
- [ ] 🌙 Dark mode

---

## 👩‍💻 Author

<div align="center">

**Hamna Asif**
*Full-Stack Developer · UI/UX Designer · AI Specialist*
BS Computer Science — University of the Punjab, 🇵🇰

[![GitHub](https://img.shields.io/badge/GitHub-Hamna--Asif05-181717?style=for-the-badge&logo=github)](https://github.com/Hamna-Asif05)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-hamna--asif5-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/hamna-asif5)
[![Fiverr](https://img.shields.io/badge/Fiverr-hamnaasif738-1DBF73?style=for-the-badge&logo=fiverr)](https://www.fiverr.com/hamnaasif738)
[![Email](https://img.shields.io/badge/Email-hamnaasif623@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:hamnaasif623@gmail.com)

---

⭐⭐

*This project is for educational and portfolio purposes only. McDonald's is a trademark of its respective owner.*

</div>
