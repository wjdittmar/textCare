
run this to enable cron

sudo yum install -y cronie
sudo systemctl enable --now crond

run scripts/install_auto_renew_https.sh to create a cron job to automatically renew the https certificate
