"""
URL routing configuration for the Donations application.
"""

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from donations.views import (
    CampaignViewSet,
    DonationViewSet,
)

app_name = "donations"

# Initialize router for standard API viewsets
router = DefaultRouter()

router.register(
    r"campaigns",
    CampaignViewSet,
    basename="campaign",
)

router.register(
    r"",
    DonationViewSet,
    basename="donation",
)

urlpatterns = [
    path("", include(router.urls)),
]