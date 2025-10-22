## 🧭 Project Tracker (Active)

### ✅ Completed

| Area / Feature          | Status | Notes                                                                                 |
| ----------------------- | ------ | ------------------------------------------------------------------------------------- |
| Project Initialization  | ✔      | Vue 3 + Vite app scaffolded                                                           |
| State Management Setup  | ✔      | Pinia initialized with `pinia-plugin-persistedstate` for persistence                  |
| Invoice Store           | ✔      | Store fully functional — seed data, persistence, getters, `datePaid` reactivity fixed |
| Invoice List Component  | ✔      | Displays all invoices with reactive updates and loading spinner via `useLoading()`    |
| Invoice Item Component  | ✔      | Emits `markAsPaid` / `removeInvoice`; fixed “Paid on” reactivity bug                  |
| Invoice Form Component  | ✔      | Adds new invoices with validation, `min` date restriction, and async handling         |
| useLoading Composable   | ✔      | Centralized loading logic (`show`, `hide`, `withLoading`) for async UI control        |
| BaseCard Cleanup        | ✔      | Unified layout for all cards, responsive 3–4 per row grid system                      |
| UX Consistency Pass     | ✔      | All components styled consistently; responsive across viewports                       |
| BaseInput Enhancement   | ✔      | Added `$attrs` for native attribute support (`min`, `max`, etc.)                      |
| Form & List Integration | ✔      | InvoiceForm integrated into InvoiceList; tested add/remove/paid flow                  |
| README Project Log Sync | ✔      | Updated README tracker and documentation alignment                                    |

---

### 🧩 To-Do (MVP Scope)

| Task                     | Description                                                 | Priority |
| ------------------------ | ----------------------------------------------------------- | -------- |
| Routing Setup            | Add Vue Router with `HomeView` (Dashboard) + `InvoicesView` | 🔺 High  |
| Dashboard Implementation | Create Home Dashboard: key stats + quick action buttons     | 🔺 High  |
| Undo / Mark Unpaid       | Add option to revert paid invoices                          | 🔹 Low   |
| Date Formatting          | Display “Paid on” date in localized readable format         | 🔹 Low   |
| Client & Item Management | Add client list and line items to invoices                  | 🔺 High  |
| Tax Handling             | Add per-invoice or per-item tax logic                       | 🔺 Med   |
| PDF Export               | Integrate `html2pdf.js` for printable invoices              | 🔺 Med   |
| Backend Setup            | Implement Express API + SQLite persistence                  | 🔺 High  |
| Deployment               | Configure GitHub Pages + Render / Railway                   | 🔹 Low   |

---

### ⚖️ Outstanding Decisions

| Topic            | Options                                                | Awaiting        |
| ---------------- | ------------------------------------------------------ | --------------- |
| Email Sending    | Frontend via **EmailJS** vs Backend via **nodemailer** | Decide post-MVP |
| Authentication   | Add user accounts or skip for MVP                      | TBD             |
| Data Persistence | Local SQLite vs hosted DB (e.g., Supabase)             | TBD             |
| State Storage    | Extend persisted Pinia state to backend sync           | TBD             |

---

### ⚙️ Tech Stack

- **Frontend:** Vue 3 + Pinia + Vanilla CSS
- **Backend:** Express.js + SQLite
- **PDF/Email:** html2pdf.js (frontend) + nodemailer (backend, later)
- **Deployment:** GitHub Pages (frontend) + Render or Railway (backend)

---

### 📊 Current Focus

Implement **Vue Router** and a **dashboard-style HomeView** that acts as the post-login landing page, showing invoice stats and shortcuts to create or view invoices.

_Last updated: 2025-10-22_
