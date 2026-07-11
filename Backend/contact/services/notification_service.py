import logging
from contact.models import ContactMessage

logger = logging.getLogger(__name__)


class ContactNotificationService:
    """Handles operational logging for contact message events."""

    @staticmethod
    def notify_new_message(message: ContactMessage) -> None:
        """Logs an info trail when a brand new message ticket is received."""
        logger.info(
            "New contact message received (%s)",
            message.reference,
        )

    @staticmethod
    def notify_assignment(message: ContactMessage) -> None:
        """Logs tracking data when a ticket is assigned to a staff member."""
        logger.info(
            "Message %s assigned to %s",
            message.reference,
            message.assigned_to,
        )

    @staticmethod
    def notify_reply(message: ContactMessage) -> None:
        """Logs a record when a reply is dispatched back to the sender."""
        logger.info(
            "Reply sent for %s",
            message.reference,
        )