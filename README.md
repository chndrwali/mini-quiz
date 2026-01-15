## Mini Quiz Ambis – Frontend (User Role)

### Tech Stack

- Next.js (App Router)
- TypeScript
- ShadCN

### Setup

```bash
npm install
npm run dev
```

---

# 7️⃣ Simulasi Pertanyaan Interview + Jawaban

### ❓ Kenapa pilih Next.js?

> Karena built-in routing, middleware, SSR support, dan production-ready tanpa banyak setup tambahan.

### ❓ Gimana handle refresh pas quiz?

> Saya fetch `/quiz/active` saat mount, lalu restore state dari API.

### ❓ Kenapa token disimpan di cookie?

> Lebih aman dari XSS dan bisa dipakai di server & middleware.

### ❓ Kalau waktu quiz habis?

> UI dikunci, submit disabled, user dikasih feedback session expired.

### ❓ Kalau API error?

> Error state ditampilkan berdasarkan HTTP status & message backend.

---

# 8️⃣ STRATEGI BIAR KELIHATAN SENIOR

🔥 Tambahin salah satu:

- Skeleton loader
- Toast notification
- Confirmation modal submit
- Empty state yang proper

---

## NEXT STEP (PILIH SATU):

1️⃣ Gue bikinin **starter repo Next.js siap clone**  
2️⃣ Gue bikinin **alur demo 5 menit anti gagal**  
3️⃣ Gue simulasi **interview live (Q&A keras)**

Tinggal bilang bro 💪
