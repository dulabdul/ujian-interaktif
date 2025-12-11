# UAS

Aplikasi latihan ujian interaktif berbasis Next.js. Aplikasi ini menggunakan sistem **Bank Soal**, di mana pengguna memilih mata kuliah, menentukan jumlah soal (20, 35, atau 50), dan sistem akan mengambil soal secara acak dari database lokal (JSON).

## 🚀 Fitur Utama

-   **Randomizer Engine:** Mengambil dan mengacak soal dari berbagai file JSON sekaligus menggunakan algoritma Fisher-Yates.
-   **Flexible Data Source:** Soal bisa disimpan dalam satu file besar atau dipecah per bab/modul. Sistem akan menggabungkannya otomatis.
-   **Exam History:** Riwayat nilai dan jawaban tersimpan di LocalStorage browser.
-   **Review Mode:** Pembahasan soal lengkap dengan indikator jawaban benar/salah di akhir ujian.
-   **Tech Stack:** Next.js 15 (App Router), Tailwind CSS v4, TypeScript.

## 🛠️ Cara Menjalankan

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Jalankan Development Server:**
    ```bash
    npm run dev
    ```
    Buka [http://localhost:3000](http://localhost:3000).

---
