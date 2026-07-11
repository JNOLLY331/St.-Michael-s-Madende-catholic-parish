"""Serializers handling management representations for individual sacrament requirements."""

from rest_framework import serializers

from sacraments.models import SacramentRequirement


class SacramentRequirementSerializer(serializers.ModelSerializer):
    """Serializer handling standalone operations and field source parsing for requirements."""

    sacrament_name = serializers.CharField(
        source="sacrament.name",
        read_only=True,
    )

    class Meta:
        model = SacramentRequirement
        fields = (
            "id",
            "sacrament",
            "sacrament_name",
            "title",
            "description",
            "required",
            "display_order",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
        )