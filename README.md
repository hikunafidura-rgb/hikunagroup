# HIKUNA GROUP — Official Website

Premium corporate holding company website. Dark, elegant, responsive.

## Cara pakai logo asli
1. Simpan logo yang diberikan sebagai: `assets/logo.png`
   (file bawaannya saat ini memakai fallback otomatis, jadi website tetap bagus tanpa file ini)
2. Refresh `index.html` — logo otomatis muncul di navbar, hero, footer, loader, ecosystem.
3. Favicon memakai `assets/logo.svg` (sudah ada, boleh ganti dengan versi asli).

## Tambah perusahaan baru
Edit `script.js` → array `COMPANIES`, tambah object:
```js
{ name: "NAMA BARU", category: "Kategori", mark: "NB", logo: "assets/logo-baru.png",
  desc: "Deskripsi singkat." }
```
Card, ecosystem, dan stats otomatis mengikuti. Tidak perlu ubah HTML.

## Kontak resmi (sudah terpasang)
- WhatsApp: +62 831-9345-7494 → https://wa.me/6283193457494
- Email: hikunafidura@gmail.com
- Instagram: @yyubhkuna → https://instagram.com/yyubhkuna

## Jalankan
Buka `index.html` di browser, atau serve lokal:
```
npx serve .
```

Struktur: `index.html` · `styles.css` · `script.js` · `assets/`
# hikunagroup
