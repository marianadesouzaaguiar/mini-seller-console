🚀 Mini Seller Console

A lightweight React + Tailwind CSS console to manage leads and convert them into opportunities.
Designed to demonstrate state management, optimistic updates, slide-over panels, and a responsive UI using local JSON data only.

⚡ Features

📊 Dashboard – summarizes total Leads and Opportunities

📋 LeadsPage – displays a list of leads with their status

📝 LeadDetailPanel – sliding panel to edit email and status, and convert a lead into an opportunity

💼 Opportunities – table of converted leads with ID, Name, Stage, Account Name, and optional Amount

🌐 Context API – manages global state for leads and opportunities

🎨 Tailwind CSS – slide-in animation for LeadDetailPanel

🌍 Navigation – powered by React Router

⏳ Loading, empty, and error states – smooth UX for asynchronous data

📱 Fully responsive – works from desktop to mobile

🛠️ Tech Stack

⚛️ React (v19.1.1)

⚡ Vite

🎨 Tailwind CSS

📂 Local JSON as data source

🌐 Context API for global state

⏱️ Simulated latency with setTimeout

🏁 Getting Started
1️⃣ Clone the repo
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
│     ├─ Dashboard.jsx
│     ├─ OpportunitiesTable.jsx
│     └─ SlideOver.jsx
├─ index.html
├─ package.json
├─ tailwind.config.js
└─ vite.config.js

🔮 Future Improvements

🔐 Authentication/Login – protect pages and personalize data per user

🌐 Backend Integration – connect to a real REST API instead of local JSON

🔍 Advanced Lead Search & Filters – improve filtering and sorting capabilities

📄 Data Export – export leads and opportunities as PDF or CSV

💾 Persist filters and sort order in localStorage

⚠️ Rollback for network errors (optimistic update failures)

📱 Enhanced responsive design for tablets and mobile

✅ Unit and integration tests

📝 LeadDetailPanel Overview

Edit Email and Status – update lead information inline

Email Validation – ensures correct email format before saving

Save Button – updates context with optimistic UI

Convert to Opportunity – quickly create new opportunities from a lead

Sliding Panel – smooth slide-in animation for better UX

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
