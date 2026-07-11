from typing import Any
from rest_framework import serializers
from contact.models import ContactMessage
from contact.services.contact_service import ContactService


class ContactMessageSerializer(serializers.ModelSerializer):
    """Public serializer for incoming user contact messages."""

    department_name = serializers.CharField(
        source="department.name",
        read_only=True,
        default="",
    )
    assigned_to_name = serializers.CharField(
        source="assigned_to.get_full_name",
        read_only=True,
        default="",
    )

    class Meta:
        model = ContactMessage
        fields = (
            "id",
            "reference",
            "department",
            "department_name",
            "full_name",
            "email",
            "phone",
            "subject",
            "message",
            "attachment",
            "status",
            "priority",
            "assigned_to",
            "assigned_to_name",
            "response",
            "internal_notes",
            "is_read",
            "is_spam",
            "responded_at",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "id",
            "reference",
            "status",
            "assigned_to",
            "response",
            "internal_notes",
            "is_read",
            "is_spam",
            "responded_at",
            "created_at",
            "updated_at",
        )

    def create(self, validated_data: dict[str, Any]) -> ContactMessage:
        return ContactService.create_message(**validated_data)


class ContactMessageAdminSerializer(serializers.ModelSerializer):
    """Internal admin serializer allowing full field modification."""

    class Meta:
        model = ContactMessage
        fields = "__all__"