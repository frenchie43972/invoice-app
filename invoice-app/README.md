## 🧭 Project Tracker (Active)

### ✅ Completed

| Area / Feature                   | Status | Notes                                                                                                                                                                  |
| -------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project Initialization           | ✔      | Vue 3 + Vite app scaffolded                                                                                                                                            |
| State Management Setup           | ✔      | Pinia initialized with `pinia-plugin-persistedstate` for persistence                                                                                                   |
| Invoice Store                    | ✔      | Store fully functional — seed data, persistence, getters, `datePaid` reactivity fixed                                                                                  |
| Invoice List Component           | ✔      | Displays all invoices with reactive updates and loading spinner via `useLoading()`                                                                                     |
| Invoice Item Component           | ✔      | Emits `markAsPaid` / `removeInvoice`; fixed “Paid on” reactivity bug                                                                                                   |
| Invoice Form Component           | ✔      | Adds new invoices with validation, `min` date restriction, and async handling                                                                                          |
| useLoading Composable            | ✔      | Centralized loading logic (`show`, `hide`, `withLoading`) for async UI control                                                                                         |
| BaseCard Cleanup                 | ✔      | Unified layout for all cards, responsive 3–4 per row grid system                                                                                                       |
| UX Consistency Pass              | ✔      | All components styled consistently; responsive across viewports                                                                                                        |
| BaseInput Enhancement            | ✔      | Added `$attrs` for native attribute support (`min`, `max`, etc.)                                                                                                       |
| Form & List Integration          | ✔      | InvoiceForm integrated into InvoiceList; tested add/remove/paid flow                                                                                                   |
| README Project Log Sync          | ✔      | Updated README tracker and documentation alignment                                                                                                                     |
| **Vue Router Setup**             | ✔      | Configured `src/router/index.js`, added routes for Home, Invoices, Clients, Reports, Settings; tested navigation and 404 fallback                                      |
| **HomeView Dashboard (Phase 1)** | ✔      | Created `HomeView` with Quick Actions section and responsive dashboard showing live totals for invoices (Paid/Unpaid/Total); verified reactivity and responsive layout |

---

### 🧩 To-Do (MVP Scope)

| Task                            | Description                                                               | Priority |
| ------------------------------- | ------------------------------------------------------------------------- | -------- |
| Dashboard Visual Polish         | Refine card colors, shadows, and hover effects for better visual contrast | 🔹 Med   |
| Dashboard Metrics (Enhancement) | Display total invoice **amounts** (sum of paid/unpaid) alongside counts   | 🔹 Med   |
| Undo / Mark Unpaid              | Add option to revert paid invoices                                        | 🔹 Low   |
| Date Formatting                 | Display “Paid on” date in localized readable format                       | 🔹 Low   |
| Client & Item Management        | Add client list and line items to invoices                                | 🔺 High  |
| Tax Handling                    | Add per-invoice or per-item tax logic                                     | 🔺 Med   |
| PDF Export                      | Integrate `html2pdf.js` for printable invoices                            | 🔺 Med   |
| Backend Setup                   | Implement Express API + SQLite persistence                                | 🔺 High  |
| Deployment                      | Configure GitHub Pages + Render / Railway                                 | 🔹 Low   |

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

Continue building on HomeView (Dashboard):

- Polish visual hierarchy (card color, depth, contrast).

- Expand metrics to include total invoice amounts for more meaningful insight.

- Prepare structure for upcoming backend data sync.

Last updated: 2025-10-22
