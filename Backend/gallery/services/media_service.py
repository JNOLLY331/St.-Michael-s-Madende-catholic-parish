"""
Business logic for Gallery Media operations.
"""

import logging
from django.db import transaction
from gallery.models import GalleryMedia

logger = logging.getLogger(__name__)


class GalleryMediaService:
    """Encapsulates transactional operations and feature state workflows for individual media assets."""

    @staticmethod
    @transaction.atomic
    def upload_media(validated_data: dict) -> GalleryMedia:
        """Register an uploaded media file record within a parent album."""
        media = GalleryMedia.objects.create(**validated_data)

        logger.info(
            "Media asset registered successfully: %s",
            media.title,
        )
        return media

    @staticmethod
    @transaction.atomic
    def feature_media(media: GalleryMedia) -> GalleryMedia:
        """Promote a media asset to the featured showcase collection."""
        if media.is_featured:
            return media

        media.is_featured = True
        media.save(update_fields=["is_featured"])
        
        logger.info("Media asset flagged as featured: %s", media.title)
        return media

    @staticmethod
    @transaction.atomic
    def unfeature_media(media: GalleryMedia) -> GalleryMedia:
        """Remove a media asset from the featured showcase collection."""
        if not media.is_featured:
            return media

        media.is_featured = False
        media.save(update_fields=["is_featured"])
        
        logger.info("Media asset removed from featured showcase: %s", media.title)
        return media