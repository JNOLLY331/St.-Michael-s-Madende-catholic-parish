"""
Custom validators for event models and forms.
"""

from django.core.exceptions import ValidationError


def validate_capacity(value: int) -> None:
    """
    Ensure event capacity is non-negative.
    """
    if value < 0:
        raise ValidationError("Capacity cannot be negative.")


def validate_contact_phone(value: str) -> None:
    """
    Basic structural validation for phone numbers.
    """
    if not value or len(value) < 10:
        raise ValidationError("Invalid phone number.")
