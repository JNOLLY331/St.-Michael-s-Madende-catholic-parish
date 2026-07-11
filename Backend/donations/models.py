from .managers import CampaignManager, DonationManager
"""
Database models for the Donations application.
"""

from django.conf import settings
from django.db import models
from django.utils.text import slugify

from church.models import ParishInformation
from core.constants import (
    DONATION_STATUS,
    PAYMENT_METHODS,
)
from core.models import BaseModel


class DonationCategory(BaseModel):
    """Categories of donations (e.g., Tithe, Thanksgiving, Building Fund)."""

    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Donation Category"
        verbose_name_plural = "Donation Categories"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            while DonationCategory.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)


class Campaign(BaseModel):
    """Specific targeted church fundraising campaign."""

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    target_amount = models.DecimalField(max_digits=12, decimal_places=2)
    amount_raised = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    start_date = models.DateField()
    end_date = models.DateField()
    is_active = models.BooleanField(default=True)
    
    objects = CampaignManager()
    
    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            while Campaign.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)


class Donation(BaseModel):
    """Individual financial offering record."""

    donor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="donations",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    parish = models.ForeignKey(
        ParishInformation,
        related_name="donations",
        on_delete=models.CASCADE,
    )
    category = models.ForeignKey(
        DonationCategory,
        related_name="donations",
        on_delete=models.SET_NULL,
        null=True,
    )
    campaign = models.ForeignKey(
        Campaign,
        related_name="donations",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    payment_method = models.CharField(max_length=30, choices=PAYMENT_METHODS)
    payment_status = models.CharField(
        max_length=20,
        choices=DONATION_STATUS,
        default="PENDING",
    )
    transaction_reference = models.CharField(max_length=100, blank=True)
    receipt_number = models.CharField(max_length=100, blank=True)
    anonymous = models.BooleanField(default=False)
    message = models.TextField(blank=True)
    
    objects = DonationManager()

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.amount} - {self.category}"