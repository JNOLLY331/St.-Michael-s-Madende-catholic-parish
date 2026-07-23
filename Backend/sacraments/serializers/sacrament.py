"""Serializers handling data representations for Sacraments and their prerequisites."""

import cloudinary
import cloudinary.utils
from rest_framework import serializers

from sacraments.models import Sacrament, SacramentRequirement


def _cloudinary_url(field_value):
    if not field_value:
        return None
    val = str(field_value)
    if val.startswith('http://') or val.startswith('https://'):
        return val
    url, _ = cloudinary.utils.cloudinary_url(val, secure=True)
    return url


class SacramentRequirementNestedSerializer(serializers.ModelSerializer):
    """Read-only relational serialization block detailing requirements for a sacrament."""

    class Meta:
        model = SacramentRequirement
        fields = (
            "id",
            "title",
            "description",
            "required",
            "display_order",
        )
        read_only_fields = fields


class SacramentSerializer(serializers.ModelSerializer):
    """Core serializer rendering all metadata attributes for a Sacrament entity."""

    requirements = SacramentRequirementNestedSerializer(
        many=True,
        read_only=True,
    )
    # Human-readable label for the sacrament type choice
    sacrament_type_display = serializers.CharField(
        source="get_sacrament_type_display",
        read_only=True,
    )
    banner = serializers.SerializerMethodField()

    class Meta:
        model = Sacrament
        fields = (
            "id",
            "sacrament_type",
            "sacrament_type_display",
            "name",
            "slug",
            "short_description",
            "description",
            "icon",
            "banner",
            "preparation_duration",
            "minimum_age",
            "requires_booking",
            "requires_documents",
            "display_order",
            "is_active",
            "requirements",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "id",
            "slug",
            "sacrament_type_display",
            "created_at",
            "updated_at",
        )

    def get_banner(self, obj):
        return _cloudinary_url(obj.banner)