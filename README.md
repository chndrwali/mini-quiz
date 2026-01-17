# Mini Quiz App Ambisius Academy – Frontend (User Role)

Sebuah **aplikasi web quiz** dibuat dengan **Next.js App Router**

---

## Tech Stack

- **Next.js 16.1.2 (App Router)**
- **TypeScript**
- **React 19.2.3**
- **Zustand** - State Management
- **TailwindCSS**
- **ShadCN/UI** - UI Component
- **Aceternity UI** - UI Animation

---

## Fitur

### Autentikasi

- Login & Register
- Email Verifikasi
- Logout

### Manajemen Profil

- View Profile (read-only)
- Update nama & email
- Ganti password

### Sistem Kuis

- Daftar kuis
- Mulai / melanjutkan sesi kuis
- Auto-save jawaban (localStorage)
- Countdown timer
- Submit kuis
- Result kuis (skor, akurasi, waktu)
- Riwayat kuis (pagination)

### Proteksi Route

- Dashboard, History, Profile, Quiz Page (Token-based access)

---

## Persyaratan Sistem

sebelum menjalankan aplikasi ini secara lokal, pastikan anda sudah memenuhi persyaratan sistem berikut:

- Menginstall [Node.js](https://nodejs.org/en/)
- Browser yang kompatibel seperti Google Chrome, Mozilla Firefox, atau Microsoft Edge
- Koneksi internet yang stabil
- Sistem operasi yang kompatibel seperti Windows, Linux, atau MacOS

## Panduan Instalasi

<ol>
  <li>
    <a href="#clone-repository">Clone repository</a>
  </li>
  <li>
    <a href="#install-dependencies">Install dependencies</a>
  </li>
    <li>
    <a href="#environment-variables">Environment Variables</a>
  </li>
    <li>
    <a href="#menjalankan-aplikasi">Menjalankan Aplikasi</a>
  </li>

</ol>

## Clone repository

Clone repository ini ke direktori lokal anda dengan menjalankan perintah berikut:

```bash
  git clone https://github.com/chndrwali/mini-quiz
```

## Install dependencies

Masuk ke direktori lokal repository yang telah di-clone, lalu jalankan perintah berikut:

```bash
  npm install
```

## Environment Variables

Buat sebuah file `.env` atau `.env.local` di root directory isi dengan :

```env
NEXT_PUBLIC_API_URL=https://apiquiz.ambisiusacademy.com/api/v1
```

## Menjalankan aplikasi

Setelah itu, jalankan perintah berikut untuk menjalankan aplikasi:

```bash
  npm run dev
```

atau

```bash
  npm run build
```

Aplikasi secara default akan berjalan pada port 3000. buka browser dan akses `http://localhost:3000` untuk mengakses aplikasi.

## Struktur Folder

mini-quiz/
├── app/
│ ├── (auth) # Route Group Halaman Login, Register, Email Verifikasi (Public Route)
│ ├── (home) # Route Group Halaman Dashboard, History Profile (Protected Route)  
│ ├── api/ # API routes (proxy ke backend)
│ ├── quiz/ # Halaman quiz (list, start, result, history)
│
├── components/
│ ├── auth/ # Form login, register, dan komponen verifikasi email
│ ├── layout/ # Layout komponen protected route dan navbar  
│ ├── profile/ # Form profile & change password
│ ├── quiz/ # Komponent kuis  
│ ├── ui/ # Komponen UI (shadcn/ui)
│ └── skeleton/ # Loading & error state
│
├── store/
│ ├── auth.store.ts # Auth state
│ ├── profile.store.ts # Profile state
│ ├── quiz-history.store.ts # History quiz state  
│ ├── quiz-result.store.ts # Result quiz state  
│ ├── quiz.store.ts # Quiz session
│ └── subtest.store.ts # List quiz state
│
├── hooks/
│ ├── useSafeProfile.ts # Hook profile aman (non-null)
│ └── useTimer.ts # Hook timer quiz
│
├── types/
│ ├── profile.ts
│ └── quiz.ts
│
└── lib/
└── utils.ts # Helper & konfigurasi

## 🧑‍💻 Author

Built by Candra Wali Sanjaya
