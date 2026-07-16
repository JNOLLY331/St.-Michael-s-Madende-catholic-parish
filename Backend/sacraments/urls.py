"""URL routing configuration mapping for the Sacraments API resource paths."""

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from sacraments.views import (
    SacramentApplicationViewSet,
    SacramentRequirementViewSet,
    SacramentViewSet,
)

app_name = "sacraments"

# Initializing standard DRF RESTful routing engine
router = DefaultRouter()

router.register(
    r"sacraments",
    SacramentViewSet,
    basename="sacrament",
)
router.register(
    r"requirements",
    SacramentRequirementViewSet,
    basename="sacrament-requirement",
)
router.register(
    r"applications",
    SacramentApplicationViewSet,
    basename="sacrament-application",
)

urlpatterns = [
    path("", include(router.urls)),
]