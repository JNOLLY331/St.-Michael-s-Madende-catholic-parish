"""
Prayer application signals.
"""

from django.db.models.signals import post_save
from django.dispatch import receiver

from prayers.models import PrayerRequest
from prayers.services import PrayerNotificationService



@receiver(post_save, sender=PrayerRequest)
def notify_new_prayer(sender, instance, created, **kwargs):
    if created:
        PrayerNotificationService.notify_prayer_team(instance)


@receiver(post_save, sender=PrayerRequest)
def notify_answered(sender, instance, **kwargs):
    if instance.answered:
        PrayerNotificationService.notify_answered(instance)