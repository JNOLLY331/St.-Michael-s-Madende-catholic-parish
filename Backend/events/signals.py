import logging

from django.db.models import F
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from .models import Event, EventRegistration

logger = logging.getLogger(__name__)


@receiver(post_save, sender=Event)
def log_event_saved(sender, instance, created, **kwargs):
    """Log when an event is created or updated."""
    if created:
        logger.info("New event created: %s", instance.title)
    else:
        logger.info("Event updated: %s", instance.title)


@receiver(post_save, sender=EventRegistration)
def increment_registration_count(sender, instance, created, **kwargs):
    """Increment registered attendees count on registration creation."""
    if created:
        Event.objects.filter(pk=instance.event_id).update(
            registered_count=F("registered_count") + 1
        )


@receiver(post_delete, sender=EventRegistration)
def decrement_registration_count(sender, instance, **kwargs):
    """Decrement registered attendees count after registration removal."""
    Event.objects.filter(pk=instance.event_id).update(
        registered_count=F("registered_count") - 1
    )


@receiver(post_delete, sender=Event)
def delete_uploaded_images(sender, instance, **kwargs):
    """Remove uploaded media files from storage when an event is deleted."""
    if instance.banner:
        instance.banner.delete(save=False)

    if instance.thumbnail:
        instance.thumbnail.delete(save=False)
