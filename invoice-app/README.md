# 🧾 Invoice App (MiniBill)

A lightweight full-stack web application that allows freelancers and small businesses to create, send, and track invoices.  
Built with **Vue 3**, **Pinia**, **Express**, and **SQLite**, it focuses on clarity, simplicity, and real-world usability.

---

## 🧭 Project Tracker (Active)

### ✅ Completed

| Area                   | Status | Notes                                                               |
| ---------------------- | ------ | ------------------------------------------------------------------- |
| Project Initialization | ✔      | Vue 3 + Vite app scaffolded                                         |
| State Management Setup | ✔      | Pinia initialized and configured with `pinia-plugin-persistedstate` |
| Invoice Store          | ✔      | Created `invoiceStore.js` with mock invoice data and persistence    |
| Store Integration      | ✔      | Verified Pinia store works within `App.vue`                         |
| Repo Structure         | ✔      | Monorepo confirmed (frontend + backend planned)                     |

---

### 🧩 To-Do (MVP Scope)

| Task                     | Description                                           | Priority  |
| ------------------------ | ----------------------------------------------------- | --------- |
| Invoice CRUD             | Create, edit, save invoices locally                   | 🔺 High   |
| Client & Item Management | Add client list and invoice line items                | 🔺 High   |
| Tax Handling             | Add per-item or per-invoice tax logic                 | 🔺 Medium |
| PDF Export               | Integrate `html2pdf.js` for printable invoices        | 🔺 Medium |
| Payment Status Tracking  | Mark invoices as _sent_ / _paid_ and store `datePaid` | 🔺 Medium |
| Email Sending            | Enable sending invoices via email                     | 🔹 Low    |
| UI/UX Styling            | Scoped component CSS and accessibility review         | 🔹 Low    |
| Backend Setup            | Implement Express API with SQLite persistence         | 🔺 High   |
| Deployment               | Configure GitHub Pages + Render / Railway             | 🔹 Low    |

---

### ⚖️ Outstanding Decisions

| Topic            | Options                                                | Awaiting        |
| ---------------- | ------------------------------------------------------ | --------------- |
| Email Sending    | Frontend via **EmailJS** vs Backend via **nodemailer** | Decide post-MVP |
| Authentication   | Add user accounts or skip for MVP                      | TBD             |
| Data Persistence | Local SQLite file vs hosted DB (e.g., Supabase)        | TBD             |
| State Storage    | Extend persisted Pinia state to backend sync           | TBD             |

---

### ⚙️ Tech Stack

- **Frontend:** Vue 3 + Pinia + Vanilla CSS
- **Backend:** Express.js + SQLite
- **PDF/Email:** html2pdf.js (frontend) + nodemailer (backend, later)
- **Deployment:** GitHub Pages (frontend) + Render or Railway (backend)

---

## 📘 Change Log

### 🔄 Update: Initial Store Wiring + Enhancements

**What Changed:**

- Created and wired up the `invoiceStore.js` using Pinia.
- Integrated `pinia-plugin-persistedstate` for localStorage persistence.
- Added two mock invoices for testing initial UI interactions.
- Updated `App.vue` to read and modify invoice data via store.
- Added new property `datePaid` to each invoice object (currently `null` for mock data).

**Why It Changed:**

- To confirm the frontend state management pipeline is functioning before moving to multi-component design.
- `datePaid` was added to prepare for future functionality: tracking payment completion dates for each invoice.

**Expected Effect:**

- Invoices now persist between page reloads.
- UI can add, remove, and mark invoices as paid (with logic to be expanded).
- Structure ready for modular components (`InvoiceList.vue`, `InvoiceForm.vue`, etc.).

**Next Step Related to This Change:**

- Update `markAsPaid()` to automatically set `datePaid` to the current date.
- Begin separating UI logic into dedicated components for readability and maintainability.

---

_Last updated: 2025-10-07_
