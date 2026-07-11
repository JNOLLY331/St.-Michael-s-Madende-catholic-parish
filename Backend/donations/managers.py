from django.db import models
from django.utils import timezone


class DonationManager(models.Manager):
    """
    Custom manager for Donation model.
    """

    def completed(self):
        return self.filter(payment_status="COMPLETED")

    def pending(self):
        return self.filter(payment_status="PENDING")

    def failed(self):
        return self.filter(payment_status="FAILED")

    def today(self):
        return self.filter(created_at__date=timezone.now().date())

    def anonymous(self):
        return self.filter(anonymous=True)


class CampaignManager(models.Manager):
    """
    Custom manager for Campaign model.
    """

    def active(self):
        today = timezone.now().date()

        return self.filter(
            is_active=True,
            start_date__lte=today,
            end_date__gte=today,
        )

    def inactive(self):
        return self.filter(is_active=False)