# 🏦 BSNB Banking System

A full-stack banking system built with Node.js, PostgreSQL (hosted on [Neon](https://neon.tech)), and React. This system supports user registration, authentication, bank account management, money transfers, transaction logging via SQL triggers, and robust error handling for safe financial operations.

---

## 🚀 Features

- 🔐 User registration & secure login (JWT-based auth)
- 🧾 Account creation and balance management
- 💸 Fund transfers between bank accounts
- 🧠 Trigger-based automatic transaction logging
- ✅ ACID-compliant money transactions (START TRANSACTION / COMMIT / ROLLBACK)
- 📊 Dashboard with account and transaction overviews (React frontend) <br>(In Process)
- 📦 Modular code structure with controllers, services, and database config separation

---

## 🧱 Database Structure

### Tables

- **users**: User details and credentials
- **accounts**: Bank accounts linked to users
- **transactions**: Logs for deposits and withdrawals
- **transfers**: Transfer logs (sender → receiver)

### Triggers

A PL/pgSQL trigger (`trg_update_balance`) keeps account balances in sync:

```sql
AFTER INSERT ON transactions
  IF transaction_type = 'deposit'    → increment accounts.balance
  IF transaction_type = 'withdrawal' → decrement accounts.balance
```

The full schema (tables, constraints, foreign keys and the trigger) lives in
[`backend/schema.sql`](backend/schema.sql) — run it once against your Neon database.

---

## 🔧 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL on Neon (via the `pg` driver) with triggers & parameterized queries
- **Frontend**: React.js with TailwindCSS
- **Auth**: JWT + bcrypt password hashing

---

## 📦 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/bhumilshah26/BankingSystem.git
cd BankingSystem
```

### 2. Backend Setup

```bash
cd backend
npm install
```

- Create the database schema on Neon (run once):
```bash
psql "<your DATABASE_URL>" -f schema.sql
# or paste backend/schema.sql into the Neon SQL editor
```

- Configure `backend/.env` (loaded centrally by [`src/config/config.js`](backend/src/config/config.js)):
```env
# PostgreSQL (Neon) — use the pooled connection string from your Neon dashboard
DATABASE_URL=postgresql://<user>:<password>@<endpoint>.neon.tech/<dbname>?sslmode=require

PORT=5000
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://your-frontend-url

# Mailer (Gmail app password)
MAIL_USER=you@gmail.com
MAIL_FROM=you@gmail.com
APP_PASS=your_gmail_app_password
```

- Start backend server:
```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

- Configure `frontend/.env` with the backend URL (Create React App requires the `REACT_APP_` prefix):
```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

- Start the frontend:
```bash
npm start
```

---

## ✅ API Endpoints

| Method | Endpoint                    | Description                          |
| ------ | --------------------------- | ------------------------------------ |
| POST   | `/users/create`             | Register a new user                  |
| GET    | `/users/read/:email`        | Login & get JWT token                |
| PUT    | `/users/update`             | Update user information              |
| DELETE | `/users/delete/:user_id`    | Delete a user                        |
| GET    | `/users/count`              | Get count of all users               |
| POST   | `/accounts/create`          | Create a new bank account            |
| GET    | `/accounts/read`            | Read account details                 |
| DELETE | `/accounts/delete`          | Delete an account                    |
| POST   | `/transactions/add`         | Log a new transaction                |
| POST   | `/transfers/transfer-money` | Transfer money between bank accounts |

---

## 🧠 Transaction Safety

Money transfers use:

```js
const client = await pool.connect();
await client.query('BEGIN');
await client.query(...); // debit sender
await client.query(...); // credit receiver
await client.query(...); // log transfer
await client.query('COMMIT');
```

Rollback occurs on any failure.

---

## 👨‍💻 Author

**Bhumil Shah**  
• [GitHub](https://github.com/bhumilshah26) • [LinkedIn](https://linkedin.com/in/bhumilshah26)

---

Banking System 