from typing import Any
from django.db.models.signals import post_save
from django.dispatch import receiver

from contact.models import ContactMessage
from contact.services.notification_service import ContactNotificationService


@receiver(post_save, sender=ContactMessage)
def contact_message_created(
    sender: type[ContactMessage], 
    instance: ContactMessage, 
    created: bool, 
    **kwargs: Any
) -> None:
    """Dispatches background alerts immediately after a contact message is created."""
    if created:
        ContactNotificationService.notify_new_message(instance)