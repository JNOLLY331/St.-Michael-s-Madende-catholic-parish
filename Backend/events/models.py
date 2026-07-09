from django.conf import settings
from django.db import models
from django.utils.text import slugify

from church.models import ParishInformation
from core.constants import EVENT_CATEGORIES, EVENT_STATUS
from core.models import BaseModel
from ministries.models import Ministry

from .managers import EventManager


class Event(BaseModel):
    """Parish event model."""

    title = models.CharField(max_length=200, db_index=True)
    objects = EventManager()
    slug = models.SlugField(unique=True, blank=True)
    category = models.CharField(
        max_length=50,
        choices=EVENT_CATEGORIES,
        default="GENERAL",
        db_index=True,
    )
    description = models.TextField()

    # Relational Dimensions
    ministry = models.ForeignKey(
        Ministry,
        related_name="events",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    organizer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="organized_events",
        on_delete=models.SET_NULL,
        null=True,
    )

    # Logistics & Schedule
    venue = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    registration_deadline = models.DateTimeField(null=True, blank=True)

    # Media Fields
    banner = models.ImageField(upload_to="events/banners/", blank=True, null=True)
    thumbnail = models.ImageField(upload_to="events/thumbnails/", blank=True, null=True)

    # Status & Management counters
    capacity = models.PositiveIntegerField(default=0)
    registered_count = models.PositiveIntegerField(default=0, editable=False)
    is_registration_required = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=False)
    status = models.CharField(
        max_length=20,
        choices=EVENT_STATUS,
        default="DRAFT",
    )

    # Secondary Info
    livestream_url = models.URLField(blank=True)
    contact_person = models.CharField(max_length=150, blank=True)
    contact_phone = models.CharField(max_length=20, blank=True)
    contact_email = models.EmailField(blank=True)

    class Meta:
        ordering = ["-start_date", "-start_time"]
        verbose_name = "Event"
        verbose_name_plural = "Events"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class EventRegistration(BaseModel):
    """Event registrations management."""

    ATTENDANCE_STATUS = (
        ("REGISTERED", "Registered"),
        ("ATTENDED", "Attended"),
        ("ABSENT", "Absent"),
        ("CANCELLED", "Cancelled"),
    )

    event = models.ForeignKey(
        Event,
        related_name="registrations",
        on_delete=models.CASCADE,
    )
    member = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="event_registrations",
        on_delete=models.CASCADE,
    )
    attendance_status = models.CharField(
        max_length=20,
        choices=ATTENDANCE_STATUS,
        default="REGISTERED",
    )
    notes = models.TextField(blank=True)

    class Meta:
        unique_together = ("event", "member")

    def __str__(self):
        return f"{self.member} - {self.event}"
