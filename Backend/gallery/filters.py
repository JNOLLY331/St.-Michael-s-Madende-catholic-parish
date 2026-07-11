"""
Filters for the Gallery application.
"""

import django_filters

from gallery.models import Album, GalleryMedia


class AlbumFilter(django_filters.FilterSet):
    """Provides query parameters to filter collections by visibility."""

    class Meta:
        model = Album
        fields = (
            "is_public",
        )


class GalleryMediaFilter(django_filters.FilterSet):
    """Provides query parameters to filter media assets by metadata or folder constraints."""

    # Fixed: Traverses relationship to filter items based on their parent album's visibility status
    is_public = django_filters.BooleanFilter(
        field_name="album__is_public",
    )

    class Meta:
        model = GalleryMedia
        fields = (
            "media_type",
            "is_featured",
            "is_public",
            "album",
        )