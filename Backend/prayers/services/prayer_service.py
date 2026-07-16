"""
Business logic for Prayer Requests.
"""

from django.db import transaction
from django.db.models import F
from django.utils import timezone
from django.utils.text import slugify

from prayers.models import PrayerRequest


class PrayerService:
    """Encapsulates all core business workflows related to Prayer Requests."""

    @staticmethod
    def _generate_unique_slug(title: str) -> str:
        """Helper method to determine a slug variation that avoids database collision."""
        base_slug = slugify(title)
        slug = base_slug
        counter = 1

        while PrayerRequest.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1

        return slug

    @staticmethod
    @transaction.atomic
    def create_prayer(validated_data: dict) -> PrayerRequest:
        """Create a new prayer request with an authenticated, collision-safe slug."""
        validated_data["slug"] = PrayerService._generate_unique_slug(
            validated_data["title"]
        )
        return PrayerRequest.objects.create(**validated_data)

    @staticmethod
    @transaction.atomic
    def update_prayer(prayer: PrayerRequest, validated_data: dict) -> PrayerRequest:
        """Apply patch parameters and save mutations across an existing prayer request."""
        for field, value in validated_data.items():
            setattr(prayer, field, value)

        prayer.save()
        return prayer

    @staticmethod
    @transaction.atomic
    def assign_ministry(prayer: PrayerRequest, ministry) -> PrayerRequest:
        """Delegate intercession operations to a targeted parish group or ministry."""
        prayer.assigned_ministry = ministry
        prayer.save(update_fields=["assigned_ministry"])
        return prayer

    @staticmethod
    @transaction.atomic
    def assign_priest(prayer: PrayerRequest, priest) -> PrayerRequest:
        """Assign an individual priest to take specific spiritual oversight of a request."""
        prayer.assigned_priest = priest
        prayer.save(update_fields=["assigned_priest"])
        return prayer

    @staticmethod
    def increment_prayer_count(prayer: PrayerRequest) -> PrayerRequest:
        """Atomically increment communal prayer tracking using F expressions."""
        prayer.prayed_count = F("prayed_count") + 1
        prayer.save(update_fields=["prayed_count"])
        return prayer

    @staticmethod
    @transaction.atomic
    def mark_answered(prayer: PrayerRequest, testimony: str) -> PrayerRequest:
        """Transition a request into a tracked answered state with the parish testimony."""
        prayer.answered = True
        prayer.status = "ANSWERED"
        prayer.answered_testimony = testimony
        prayer.answered_date = timezone.now()

        prayer.save(
            update_fields=[
                "answered",
                "status",
                "answered_testimony",
                "answered_date",
            ]
        )
        return prayer

    @staticmethod
    @transaction.atomic
    def close_prayer(prayer: PrayerRequest) -> PrayerRequest:
        """Retire a prayer request from the active list without deleting historical data."""
        prayer.status = "CLOSED"
        prayer.save(update_fields=["status"])
        return prayer