"""
Business logic for Album operations.
"""

import logging
from django.db import transaction
from gallery.models import Album

logger = logging.getLogger(__name__)


class AlbumService:
    """Encapsulates transactional operations and validation logic for gallery collections."""

    @staticmethod
    @transaction.atomic
    def create_album(validated_data: dict) -> Album:
        """Create a new media album collection."""
        # Note: Slug generation logic is already cleanly handled by Album.save()
        album = Album.objects.create(**validated_data)

        logger.info(
            "Album created successfully: %s",
            album.title,
        )
        return album

    @staticmethod
    @transaction.atomic
    def update_album(album: Album, validated_data: dict) -> Album:
        """Update fields on a gallery collection row."""
        for field, value in validated_data.items():
            setattr(album, field, value)

        album.save()
        return album