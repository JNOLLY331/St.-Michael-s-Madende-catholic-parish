"""
Filtering support for Prayer requests.
"""

import django_filters

from prayers.models import PrayerRequest


class PrayerRequestFilter(django_filters.FilterSet):
    """Provides query parameters for sorting and filtering parish prayer intentions."""

    class Meta:
        model = PrayerRequest
        fields = {
            "status": ["exact"],
            "priority": ["exact"],
            "category": ["exact"],
            "assigned_ministry": ["exact"],
            "answered": ["exact"],
            "is_private": ["exact"],
            "created_at": ["gte", "lte"],
        }