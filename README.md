# HIKUNA GROUP — Official Website

Premium corporate holding company website. Dark, elegant, responsive.

## Logo
Logo asli HIKUNA GROUP sudah terpasang sebagai `assets/logo.png` dan dipakai di
navbar, hero, ecosystem, footer, loader, dan favicon. Jangan generate ulang.

## Tambah perusahaan / pasang website perusahaan
Edit `script.js` → array `COMPANIES` (satu-satunya sumber data), tambah object:
```js
{ name: "NAMA BARU", category: "Kategori", logo: "",
  image: "", website: "https://contoh.com",
  desc: "Deskripsi singkat." }
```
- `website` kosong (`""`) → CTA "Visit Website ↗" tampil nonaktif, tanpa URL palsu.
- `website` terisi → CTA + link ventures otomatis membuka tab baru.
Showcase, ecosystem, dan stats mengikuti otomatis. Tidak perlu ubah HTML.

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
