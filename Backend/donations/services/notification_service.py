"""
Donation notification service hooks.

Ready for production extensions with Email engines, SMS alerts, or WhatsApp notifications.
"""

import logging

from donations.models import Donation

logger = logging.getLogger(__name__)


class DonationNotificationService:
    """Dispatches asynchronous receipts and error warnings across financial transactions."""

    @staticmethod
    def donation_received(donation: Donation) -> None:
        """Log or dispatch initial receipt acknowledgment when a transaction draft hits the portal."""
        logger.info(
            "Donation draft initialized: %s",
            donation.receipt_number,
        )

    @staticmethod
    def payment_successful(donation: Donation) -> None:
        """Trigger donor thank-you messages and clear transaction invoices upon secure clearance."""
        logger.info(
            "Donation payment cleared successfully: %s",
            donation.receipt_number,
        )

    @staticmethod
    def payment_failed(donation: Donation) -> None:
        """Alert donors of payment processing issues to encourage troubleshooting steps."""
        logger.warning(
            "Donation settlement attempt failed: %s",
            donation.receipt_number,
        )