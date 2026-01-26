#!/bin/sh

DATE=$(date +"%Y-%m-%d_%H-%M")
BACKUP_FILE="/backups/backup_$DATE.sql"

echo "📦 Iniciando backup..."

pg_dump \
  -h "$POSTGRES_HOST" \
  -U "$POSTGRES_USER" \
  -d "$POSTGRES_DB" \
  > "$BACKUP_FILE"

echo "✅ Backup concluído em $BACKUP_FILE"
