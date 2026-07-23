import cloudinary
import cloudinary.utils
from rest_framework import serializers

from .models import Ministry


def _cloudinary_url(field_value):
    if not field_value:
        return None
    val = str(field_value)
    if val.startswith('http://') or val.startswith('https://'):
        return val
    url, _ = cloudinary.utils.cloudinary_url(val, secure=True)
    return url


class MinistrySerializer(serializers.ModelSerializer):
    leader_name = serializers.SerializerMethodField()
    assistant_name = serializers.SerializerMethodField()
    # Expose 'banner' as 'image' so the frontend hook (m.image) works without change
    image = serializers.SerializerMethodField()
    banner = serializers.SerializerMethodField()

    class Meta:
        model = Ministry
        fields = "__all__"
        read_only_fields = (
            "id",
            "slug",
            "created_at",
            "updated_at",
        )

    def get_leader_name(self, obj):
        if obj.leader:
            return obj.leader.get_full_name()
        return None

    def get_assistant_name(self, obj):
        if obj.assistant_leader:
            return obj.assistant_leader.get_full_name()
        return None

    def get_image(self, obj):
        return _cloudinary_url(obj.banner)

    def get_banner(self, obj):
        return _cloudinary_url(obj.banner)
