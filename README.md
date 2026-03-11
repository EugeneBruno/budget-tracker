# 💰 Budget Tracker — Dev Series

This README is updated step-by-step as we build.
Only follow the instructions for the current class.

---

## ✅ Step 1 — Project Setup

### 1️⃣ Open your terminal

### 2️⃣ Create a main folder for the series

```bash
mkdir dev-series
```

### 3️⃣ Enter the folder

```bash
cd dev-series
```

### 4️⃣ Create the app

```bash
npx create-next-app@latest budget-tracker
```

### 5️⃣ When prompted, choose:

```
TypeScript?            No
ESLint?                Yes
Tailwind CSS?          Yes
src/ directory?        Yes
App Router?            Yes
Turbopack?             Yes
Customize alias?       No
```

### 6️⃣ Move into the project folder

```bash
cd budget-tracker
```

### 7️⃣ Start the development server

```bash
npm run dev
```

### 8️⃣ Open in browser

```
http://localhost:3000
```

If it works, you’ll see your app running locally 🎉

---

## ✅ Step 2 — Connect to Backend (Supabase)

### 1️⃣ Install Supabase client

Open your project in VS Code, then open the terminal and run:

```bash
npm install @supabase/supabase-js
```

---

### 2️⃣ Create Supabase project

1. Go to [https://supabase.com](https://supabase.com)
2. Click **New project**
3. Project name: `budget-tracker`
4. Set a database password (save it somewhere safe)
5. Choose a region
6. Click **Create project**

Wait for setup to complete.

---

### 3️⃣ Get project API keys

Inside your Supabase dashboard:

1. Go to **Settings → API**
2. Copy the following:

   * Project URL
   * anon public key

---

### 4️⃣ Create environment variables file

In the root of your project, create a file named:

```
.env.local
```

Add:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

⚠️ Do not share this file publicly.

---

### 5️⃣ Create Supabase client file

Create a new file:

```
src/lib/supabase.js
```

Add the following code:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

---

### 6️⃣ Restart development server

```bash
npm run dev
```

---

If everything is set correctly, your app is now connected to the backend 🎉

---

---

## ✅ Step 3 — Create Database Tables (Supabase)

### 1️⃣ Open Supabase Dashboard

* Go to your project
* Click **Table Editor** (left sidebar)

---

### 2️⃣ Create Tables Visually

#### 🧍 Table 1 — users

Click **Create a new table**

Table name:

```
users
```

Add columns:

| Name       | Type               |
| ---------- | ------------------ |
| id         | uuid (Primary Key) |
| email      | text               |
| full_name  | text               |
| currency   | text               |
| created_at | timestamp          |

Click **Save**

---

#### 💳 Table 2 — transactions

Click **Create a new table**

Table name:

```
transactions
```

Add columns:

| Name        | Type               |
| ----------- | ------------------ |
| id          | uuid (Primary Key) |
| user_id     | uuid               |
| type        | text               |
| amount      | integer            |
| category_id | uuid               |
| description | text               |
| date        | date               |
| created_at  | timestamp          |

Click **Save**

---

#### 🗂 Table 3 — categories

Click **Create a new table**

Table name:

```
categories
```

Add columns:

| Name       | Type               |
| ---------- | ------------------ |
| id         | uuid (Primary Key) |
| name       | text               |
| type       | text               |
| user_id    | uuid (nullable)    |
| created_at | timestamp          |

Click **Save**

---

### 3️⃣ (Optional) SQL Version — Copy & Run

Go to **SQL Editor → New query** and run:

```sql
create table users (
  id uuid primary key,
  email text,
  full_name text,
  currency text,
  created_at timestamp default now()
);

create table categories (
  id uuid primary key,
  name text,
  type text,
  user_id uuid,
  created_at timestamp default now()
);

create table transactions (
  id uuid primary key,
  user_id uuid,
  type text,
  amount integer,
  category_id uuid,
  description text,
  date date,
  created_at timestamp default now()
);
```

---

If successful, your database foundation is ready 🎉

---

*(Next steps will be added after class.)*
