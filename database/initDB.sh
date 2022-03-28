echo "CREATE DATABASE IF NOT EXISTS auth" | mysql -u root -p ${MYSQL_ROOT_PASSWORD}
mysql -u root -p ${MYSQL_ROOT_PASSWORD} auth < ./initDB.sql
