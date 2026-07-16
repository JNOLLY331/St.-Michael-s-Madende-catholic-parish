"""
Signals for the Gallery application.
"""

from django.db.models.signals import post_save
from django.dispatch import receiver

from gallery.models import GalleryMedia
from gallery.services import GalleryNotificationService


@receiver(post_save, sender=GalleryMedia)
def notify_media_upload(sender, instance, created: bool, **kwargs) -> None:
    """Dispatches a system notification event immediately following a successful media upload."""
    if created:
        GalleryNotificationService.media_uploaded(instance)