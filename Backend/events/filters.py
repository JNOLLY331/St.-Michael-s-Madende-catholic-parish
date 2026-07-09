"""
Filtering support for Events.
"""

import django_filters

from .models import Event


class EventFilter(django_filters.FilterSet):
    """
    Filter set for the Event model, allowing clients to query events by
    date ranges, category, status, visibility, and hosting ministry.
    """

    start_after = django_filters.DateFilter(
        field_name="start_date",
        lookup_expr="gte",
    )
    start_before = django_filters.DateFilter(
        field_name="start_date",
        lookup_expr="lte",
    )

    class Meta:
        model = Event
        fields = (
            "category",
            "status",
            "is_featured",
            "ministry",
        )
