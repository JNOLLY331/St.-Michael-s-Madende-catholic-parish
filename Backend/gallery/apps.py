"""
Application configuration for the Gallery module.
"""

from django.apps import AppConfig


class GalleryConfig(AppConfig):
    """Handles registry initialization and lifecycle startup tasks for the gallery app."""

    default_auto_field = "django.db.models.BigAutoField"
    name = "gallery"

    def ready(self) -> None:
        """Executed by Django upon application registry completion to hook system signals into memory."""
        import gallery.signals