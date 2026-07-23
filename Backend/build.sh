#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────
# Render build script for the Django backend.
# Render sets DATABASE_URL automatically from the connected DB.
# ─────────────────────────────────────────────────────────────────
set -o errexit  # Exit on first error

# 1. Install Python dependencies
pip install -r requirements.txt

# 2. Collect static files (WhiteNoise serves them)
python manage.py collectstatic --no-input

# 3. Run all pending database migrations
python manage.py migrate --no-input

# 4. Create the superuser (idempotent — does nothing if user already exists)
python manage.py createsuperuser --no-input \
    --username "${DJANGO_SUPERUSER_USERNAME:-Japheth}" \
    --email    "${DJANGO_SUPERUSER_EMAIL:-main@gmail.com}" \
    --first_name "${DJANGO_SUPERUSER_FIRST_NAME:-Japheth}" \
    --last_name  "${DJANGO_SUPERUSER_LAST_NAME:-Arnold}" \
    2>/dev/null || echo "Superuser already exists, skipping."

# 5. Load fixture data if the databackup.json is present and the DB is empty.
#    We check by counting church/parish records — if zero, load the backup.
CHURCH_COUNT=$(python manage.py shell -c "from church.models import ParishInformation; print(ParishInformation.objects.count())" 2>/dev/null || echo "0")
if [ "$CHURCH_COUNT" = "0" ]; then
    echo "Database appears empty — loading databackup.json..."
    python manage.py loaddata databackup.json --ignorenonexistent || echo "⚠ loaddata had some errors (may be harmless)."
else
    echo "Database already has data (ParishInformation count=$CHURCH_COUNT) — skipping fixture load."
fi
