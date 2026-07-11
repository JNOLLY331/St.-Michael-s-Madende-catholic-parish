"""
Notification service hooks for the Gallery application.
"""

import logging
from gallery.models import GalleryMedia

logger = logging.getLogger(__name__)


class GalleryNotificationService:
    """Dispatches alerts and system log tracking events for media lifecycle actions."""

    @staticmethod
    def media_uploaded(media: GalleryMedia) -> None:
        """Log or dispatch a notification event when a new asset file is successfully saved."""
        logger.info(
            "New media asset uploaded successfully: %s",
            media.title,
        )