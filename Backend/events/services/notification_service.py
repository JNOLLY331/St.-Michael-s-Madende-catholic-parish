"""
Notification service for dispatching system alerts.

Future integrations:
- Email (e.g., Django Anymail / SendGrid)
- SMS (e.g., Twilio)
- Push Notifications (e.g., Firebase Cloud Messaging)
"""

import logging

from events.models import Event

logger = logging.getLogger(__name__)


class NotificationService:
    """
    Handles system alerts and user notifications for event-driven actions.
    """

    @staticmethod
    def notify_registration(member, event: Event) -> None:
        """
        Notify a member that their registration was successful.
        """
        logger.info("%s registered for %s", member, event)

        # TODO: Implement Email/SMS dispatch here
        # send_email(to=member.email, template="registration_success", context={"event": event})

    @staticmethod
    def notify_event_created(event: Event) -> None:
        """
        Notify subscribers or administrators that a new event is available.
        """
        logger.info("New event created: %s", event)

        # TODO: Implement broadcast channels or push notifications here

    @staticmethod
    def notify_event_cancelled(event: Event) -> None:
        """
        Alert all registered attendees that the event has been cancelled.
        """
        logger.info("Event cancelled: %s", event)

        # TODO: Pull list of registered members and send urgent SMS/Email alerts
        # for registration in event.registrations.all():
        #     send_sms(to=registration.member.phone, message=f"Notice: {event.title} has been cancelled.")
