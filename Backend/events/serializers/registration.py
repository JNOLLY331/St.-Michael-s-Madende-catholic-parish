from rest_framework import serializers

from events.models import EventRegistration


class EventRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for displaying detailed event registration information."""

    member = serializers.StringRelatedField()

    class Meta:
        model = EventRegistration
        fields = "__all__"


class EventRegistrationCreateSerializer(serializers.ModelSerializer):
    """Serializer optimized for booking a slot in an event."""

    class Meta:
        model = EventRegistration
        fields = (
            "event",
            "member",
            "notes",
        )

    def validate(self, attrs):
        event = attrs["event"]
        member = attrs["member"]

        # 1. Prevent duplicate bookings
        if EventRegistration.objects.filter(event=event, member=member).exists():
            raise serializers.ValidationError("Member is already registered.")

        # 2. Check event capacity limits
        if event.capacity > 0 and event.registered_count >= event.capacity:
            raise serializers.ValidationError("This event is full.")

        return attrs