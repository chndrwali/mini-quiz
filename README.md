# Mini Quiz App – Ambisius Academy (Frontend / User)

Sebuah **aplikasi web quiz** yang dibangun menggunakan **Next.js App Router**.  
Repository ini berisi **frontend (role user)** untuk platform Ambisius Academy.

---

## 🚀 Tech Stack

- **Next.js 16.1.2** (App Router)
- **TypeScript**
- **React 19.2.3**
- **Zustand** – State Management
- **Tailwind CSS**
- **ShadCN/UI** – UI Components
- **Aceternity UI** – Animasi & Efek UI

---

## ✨ Fitur

### 🔐 Autentikasi

- Login & Register
- Verifikasi Email
- Logout

### 👤 Manajemen Profil

- Lihat profil (read-only)
- Update nama & email
- Ganti password

### 📝 Sistem Kuis

- Daftar kuis
- Mulai / melanjutkan sesi kuis
- Auto-save jawaban (localStorage)
- Countdown timer
- Submit kuis
- Hasil kuis (skor, akurasi, durasi)
- Riwayat kuis (pagination)

### 🛡 Proteksi Route

- Dashboard, History, Profile, Quiz Page (akses berbasis token)

---

## 🖥 Persyaratan Sistem

Sebelum menjalankan project ini secara lokal, pastikan:

- [Node.js](https://nodejs.org/en/) sudah terinstall
- Browser modern (Chrome, Firefox, Edge)
- Koneksi internet stabil
- OS: Windows / Linux / macOS

---

## ⚙️ Panduan Instalasi

### 1️⃣ Clone Repository

```bash
git clone https://github.com/chndrwali/mini-quiz
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Buat file `.env` atau `.env.local` di root directory:

```env
NEXT_PUBLIC_API_URL=https://apiquiz.ambisiusacademy.com/api/v1
```

### 4️⃣ Menjalankan Aplikasi

Mode development:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

Aplikasi akan berjalan di **http://localhost:3000** secara default.

---

## 📁 Struktur Folder

```text
mini-quiz/
├── app/                      # Next.js App Router
│   ├── (auth)/               # Public route (Login, Register, Verifikasi Email)
│   ├── (home)/               # Protected route (Dashboard, History, Profile)
│   ├── api/                  # API route (proxy ke backend)
│   ├── quiz/                 # Halaman kuis (list, start, result, history)
│   ├── favicon.ico
│   ├── globals.css           # Style CSS global
│   ├── layout.tsx            # Layout global
│   └── page.tsx              # Halaman root untuk redirect ke /dashboard
│
├── components/               # Reusable UI components
│   ├── auth/                 # Form & komponen autentikasi
│   ├── layout/               # Layout, navbar, protected layout
│   ├── profile/              # Form profil & ganti password
│   ├── quiz/                 # Komponen kuis
│   ├── skeleton/             # Loading & error state
│   └── ui/                   # Komponen ShadCN/UI
│
├── store/                    # Zustand state management
│   ├── auth.store.ts         # State autentikasi
│   ├── profile.store.ts      # State profil user
│   ├── quiz.store.ts         # State sesi kuis
│   ├── quiz-result.store.ts  # State hasil kuis
│   ├── quiz-history.store.ts # State riwayat kuis
│   └── subtest.store.ts      # State daftar kuis
│
├── hooks/                    # Custom hooks
│   ├── useSafeProfile.ts     # Hook profile aman (non-null)
│   └── useTimer.ts           # Countdown timer kuis
│
├── types/                    # TypeScript types
│   ├── profile.ts
│   └── quiz.ts
│
├── lib/                      # Helper & utility
│   └── utils.ts
│
├── public/                   # Static assets
├── next.config.js
├── package.json
└── README.md
```

---

## 🧠 Keputusan Teknis

### 🔑 Autentikasi

- Menggunakan JWT (token-based authentication)
- Token disimpan di `localStorage`
- Logout melakukan call API dan menghapus token

### 🌐 API & Routing

- Semua request backend melalui **Next.js API Routes**
- Tujuan:
  - Menghindari masalah CORS
  - Menyatukan logic authorization
  - Memisahkan frontend & backend secara rapi

### 🧩 State Management

- Menggunakan **Zustand**
- Alasan:
  - Sederhana & ringan
  - Minim boilerplate
  - Cocok untuk skala kecil–menengah
- Business logic & side-effect (fetch API) dilakukan di store
- Komponen UI fokus pada tampilan

### 🪝 Custom Hook

- `useSafeProfile`  
  Memastikan komponen UI tidak perlu cek `null` pada data profil
- `useTimer`  
  Mengatur countdown berdasarkan `expires_at` dari backend

---

## 👨‍💻 Author

Dibuat oleh **Candra Wali Sanjaya**
