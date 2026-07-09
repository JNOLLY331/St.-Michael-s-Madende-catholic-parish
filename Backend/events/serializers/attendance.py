from rest_framework import serializers

from events.models import EventRegistration


class AttendanceSerializer(serializers.ModelSerializer):
    """Serializer optimized specifically for recording and updating event attendance."""

    class Meta:
        model = EventRegistration
        fields = (
            "attendance_status",
            "notes",
        )