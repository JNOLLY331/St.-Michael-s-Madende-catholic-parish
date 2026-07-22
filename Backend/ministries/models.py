from django.conf import settings
from django.db import models
from cloudinary.models import CloudinaryField   
from core.models import BaseModel


class Ministry(BaseModel):
    category = models.CharField(
        max_length=100, choices=settings.MINISTRY_CATEGORIES, default="GENERAL"
    )
    name = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    mission = models.TextField(blank=True)
    patron_saint = models.CharField(max_length=100, blank=True)

    # Leadership links
    leader = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="led_ministries",
    )
    assistant_leader = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assistant_ministries",
    )

    # Contact Details
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)

    # Logistics & Schedule
    meeting_day = models.CharField(max_length=30)
    meeting_time = models.TimeField()
    meeting_location = models.CharField(max_length=200)

    # Visual Elements
    banner = CloudinaryField(
        "banner",
        folder="ministries/banners",   # plural is better
        blank=True,
        null=True,
        transformation={
            "width": 1200,
            "height": 400,
            "crop": "fill",
            "gravity": "auto",
            "quality": "auto",
            "fetch_format": "auto"
        }
    )
    color = models.CharField(max_length=20, default="#0B5ED7")
    is_featured = models.BooleanField(default=False)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name
