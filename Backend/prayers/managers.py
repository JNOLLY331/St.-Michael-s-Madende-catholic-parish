"""
Custom model managers for Prayer models.
"""

from django.db import models
from django.utils import timezone



class PrayerRequestManager(models.Manager):
    """Custom queryset manager for prayer requests."""

    def pending(self):
        return self.filter(status="PENDING")

    def under_prayer(self):
        return self.filter(status="UNDER_PRAYER")

    def answered(self):
        return self.filter(answered=True)

    def active(self):
        return self.exclude(status="CLOSED")

    def urgent(self):
        return self.filter(priority="URGENT")

    def today(self):
        return self.filter(created_at__date=timezone.now().date())