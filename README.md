# 🛒 Full Stack Shopping List

A modern, responsive full-stack application for managing a shopping list, built as part of a technical assessment. The application allows users to add, toggle (mark as bought), and delete items in real-time.

---

## 🚀 Features

* **Add Items:** Quick entry for new shopping products.

* **Toggle Status:** Mark items as "bought" with a visual strike-through effect.

* **Delete Items:** Remove entries from the database.

* **Responsive Design:** Optimized for both desktop and mobile devices using CSS Media Queries.

* **Type Safety:** End-to-end TypeScript integration for reliable data handling.

---

## 🛠 Tech Stack

### Frontend

* **React 18** (TypeScript)

* **Material UI (MUI):** Used for polished, accessible components.

* **Fetch API:** For backend communication.

* **CSS3:** Custom styles for layout and responsiveness.

### Backend

* **Node.js & Express** (TypeScript)

* **MongoDB & Mongoose:** For data persistence and schema modeling.

* **dotenv:** Environment variable management.

* **CORS:** Cross-Origin Resource Sharing enabled for frontend integration.

---

## 🚀 Setup & Installation

Follow these steps to get the project running locally:

### 1. Prerequisites
* **Node.js** (v16+ recommended)
* **MongoDB** (Local instance or Docker)

### 2. Database Setup
This project expects a MongoDB instance running. If you use Docker, you can start it quickly:
```bash
docker run -d --name shopping-db -p 27017:27017 mongo
```

### 3. Backend Setup
* Navigate to the `backend` folder.
* Install dependencies:
```bash
npm install
```
* Configure environment variables in a `.env` file:
```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/shoppinglist
```
* Start the development server:
```bash
npm run dev
```

### 4. Frontend Setup
* Navigate to the `frontend` folder.
* Install dependencies:
```bash
npm install
```
* Start the Vite development server:
```bash
npm run dev
```
* Open http://localhost:5173 in your browser.

---

## 🧠 Key Architecture Decisions
### Clean Controller Logic
The backend utilizes a custom `asyncHandler` higher-order function. This eliminates the need for repetitive `try-catch` blocks, ensuring that all asynchronous errors are automatically passed to the Express error-handling middleware.

### Strict Type Safety
I used shared TypeScript interfaces (see `models/shoppingItem.ts`) across the stack. This ensures that the data structure sent by the Express API matches exactly what the React components expect.

### Robust API Design
* **Validation Middleware:** The `updateItemStatus` route uses a specific `validateBoughtStatus` middleware to ensure data integrity before reaching the database.

* **Service Layer:** The frontend logic is decoupled from the components into `itemService.ts`, making the code easier to test and maintain.

### Responsive UI
The application features a mobile-first design strategy. Using `App.css`, the container adapts from a centered paper-style layout on desktop to a full-screen experience on mobile devices.

---

## 📬 Contact
**Raphaela Multhaup** [Portfolio](https://raphaela-multhaup.de/) | [LinkedIn](https://www.linkedin.com/in/raphaela-multhaup-096aba353/) | [GitHub](https://github.com/RaphaelaMulthaup)

Email: [kontakt@raphaela-multhaup.de](mailto:kontakt@raphaela-multhaup.de)