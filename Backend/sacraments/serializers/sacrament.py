"""Serializers handling data representations for Sacraments and their prerequisites."""

from rest_framework import serializers

from sacraments.models import Sacrament, SacramentRequirement


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