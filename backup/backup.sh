#!/bin/sh
set -e

DATE=$(date +"%Y-%m-%d_%H-%M")
BACKUP_DIR="/backups"
BACKUP_FILE="$BACKUP_DIR/backup_$DATE.sql"

echo "📦 Iniciando backup..."

pg_dump \
  -h "$POSTGRES_HOST" \
  -U "$POSTGRES_USER" \
  -d "$POSTGRES_DB" \
  > "$BACKUP_FILE"

echo "🧹 Aplicando retenção (últimas 4 semanas)..."
find "$BACKUP_DIR" -type f -name "backup_*.sql" -mtime +28 -delete

echo "✅ Backup concluído em $BACKUP_FILE"
