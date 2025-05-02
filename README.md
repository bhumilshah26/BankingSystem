# 🏦 BSNB Banking System

A full-stack banking system built with Node.js, MySQL, and React. This system supports user registration, authentication, bank account management, money transfers, transaction logging via SQL triggers, and robust error handling for safe financial operations.

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

```sql
AFTER INSERT ON transactions
  IF type = 'deposit' → increment balance
  IF type = 'withdrawal' → decrement balance
```

---

## 🔧 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL with triggers & parameterized queries
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

- Configure `.env` for DB and JWT:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=banking_db
JWT_SECRET=your_jwt_secret
```

- Start backend server:
```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
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
await connection.beginTransaction();
await connection.execute(...); // debit sender
await connection.execute(...); // credit receiver
await connection.execute(...); // log transfer
await connection.commit();
```

Rollback occurs on any failure.

---

## 👨‍💻 Author

**Bhumil Shah**  
• [GitHub](https://github.com/bhumilshah26) • [LinkedIn](https://linkedin.com/in/bhumilshah26)

---