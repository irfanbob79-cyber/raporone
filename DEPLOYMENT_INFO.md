# Catatan Deployment Server (hsgserver.my.id)

Aplikasi **eRaporOne** telah berhasil aktif dan terhubung dengan arsitektur berikut:

- **Domain Publik:** `https://raporone.hsgserver.my.id`
- **Jalur Akses:** Cloudflare Tunnel $\rightarrow$ `127.0.0.1:8830`
- **Host / User Server:** `/home/admin123/raporone`
- **Service Systemd User:** `eraporone.service`
- **Perintah Eksekusi Service:**
  ```bash
  npm run preview -- --host 127.0.0.1 --port 8830
  ```

---

## 🔄 Alur Update Kode di Masa Depan

Setiap kali ada pembaruan kode di GitHub:
```bash
cd /home/admin123/raporone
git pull origin main
npm install
npm run build
systemctl --user restart eraporone.service
```

### Verifikasi:
```bash
# Cek service lokal
curl -I http://127.0.0.1:8830

# Cek publik Cloudflare
curl -I https://raporone.hsgserver.my.id
```

---

## ⚠️ Catatan Penting
- Jangan mengubah port `8830` tanpa memperbarui konfigurasi di Cloudflare Tunnel dashboard.
- Jangan menjalankan Nginx terpisah atau certbot karena SSL dan routing sudah dikelola penuh oleh Cloudflare Tunnel.
