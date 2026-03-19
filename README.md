# 💰 Budget Tracker — Dev Series

This README is updated step-by-step as we build.
Only follow the instructions for the current class.

---

## ✅ Step 1 — Create Database Tables (Supabase)

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

## ✅ Step 2 — Connect App to Supabase

### Install Supabase client

```bash
npm install @supabase/supabase-js
```

---

### Create environment variables file

Create in project root:

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

### Create Supabase client file

Create:

```
src/lib/supabase.js
```

Add:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

---

### Restart development server

```bash
npm run dev
```

---

## ✅ Step 3 — Authentication (Signup)

Create page:

```
src/app/signup/page.js
```

Add:

```javascript
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Signup() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSignup(e) {
    e.preventDefault()

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      alert(error.message)
      return
    }

    const user = data.user

    if (user) {
      await supabase.from('users').insert([
        {
          id: user.id,
          email,
          full_name: fullName
        }
      ])
    }

    alert('Account created successfully!')
  }

  return (
    <form onSubmit={handleSignup}>
      <input
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button>Sign Up</button>
    </form>
  )
}
```

---

## ✅ Step 4 — Authentication (Login)

Create page:

```
src/app/login/page.js
```

Add:

```javascript
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(e) {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Login successful!')
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button>Login</button>
    </form>
  )
}
```

---

*(Next steps will be added after class.)*
