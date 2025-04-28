if [ ! -f /etc/cron.d/certbot-renew ]; then
  cat <<'EOF' | sudo tee /etc/cron.d/certbot-renew
# Renew Let's Encrypt certs daily at 3am
0 3 * * * root /usr/bin/certbot renew --quiet
EOF
fi
