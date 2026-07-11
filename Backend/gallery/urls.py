"""
URL routing configuration for the Gallery application.
"""

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from gallery.views import (
    AlbumViewSet,
    GalleryMediaViewSet,
)

app_name = "gallery"

# Initialize router for standard API viewsets
router = DefaultRouter()

router.register(
    r"albums",
    AlbumViewSet,
    basename="album",
)

router.register(
    r"media",
    GalleryMediaViewSet,
    basename="media",
)

urlpatterns = [
    path("", include(router.urls)),
]