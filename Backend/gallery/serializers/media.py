"""
Serializers for the GalleryMedia model within the Gallery application.
"""

from rest_framework import serializers

from gallery.models import GalleryMedia
from gallery.validators import validate_media_file


class GalleryMediaListSerializer(serializers.ModelSerializer):
    """Summary view mapping core asset references for collection matrices."""

    album = serializers.StringRelatedField()
    uploaded_by = serializers.StringRelatedField()

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


class GalleryMediaDetailSerializer(serializers.ModelSerializer):
    """Comprehensive details block exposing deep meta tags and metrics like video duration."""

    album = serializers.StringRelatedField()
    uploaded_by = serializers.StringRelatedField()

    class Meta:
        model = GalleryMedia
        fields = "__all__"


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