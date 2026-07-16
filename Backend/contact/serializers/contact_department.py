from rest_framework import serializers
from contact.models import ContactDepartment


class ContactDepartmentSerializer(serializers.ModelSerializer):
    """Serializer mapping ContactDepartment model properties to JSON payloads."""

    class Meta:
        model = ContactDepartment
        fields = "__all__"
        read_only_fields = (
            "id",
            "slug",
            "created_at",
            "updated_at",
        )