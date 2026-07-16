"""
Database models for the Prayers application.
"""

import uuid
from django.conf import settings
from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from .managers import PrayerRequestManager


from church.models import ParishInformation
from core.models import BaseModel
from ministries.models import Ministry

PRAYER_STATUS = (
    ("PENDING", "Pending"),
    ("UNDER_PRAYER", "Under Prayer"),
    ("ANSWERED", "Answered"),
    ("CLOSED", "Closed"),
)

PRAYER_PRIORITY = (
    ("LOW", "Low"),
    ("NORMAL", "Normal"),
    ("HIGH", "High"),
    ("URGENT", "Urgent"),
)


class PrayerCategory(BaseModel):
    """Categorizes parish prayer requests into logical groups."""

    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ("name",)
        verbose_name = "Prayer Category"
        verbose_name_plural = "Prayer Categories"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            while PrayerCategory.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug

        super().save(*args, **kwargs)

class PrayerRequest(BaseModel):
    objects = PrayerRequestManager()
    
class PrayerRequest(BaseModel):
    """Stores individual and communal parish prayer requests."""

    title = models.CharField(max_length=255, db_index=True)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    
    # Classifications & Ownership
    category = models.ForeignKey(
        PrayerCategory,
        related_name="prayers",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    requester = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="prayer_requests",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    parish = models.ForeignKey(
        ParishInformation,
        related_name="prayer_requests",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    # Assignments
    assigned_ministry = models.ForeignKey(
        Ministry,
        related_name="assigned_prayers",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    assigned_priest = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="assigned_prayers",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    # Configuration States
    status = models.CharField(
        max_length=20,
        choices=PRAYER_STATUS,
        default="PENDING",
        db_index=True,
    )
    priority = models.CharField(
        max_length=20,
        choices=PRAYER_PRIORITY,
        default="NORMAL",
    )
    is_anonymous = models.BooleanField(default=False)
    is_private = models.BooleanField(default=False)
    allow_comments = models.BooleanField(default=True)
    prayed_count = models.PositiveIntegerField(default=0)

    # Testimony Tracking
    answered = models.BooleanField(default=False)
    answered_date = models.DateTimeField(null=True, blank=True)
    answered_testimony = models.TextField(blank=True)

    class Meta:
        ordering = ("-created_at",)
        verbose_name = "Prayer Request"
        verbose_name_plural = "Prayer Requests"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # Unique slug fallback chain using a short unique hash if title collides
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            if PrayerRequest.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{uuid.uuid4().hex[:6]}"
            self.slug = slug

        # Synchronize answered flags if status transitions to ANSWERED
        if self.status == "ANSWERED":
            self.answered = True
            if not self.answered_date:
                self.answered_date = timezone.now()
        elif self.answered and self.status == "PENDING":
            self.status = "ANSWERED"

        super().save(*args, **kwargs)