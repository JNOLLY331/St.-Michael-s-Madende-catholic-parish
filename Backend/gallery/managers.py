"""
Custom managers for gallery models.
"""

from django.db import models


class AlbumManager(models.Manager):
    """Custom queries for the Album model."""

    def public(self):
        """Return only publicly visible collections."""
        return self.filter(is_public=True)

    def private(self):
        """Return only restricted internal collections."""
        return self.filter(is_public=False)

    def recent(self):
        """Order collections showing the newest items first."""
        return self.order_by("-created_at")


class GalleryMediaManager(models.Manager):
    """Custom queries for the GalleryMedia model."""

    def images(self) -> models.QuerySet:
        """Filter only static image records."""
        return self.filter(media_type="IMAGE")

    def videos(self) -> models.QuerySet:
        """Filter only motion video records."""
        return self.filter(media_type="VIDEO")

    def featured(self) -> models.QuerySet:
        """Filter items set as showcase features."""
        return self.filter(is_featured=True)

    def public(self) -> models.QuerySet:
        """Return media whose parent album container is flagged public."""
        # Fixed: Traverses relationship to access parent Album's visibility field
        return self.filter(album__is_public=True)

    def recent(self) -> models.QuerySet:
        """Order media assets from newest to oldest."""
        return self.order_by("-created_at")

    def for_album(self, album_obj) -> models.QuerySet:
        """Fetch assets assigned explicitly to a target album instance or ID."""
        return self.filter(album=album_obj)