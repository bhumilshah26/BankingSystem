-- ============================================================
--  BSNB Banking System - PostgreSQL schema (Neon)
--  Run this once against your Neon database before starting the app:
--    psql "<your DATABASE_URL>" -f schema.sql
--  (or paste it into the Neon SQL editor)
-- ============================================================

-- ---------- USERS ----------
CREATE TABLE IF NOT EXISTS users (
    id                  SERIAL PRIMARY KEY,
    name                VARCHAR(100)  NOT NULL,
    email               VARCHAR(255)  NOT NULL UNIQUE,
    user_id             VARCHAR(50)   NOT NULL UNIQUE,
    password            VARCHAR(255)  NOT NULL,
    reset_token         VARCHAR(255),
    reset_token_expiry  TIMESTAMP,
    created_at          TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- ---------- ACCOUNTS ----------
-- user_id references users.user_id; deleting a user cascades to their accounts.
CREATE TABLE IF NOT EXISTS accounts (
    id              SERIAL PRIMARY KEY,
    user_id         VARCHAR(50)    NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    account_number  VARCHAR(30)    NOT NULL UNIQUE,
    account_type    VARCHAR(20)    NOT NULL,
    balance         NUMERIC(15,2)  NOT NULL DEFAULT 0,
    created_at      TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

-- ---------- TRANSACTIONS ----------
-- account_number references accounts.account_number; deleting an account
-- cascades to its transactions.
CREATE TABLE IF NOT EXISTS transactions (
    id                SERIAL PRIMARY KEY,
    account_number    VARCHAR(30)    NOT NULL REFERENCES accounts(account_number) ON DELETE CASCADE,
    amount            NUMERIC(15,2)  NOT NULL,
    transaction_type  VARCHAR(20)    NOT NULL,   -- 'deposit' | 'withdrawal'
    description       TEXT,
    status            VARCHAR(20)    DEFAULT 'success',
    transaction_time  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

-- ---------- TRANSFERS ----------
CREATE TABLE IF NOT EXISTS transfers (
    id                       SERIAL PRIMARY KEY,
    sender_account_number    VARCHAR(30)    NOT NULL,
    receiver_account_number  VARCHAR(30)    NOT NULL,
    amount                   NUMERIC(15,2)  NOT NULL,
    description              TEXT,
    status                   VARCHAR(20)    DEFAULT 'success',   -- 'success' | 'fail'
    transfer_time            TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
--  TRIGGER: auto-update account balance after a transaction
--  (replaces the original MySQL "AFTER INSERT ON transactions" trigger)
--  The transaction controller inserts the row and lets this trigger
--  adjust accounts.balance.
-- ============================================================
CREATE OR REPLACE FUNCTION update_balance_after_transaction()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.transaction_type = 'deposit' THEN
        UPDATE accounts
           SET balance = balance + NEW.amount
         WHERE account_number = NEW.account_number;
    ELSIF NEW.transaction_type = 'withdrawal' THEN
        UPDATE accounts
           SET balance = balance - NEW.amount
         WHERE account_number = NEW.account_number;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_balance ON transactions;

CREATE TRIGGER trg_update_balance
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE FUNCTION update_balance_after_transaction();
