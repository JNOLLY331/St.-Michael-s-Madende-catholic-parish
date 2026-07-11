"""
Validators for the Donations application.
"""

from django.core.exceptions import ValidationError
from django.utils import timezone


def validate_positive_amount(value):
    """Ensure the donation financial transaction amount is strictly positive."""
    if value <= 0:
        raise ValidationError("Donation amount must be greater than zero.")


def validate_campaign_dates(start_date, end_date):
    """Enforce correct chronological order for campaign start and end timelines."""
    if start_date and end_date and end_date < start_date:
        raise ValidationError("Campaign end date cannot be before start date.")


def validate_campaign_not_expired(campaign):
    """Block donation attempts targeting fundraising campaigns that have concluded."""
    if campaign and campaign.end_date < timezone.now().date():
        raise ValidationError("This campaign has already ended.")