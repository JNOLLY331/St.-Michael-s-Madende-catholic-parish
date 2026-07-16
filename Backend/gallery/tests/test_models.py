"""
Unit tests for the Gallery models.
"""

from django.test import TestCase
from gallery.models import Album  # Fixed: Imported correct 'Album' model name


class AlbumModelTest(TestCase):
    """Verifies internal model methods, properties, and core behaviors for collections."""

    def test_string_representation(self):
        """Ensure that casting an Album instance to a string returns its descriptive title."""
        album = Album(title="Youth Camp")

        self.assertEqual(
            str(album),
            "Youth Camp",
        )