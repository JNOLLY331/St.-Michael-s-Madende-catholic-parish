from django.db.models.signals import post_save
from django.dispatch import receiver

from donations.models import Donation
from donations.services import DonationNotificationService


@receiver(post_save, sender=Donation)
def donation_created(sender, instance, created, **kwargs):

    if created:
        DonationNotificationService.donation_received(instance)