"""
Prayer request serializers.
"""

from rest_framework import serializers

from prayers.models import PrayerRequest
from prayers.validators import (
    validate_prayer_description,
    validate_testimony,
)


class PrayerListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for listing summarized public or personal prayer requests."""

    requester = serializers.StringRelatedField()
    category = serializers.StringRelatedField()

    class Meta:
        model = PrayerRequest
        fields = (
            "id",
            "title",
            "slug",
            "category",
            "requester",
            "priority",
            "status",
            "answered",
            "created_at",
        )


class PrayerDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for retrieving deep relational data of a target prayer request."""

    requester = serializers.StringRelatedField()
    category = serializers.StringRelatedField()
    assigned_ministry = serializers.StringRelatedField()
    assigned_priest = serializers.StringRelatedField()

    class Meta:
        model = PrayerRequest
        fields = "__all__"


class PrayerCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer guarding data extractions for posting and modifying prayer requests."""

    description = serializers.CharField(validators=[validate_prayer_description])
    answered_testimony = serializers.CharField(
        required=False,
        allow_blank=True,
        validators=[validate_testimony],
    )

    class Meta:
        model = PrayerRequest
        exclude = (
            "slug",
            "prayed_count",
            "created_at",
            "updated_at",
        )

    def validate(self, attrs):
        # Gracefully handle dynamic logic mapping across fields
        answered = attrs.get(
            "answered", getattr(self.instance, "answered", False)
        )
        answered_testimony = attrs.get(
            "answered_testimony", getattr(self.instance, "answered_testimony", "")
        )

        if answered and not str(answered_testimony).strip():
            raise serializers.ValidationError(
                {
                    "answered_testimony": (
                        "Provide testimony when marking a prayer as answered."
                    )
                }
            )

        return attrs