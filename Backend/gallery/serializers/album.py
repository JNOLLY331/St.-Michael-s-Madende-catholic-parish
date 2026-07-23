"""
Serializers for the Album model within the Gallery application.
"""

import cloudinary
import cloudinary.utils
from rest_framework import serializers
from gallery.models import Album


def _cloudinary_url(field_value):
    if not field_value:
        return None
    val = str(field_value)
    if val.startswith('http://') or val.startswith('https://'):
        return val
    url, _ = cloudinary.utils.cloudinary_url(val, secure=True)
    return url


class AlbumListSerializer(serializers.ModelSerializer):
    """Summary representation used when rendering collections inside card matrices or index lists."""

    created_by = serializers.StringRelatedField()
    # Expects an annotated 'media_count' from the viewset QuerySet for optimal performance
    media_count = serializers.IntegerField(read_only=True)
    cover_image = serializers.SerializerMethodField()

    class Meta:
        model = Album
        fields = (
            "id",
            "title",
            "slug",
            "cover_image",
            "is_public",
            "media_count",
            "created_by",
            "created_at",
        )

    def get_cover_image(self, obj):
        return _cloudinary_url(obj.cover_image)


class AlbumDetailSerializer(serializers.ModelSerializer):
    """Comprehensive blueprint exposing full relation paths and properties for individual folders."""

    created_by = serializers.StringRelatedField()
    media_count = serializers.IntegerField(read_only=True)
    cover_image = serializers.SerializerMethodField()

    class Meta:
        model = Album
        fields = "__all__"

    def get_cover_image(self, obj):
        return _cloudinary_url(obj.cover_image)


class AlbumCreateUpdateSerializer(serializers.ModelSerializer):
    """Write-only mapping ensuring incoming creation payloads conform to core structure limits."""

    class Meta:
        model = Album
        exclude = (
            "slug",
            "created_at",
            "updated_at",
        )

    def validate_title(self, value: str) -> str:
        """Sanitize whitespace and enforce minimum length parameters on the collection header."""
        clean_value = value.strip()

        if len(clean_value) < 3:
            raise serializers.ValidationError(
                "Album title must contain at least 3 characters."
            )

        return clean_value
