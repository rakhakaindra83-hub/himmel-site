# Himmel — Source Code dan Aset

Website portofolio bergaya Persona. Paket ini berisi source HTML/CSS/JavaScript, gambar latar, kursor, efek suara, dan backsound Color Your Night dari file yang kamu berikan.

## Isi paket

- `index.html`: halaman utama dan struktur menu.
- `css/style.css`: tampilan, animasi, layout responsif.
- `js/model.js`: data proyek dan skill.
- `js/view.js`: render tampilan, animasi, kursor, efek suara.
- `js/controller.js`: navigasi, formulir, dan kontrol musik.
- `assets/menus/`: gambar latar Home, Skills, About, Contact.
- `assets/cursors/`: sprite kursor.
- `assets/sfx/select.mp3`: efek suara menu.
- `assets/music/color-your-night.mp3`: backsound saat ini.

## Menjalankan di komputer

1. Ekstrak ZIP.
2. Buka terminal di folder `Himmel`.
3. Jalankan `python -m http.server 8000` (atau `python3 -m http.server 8000`).
4. Buka `http://localhost:8000`.

Website statis, tanpa npm atau proses build. Untuk hosting statis seperti Netlify, unggah isi folder `Himmel` sehingga `index.html` berada di root.

## Pengaturan saat ini

- Nama: Himmel.
- Chat GPT diganti Development; Gemini diganti Desain.
- Tulisan AI dan bagian Cloud & Engineering dihapus.
- Spoken Languages: Indonesia 100, English 62, Japan N5 50.
- Backsound: Color Your Night, berulang, volume awal 35%.
- Tombol kanan bawah untuk mute atau melanjutkan musik. Pilihan mute disimpan di browser.
- Jika autoplay diblokir browser, klik halaman atau tombol musik untuk mulai.

## Mengedit

Ubah nama dan bio di `index.html`. Ubah skill, angka bar, dan data proyek di `js/model.js`. Ganti gaya di `css/style.css`. Jika mengganti nama file musik, sesuaikan atribut `src` pada audio `bg-music` di `index.html`.

Menu dapat dipilih dengan klik, tombol panah atas/bawah, Enter, dan Esc untuk kembali.

## Konten contoh dan keterbatasan

Proyek GitHub dan skill yang belum kamu sesuaikan masih berasal dari template dan diberi label. Atur `githubUser` serta daftar proyek di `js/model.js` ke akun/karya yang diinginkan. Form kontak menyimpan draf `.txt` lokal, belum mengirim email. Video latar tidak disertakan dalam repo asal; versi ini memakai gambar bawaan. Font web memakai Google Fonts dan akan memakai font cadangan jika koneksi tidak tersedia. Feed proyek memerlukan koneksi GitHub, dengan data fallback jika gagal.

## Sumber dan kredit

Source dasar: https://github.com/Numal400/Persona_style_portfolio
Commit referensi: `65fa9fddff69b674e8a38c02c70421f4fe90c4c7`.
Desain, source awal, artwork, kursor, dan efek suara berasal dari proyek tersebut serta pembuat masing-masing. Lagu berasal dari unggahan pengguna. Paket ini tidak memberikan lisensi baru atas aset pihak ketiga; kredit dan ketentuan pemilik asli tetap berlaku.
