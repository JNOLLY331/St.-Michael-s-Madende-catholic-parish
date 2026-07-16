"""
Prayer category serializers.
"""

from rest_framework import serializers

from prayers.models import PrayerCategory


class PrayerCategorySerializer(serializers.ModelSerializer):
    """
    Serializer for prayer categories.
    """

    class Meta:
        model = PrayerCategory
        fields = "__all__"
        read_only_fields = (
            "id",
            "slug",
            "created_at",
            "updated_at",
        )