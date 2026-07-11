from typing import Any
from django.conf import settings
from django.db import transaction
from django.utils import timezone

from contact.models import ContactMessage, MessageStatus
from contact.services.email_service import ContactEmailService


class ContactService:
    """Service layer coordinating business logic execution for Contact messages."""

    @staticmethod
    @transaction.atomic
    def create_message(**validated_data: Any) -> ContactMessage:
        """Creates a new entry and handles the auto-confirmation process."""
        message = ContactMessage.objects.create(**validated_data)
        ContactEmailService.send_confirmation(message)
        return message

    @staticmethod
    @transaction.atomic
    def assign(message: ContactMessage, user: Any) -> ContactMessage:
        """Assigns staff to a message using the model's mutation layer."""
        message.assign(user)
        return message

    @staticmethod
    @transaction.atomic
    def reply(message: ContactMessage, response: str, staff: Any) -> ContactMessage:
        """Saves a staff reply, modifies operational fields, and sends out the email."""
        message.response = response
        message.assigned_to = staff
        message.status = MessageStatus.RESPONDED
        message.responded_at = timezone.now()
        
        message.save(
            update_fields=[
                "response",
                "assigned_to",
                "status",
                "responded_at",
            ]
        )
        ContactEmailService.send_reply(message)
        return message

    @staticmethod
    @transaction.atomic
    def close(message: ContactMessage) -> ContactMessage:
        """Closes out a message ticket using the model's built-in state methods."""
        message.close()
        return message

    @staticmethod
    @transaction.atomic
    def mark_spam(message: ContactMessage) -> ContactMessage:
        """Quarantines a message as spam using the model's state methods."""
        message.mark_as_spam()
        return message