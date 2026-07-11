from rest_framework import serializers
from contact.models import FAQ


class FAQSerializer(serializers.ModelSerializer):
    """Serializer mapping FAQ model instances to JSON payloads."""

    class Meta:
        model = FAQ
        fields = "__all__"
        read_only_fields = (
            "id",
            "slug",
            "created_at",
            "updated_at",
        )