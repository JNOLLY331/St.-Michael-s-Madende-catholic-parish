import cloudinary
import cloudinary.utils
from rest_framework import serializers

from events.models import Event


def _cloudinary_url(field_value):
    if not field_value:
        return None
    val = str(field_value)
    if val.startswith('http://') or val.startswith('https://'):
        return val
    url, _ = cloudinary.utils.cloudinary_url(val, secure=True)
    return url


class EventListSerializer(serializers.ModelSerializer):
    """Serializer for listing events with brief details."""

    ministry = serializers.StringRelatedField()
    organizer = serializers.StringRelatedField()
    available_slots = serializers.SerializerMethodField()
    banner = serializers.SerializerMethodField()
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = (
            "id",
            "title",
            "slug",
            "category",
            "banner",
            "thumbnail",
            "venue",
            "start_date",
            "end_date",
            "start_time",
            "end_time",
            "status",
            "is_featured",
            "is_published",
            "capacity",
            "registered_count",
            "available_slots",
            "ministry",
            "organizer",
        )

    def get_available_slots(self, obj):
        return max(obj.capacity - obj.registered_count, 0)

    def get_banner(self, obj):
        return _cloudinary_url(obj.banner)

    def get_thumbnail(self, obj):
        return _cloudinary_url(obj.thumbnail)


class EventDetailSerializer(serializers.ModelSerializer):
    """Serializer for retrieving full details of a single event."""

    ministry = serializers.StringRelatedField()
    organizer = serializers.StringRelatedField()
    available_slots = serializers.SerializerMethodField()
    banner = serializers.SerializerMethodField()
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = "__all__"

    def get_available_slots(self, obj):
        return max(obj.capacity - obj.registered_count, 0)

    def get_banner(self, obj):
        return _cloudinary_url(obj.banner)

    def get_thumbnail(self, obj):
        return _cloudinary_url(obj.thumbnail)


class EventCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer for creating and updating parish events."""

    class Meta:
        model = Event
        exclude = (
            "slug",
            "registered_count",
            "created_at",
            "updated_at",
        )

    def validate(self, attrs):
        # Use getattr or dict.get to support both POST and partial PATCH operations
        start_date = attrs.get("start_date", getattr(self.instance, "start_date", None))
        end_date = attrs.get("end_date", getattr(self.instance, "end_date", None))
        start_time = attrs.get("start_time", getattr(self.instance, "start_time", None))
        end_time = attrs.get("end_time", getattr(self.instance, "end_time", None))

        if start_date and end_date and end_date < start_date:
            raise serializers.ValidationError(
                {"end_date": "End date cannot be before start date."}
            )

        if start_date == end_date and start_time and end_time:
            if end_time <= start_time:
                raise serializers.ValidationError(
                    {"end_time": "End time must be after start time."}
                )

        return attrs