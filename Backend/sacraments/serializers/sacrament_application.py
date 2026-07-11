"""Serializers handling data representations for Sacrament user application workflows."""

from typing import Any
from rest_framework import serializers

from sacraments.models import SacramentApplication


class SacramentApplicationSerializer(serializers.ModelSerializer):
    """Serializer managing consumer intake forms and admin auditing values."""

    sacrament_name = serializers.CharField(
        source="sacrament.name",
        read_only=True,
    )
    approved_by_name = serializers.SerializerMethodField()

    def get_approved_by_name(self, obj):
        if obj.approved_by:
            return (
                obj.approved_by.get_full_name()
                or obj.approved_by.username
            )
        return None

    class Meta:
        model = SacramentApplication
        fields = (
            "id",
            "reference",
            "sacrament",
            "sacrament_name",
            "applicant_name",
            "email",
            "phone",
            "date_of_birth",
            "preferred_date",
            "message",
            "attachment",
            "status",
            "approved_by",
            "approved_by_name",
            "approved_at",
            "rejection_reason",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "id",
            "reference",
            "status",
            "approved_by",
            "approved_at",
            "rejection_reason",
            "created_at",
            "updated_at",
        )

    def create(self, validated_data: dict[str, Any]) -> SacramentApplication:
        """Intercepts creation to execute operations via the domain service layer."""
        from sacraments.services.sacrament_service import SacramentService

        return SacramentService.create_application(**validated_data)