"""
Filters for the Donations application.
"""

import django_filters

from donations.models import Donation


class DonationFilter(django_filters.FilterSet):
    """Provides range-based and structural query filters for parsing donation history."""

    min_amount = django_filters.NumberFilter(
        field_name="amount",
        lookup_expr="gte",
    )
    max_amount = django_filters.NumberFilter(
        field_name="amount",
        lookup_expr="lte",
    )

    class Meta:
        model = Donation
        fields = (
            "category",
            "payment_status",
            "payment_method",
            "campaign",
            "anonymous",
        )