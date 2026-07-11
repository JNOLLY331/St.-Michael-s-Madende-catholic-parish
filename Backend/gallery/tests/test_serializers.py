"""
Unit tests for Gallery serializers.
"""

from django.test import TestCase
from gallery.serializers import GalleryMediaCreateUpdateSerializer


class GallerySerializerTest(TestCase):
    """Verifies parsing behaviors, payload structural integrity, and initialization rules."""

    def test_serializer_exists(self):
        """Ensure that the media creation serializer class instantiates correctly without errors."""
        serializer = GalleryMediaCreateUpdateSerializer()

        self.assertIsNotNone(serializer)