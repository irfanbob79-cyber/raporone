#!/usr/bin/env bash
# ==============================================================================
# Script Otomatis Deploy eRaporOne di Server: hsgserver.my.id
# Target Domain: raporone.hsgserver.my.id
# ==============================================================================

set -e

DOMAIN="raporone.hsgserver.my.id"
APP_DIR="/var/www/raporone"
REPO_URL="https://github.com/irfanbob79-cyber/raporone.git"

echo "=========================================================="
echo "🚀 Memulai Deployment eRaporOne untuk domain: $DOMAIN"
echo "=========================================================="

# 1. Update & Pastikan dependensi dasar terpasang
if [ -x "$(command -v apt-get)" ]; then
    echo "📦 Memeriksa dependensi sistem (Ubuntu/Debian)..."
    sudo apt-get update -y
    sudo apt-get install -y git curl nginx
elif [ -x "$(command -v yum)" ]; then
    echo "📦 Memeriksa dependensi sistem (CentOS/RHEL)..."
    sudo yum install -y git curl nginx
fi

# 2. Periksa Node.js & npm jika belum ada
if ! [ -x "$(command -v node)" ]; then
    echo "⚡ Menginstall Node.js v20 LTS..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

echo "✅ Node.js $(node -v) & npm $(npm -v) terdeteksi."

# 3. Siapkan direktori aplikasi
echo "📂 Menyiapkan folder aplikasi di $APP_DIR..."
if [ -d "$APP_DIR/.git" ]; then
    echo "🔄 Memperbarui repository dari GitHub..."
    cd "$APP_DIR"
    git fetch origin main
    git reset --hard origin/main
else
    echo "📥 Melakukan clone repository..."
    sudo mkdir -p "$APP_DIR"
    sudo chown -R $USER:$USER "$APP_DIR"
    git clone "$REPO_URL" "$APP_DIR"
    cd "$APP_DIR"
fi

# 4. Install dependencies & Build production
echo "🔨 Membangun aset produksi (npm run build)..."
npm install
npm run build

# 5. Konfigurasi Nginx Web Server untuk raporone.hsgserver.my.id
echo "🌐 Mengonfigurasi Nginx untuk domain $DOMAIN..."
NGINX_CONF="/etc/nginx/sites-available/$DOMAIN.conf"
if [ -d "/etc/nginx/conf.d" ] && ! [ -d "/etc/nginx/sites-available" ]; then
    NGINX_CONF="/etc/nginx/conf.d/$DOMAIN.conf"
fi

sudo tee "$NGINX_CONF" > /dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN;

    root $APP_DIR/dist;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)\$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root $APP_DIR/dist;
    }
}
EOF

# Aktifkan konfigurasi Nginx jika menggunakan sites-enabled
if [ -d "/etc/nginx/sites-enabled" ]; then
    sudo ln -sf "$NGINX_CONF" "/etc/nginx/sites-enabled/"
fi

# Test & Reload Nginx
sudo nginx -t
sudo systemctl reload nginx

echo "=========================================================="
echo "🎉 DEPLOYMENT BERHASIL!"
echo "Aplikasi eRaporOne sudah aktif di http://$DOMAIN"
echo ""
echo "Untuk mengaktifkan SSL HTTPS gratis (Let's Encrypt), jalankan:"
echo "sudo certbot --nginx -d $DOMAIN"
echo "=========================================================="
