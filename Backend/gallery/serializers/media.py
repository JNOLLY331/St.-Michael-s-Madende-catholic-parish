"""
Serializers for the GalleryMedia model within the Gallery application.
"""

import cloudinary
import cloudinary.utils
from rest_framework import serializers

from gallery.models import GalleryMedia
from gallery.validators import validate_media_file


def _cloudinary_url(field_value):
    if not field_value:
        return None
    val = str(field_value)
    if val.startswith('http://') or val.startswith('https://'):
        return val
    url, _ = cloudinary.utils.cloudinary_url(val, secure=True)
    return url


class GalleryMediaListSerializer(serializers.ModelSerializer):
    """Summary view mapping core asset references for collection matrices."""

    album = serializers.StringRelatedField()
    uploaded_by = serializers.StringRelatedField()
    file = serializers.SerializerMethodField()
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = GalleryMedia
        fields = (
            "id",
            "title",
            "media_type",
            "file",
            "thumbnail",
            "album",
            "is_featured",
            "created_at",
            "uploaded_by",
        )

    def get_file(self, obj):
        return _cloudinary_url(obj.file)

    def get_thumbnail(self, obj):
        return _cloudinary_url(obj.thumbnail)


class GalleryMediaDetailSerializer(serializers.ModelSerializer):
    """Comprehensive details block exposing deep meta tags and metrics like video duration."""

    album = serializers.StringRelatedField()
    uploaded_by = serializers.StringRelatedField()
    file = serializers.SerializerMethodField()
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = GalleryMedia
        fields = "__all__"

    def get_file(self, obj):
        return _cloudinary_url(obj.file)

    def get_thumbnail(self, obj):
        return _cloudinary_url(obj.thumbnail)


class GalleryMediaCreateUpdateSerializer(serializers.ModelSerializer):
    """Write-only payload schema enforcing binary constraints on media uploads."""

    class Meta:
        model = GalleryMedia
        exclude = (
            "created_at",
            "updated_at",
        )

    def validate(self, attrs):
        # Fallback to existing model instance properties if specific keys are missing during PATCH requests
        file = attrs.get("file", getattr(self.instance, "file", None))
        media_type = attrs.get("media_type", getattr(self.instance, "media_type", None))

        if file and media_type:
            validate_media_file(file, media_type)

        return attrs