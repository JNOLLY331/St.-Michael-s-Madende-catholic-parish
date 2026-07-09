import logging

logger = logging.getLogger(__name__)


class NewsNotificationService:
    """Handles communications and dispatch logic for the parish news desk."""

    @staticmethod
    def notify_news_published(news) -> None:
        """Trigger widespread notifications when an article drops live.

        Planned Channels:
        - Sendgrid/Email newsletter to registered parishioners
        - Firebase Cloud Messaging (FCM) Push Notifications for mobile apps
        - WebSocket broadcasts for live dashboard widgets
        """
        logger.info(
            "Notification Dispatched: News article '%s' has been published.",
            news.title,
        )

    @staticmethod
    def notify_featured(news) -> None:
        """Notify targeted user segments when an update gets promoted to featured status."""
        logger.info(
            "Notification Dispatched: News article '%s' is now pinned/featured.",
            news.title,
        )