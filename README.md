# 🏦 BSNB Banking System

A full-stack banking system built with Node.js, MySQL, and React. This system supports user registration, authentication, bank account management, money transfers, transaction logging via SQL triggers, and robust error handling for safe financial operations.

---

## 🚀 Features

- 🔐 User registration & secure login (JWT-based auth)
- 🧾 Account creation and balance management
- 💸 Fund transfers between bank accounts
- 🧠 Trigger-based automatic transaction logging for deposits and withdrawals
- ✅ ACID-compliant money transactions (START TRANSACTION / COMMIT / ROLLBACK)
- 📊 Dashboard with account and transaction overviews (React frontend)
- 📦 Modular code structure with controllers, services, and database config separation

---

## 🧱 Database Structure

### Tables

- **users**: User details and credentials
- **accounts**: Bank accounts linked to users
- **transfers**: Transfer logs (sender → receiver)
- **transactions**: Logs for deposits and withdrawals

### Triggers

```sql
AFTER INSERT ON transactions
  IF type = 'deposit' → increment balance
  IF type = 'withdrawal' → decrement balance
