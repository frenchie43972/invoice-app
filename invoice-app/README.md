# 🧾 Invoice App (MiniBill)

A lightweight full-stack web application that allows freelancers and small businesses to create, send, and track invoices.  
Built with **Vue 3**, **Pinia**, **Express**, and **SQLite**, it focuses on clarity, simplicity, and real-world usability.

---

## 🧭 Project Tracker

### 📁 Overview

**Goal:** Build a full-stack invoicing tool that lets users:

- Create and save invoices
- Add clients, items, and taxes
- Export invoices as PDFs
- Track payment status (sent/paid)
- Email invoices to clients

**Tech Stack**

- **Frontend:** Vue 3 + Pinia + Vanilla CSS
- **Backend:** Express.js + SQLite
- **PDF/Email:** html2pdf.js (frontend) + nodemailer (backend, later)
- **Deployment:** GitHub Pages (frontend) + Render or Railway (backend)

---

## ✅ Project Progress Log

| Status | Task                        | Description                                    | Notes                        |
| :----: | :-------------------------- | :--------------------------------------------- | :--------------------------- |
|   ✅   | **Initialize GitHub repo**  | Created remote repo and cloned locally         | Name: `invoice-app`          |
|   ✅   | **Set up folder structure** | Added `/server` and Vite-generated frontend    | Monorepo structure confirmed |
|   🔜   | **Install Pinia**           | State management setup                         | Next step                    |
|   ⏳   | **Set up Express backend**  | Create `/server/index.js` with basic API route | Planned soon                 |
|   ⏳   | **Integrate SQLite**        | Create DB and `invoices` table                 | Post Express setup           |
|   ⏳   | **Frontend Invoice form**   | Add form to create invoices                    | After backend ready          |
|   ⏳   | **Connect FE/BE via Axios** | Send and fetch data                            |                              |
|   ⏳   | **PDF export**              | Use html2pdf.js to export invoice              |                              |
|   ⏳   | **Email invoices**          | Basic email sending (nodemailer or EmailJS)    | Stretch goal                 |
|   ⏳   | **Deployment**              | Host FE on GitHub Pages, BE on Render          | Final step                   |

---

## ⚙️ Decisions Made

| Area           | Decision              | Notes                              |
| -------------- | --------------------- | ---------------------------------- |
| Repo Structure | Monorepo              | Frontend + backend in one project  |
| Frontend       | Vue 3 + Vite + Pinia  | Pinia chosen for simplicity        |
| Backend        | Express + SQLite      | Lightweight, ideal for learning    |
| Styling        | Scoped Vanilla CSS    | Each component styled individually |
| DB             | SQLite (file-based)   | Simplicity > scalability for now   |
| Deployment     | GitHub Pages + Render | Good free-tier combo               |

---

## ❓ Pending Decisions

| Topic            | Options                                             | Awaiting            |
| ---------------- | --------------------------------------------------- | ------------------- |
| Email Sending    | Frontend via EmailJS **vs** Backend via nodemailer  | To decide after MVP |
| Authentication   | Add later or skip                                   | TBD                 |
| Data Persistence | Local SQLite file **vs** hosted DB (e.g., Supabase) | TBD                 |

---

## 🧩 Next Steps (Immediate)

### Step 1️⃣ — Install and Set Up Pinia

Run inside `/client`:

```bash
npm install pinia
```
