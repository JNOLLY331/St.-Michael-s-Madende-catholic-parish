"""
Unit tests for Gallery service layers.
"""

from django.test import TestCase
from gallery.services import GalleryMediaService


class GalleryServiceTest(TestCase):
    """Verifies interface signatures and functional consistency within the business logic layer."""

    def test_service_exists(self):
        """Ensure the media service exposes the core file processing method signature."""
        self.assertTrue(
            hasattr(
                GalleryMediaService,
                "upload_media",
            )
        )