# 🚀 Mini Seller Console

A lightweight **React + Tailwind CSS** console to manage leads and convert them into opportunities.  
Designed to demonstrate **state management**, **optimistic updates**, **slide-over panels**, and a **responsive UI** using only local JSON data.

---

## ⚡ Features

### 📋 Leads Management
- Load leads from `src/leads.json`
- 🔍 Search by **name** or **company**
- 🎯 Filter by **status**: New, Contacted, Qualified, Lost
- 📊 Sort by **score descending**

### 📝 Lead Detail Panel
- Slide-over panel when clicking a lead
- ✏️ Inline edit **email** and **status**
- 💾 Save/Cancel actions with error handling

### 💼 Opportunities
- Convert a lead into an opportunity with a single click
- Simple table with:
  - ID 🆔
  - Name 🧑‍💼
  - Stage 📈
  - Account Name 🏢
  - Optional Amount 💰

### 🌟 UX & Performance
- ⏳ Loading, empty, and error states
- 🏎️ Handles ~100 leads smoothly
- 📱 Fully responsive (desktop → mobile)

---

## 🛠️ Tech Stack

- ⚛️ React (v19.1.1)
- ⚡ Vite
- 🎨 Tailwind CSS
- 📂 Local JSON as data source
- 🌐 Context API for global state
- ⏱️ Simulated latency with `setTimeout`

---

## 🏁 Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/yourusername/mini-seller-console.git
cd mini-seller-console

2️⃣ Install dependencies
npm install

3️⃣ Run the development server
npm run dev


Open http://localhost:5173 in your browser.

🗂️ Project Structure
mini-seller-console/
├─ src/
│  ├─ leads.json           # Local leads data
│  ├─ App.jsx              # Main app component
│  ├─ AppContext.jsx       # Global state provider
│  ├─ main.jsx             # ReactDOM entry
│  ├─ api.js               # Lead fetch/save simulation
│  ├─ index.css            # Tailwind imports
│  └─ components/          # React components
│     ├─ LeadsList.jsx
│     ├─ LeadDetailPanel.jsx
│     ├─ OpportunitiesTable.jsx
│     └─ SlideOver.jsx
├─ index.html
├─ package.json
├─ tailwind.config.js
└─ vite.config.js

🔮 Future Improvements

💾 Persist filters and sort order in localStorage

⚠️ Rollback for network errors (optimistic update failures)

📱 Enhanced responsive design for tablets and mobile

✅ Unit and integration tests

📄 Example Lead (leads.json)
{
  "id": "1",
  "name": "John Doe",
  "company": "Acme Inc",
  "email": "john.doe@acme.com",
  "source": "LinkedIn",
  "score": 85,
  "status": "New"
}

📝 License

MIT License