"""
Validators used by the Prayers application.
"""

from django.core.exceptions import ValidationError


def validate_prayer_description(value):
    """Ensure the prayer request description provides enough contextual detail."""
    if len(value.strip()) < 20:
        raise ValidationError(
            "Prayer description must contain at least 20 characters."
        )


def validate_testimony(value):
    """Ensure submitted answer testimonies contain meaningful reflection."""
    if value and len(value.strip()) < 10:
        raise ValidationError(
            "Testimony should contain at least 10 characters."
        )