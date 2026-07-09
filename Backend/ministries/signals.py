from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Ministry


@receiver(post_save, sender=Ministry)
def ministry_created(sender, instance, created, **kwargs):
    if created:
        # Placeholder for notifications, logging, etc.
        pass
