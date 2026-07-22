"""
Database models for the Gallery application.
"""

from django.conf import settings
from django.db import models
from django.utils.text import slugify
from cloudinary.models import CloudinaryField   

from church.models import ParishInformation
from core.models import BaseModel
from .managers import AlbumManager, GalleryMediaManager


class Album(BaseModel):
    """Represents a collection or folder of church media assets."""

    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True)
    cover_image = CloudinaryField(
        "cover_image",
        folder="gallery/albums",      # This creates a nice folder in Cloudinary
        blank=True,
        null=True,
    )
    parish = models.ForeignKey(
        ParishInformation,
        related_name="albums",
        on_delete=models.CASCADE,
    )
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="albums",
        on_delete=models.SET_NULL,
        null=True,
    )
    is_public = models.BooleanField(default=True)

    objects = AlbumManager()

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            while Album.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)


class GalleryMedia(BaseModel):
    """Individual images or video files assigned to an album container."""

    MEDIA_TYPES = (
        ("IMAGE", "Image"),
        ("VIDEO", "Video"),
    )

    album = models.ForeignKey(
        Album,
        related_name="media",
        on_delete=models.CASCADE,
    )
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    media_type = models.CharField(
        max_length=10,
        choices=MEDIA_TYPES,
        default="IMAGE",
    )
    file = models.FileField(upload_to="gallery/media/")
    thumbnail = CloudinaryField(
        "thumbnail",
        folder="gallery/thumbnails",     # Clean folder organization
        blank=True,
        null=True,
        # Recommended: Auto-optimize on upload
        transformation={
            "width": 400,
            "height": 300,
            "crop": "fill",           # Good for thumbnails
            "gravity": "auto",
            "quality": "auto",
            "fetch_format": "auto"
        }
    )
    duration = models.DurationField(
        blank=True,
        null=True,
        help_text="Applicable for videos only.",
    )
    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="gallery_media",
        on_delete=models.SET_NULL,
        null=True,
    )
    is_featured = models.BooleanField(default=False)

    objects = GalleryMediaManager()

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Gallery Media"
        verbose_name_plural = "Gallery Media Records"

    def __str__(self):
        return self.title