"""
URL routing configuration for the Prayers application.
"""

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from prayers.views import (
    PrayerCategoryViewSet,
    PrayerViewSet,
)

app_name = "prayers"

# Standard API routing setup
router = DefaultRouter()

router.register(
    r"categories",
    PrayerCategoryViewSet,
    basename="prayer-category",
)

router.register(
    r"",
    PrayerViewSet,
    basename="prayer",
)

urlpatterns = [
    path("", include(router.urls)),
]