"""
Prayer Category API.
"""

from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from prayers.models import PrayerCategory
from prayers.serializers import PrayerCategorySerializer


class PrayerCategoryViewSet(viewsets.ModelViewSet):
    """
    CRUD for Prayer Categories.
    """

    queryset = PrayerCategory.objects.filter(
        is_active=True,
    ).order_by("name")

    serializer_class = PrayerCategorySerializer

    permission_classes = (AllowAny,)