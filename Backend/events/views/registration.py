from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from events.models import EventRegistration
from events.serializers.registration import (
    EventRegistrationCreateSerializer,
    EventRegistrationSerializer,
)


class EventRegistrationViewSet(viewsets.ModelViewSet):
    """CRUD operations for event registrations."""

    queryset = EventRegistration.objects.select_related("event", "member").all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update"):
            return EventRegistrationCreateSerializer
        return EventRegistrationSerializer

    def perform_create(self, serializer):
        serializer.save(member=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # Immediately return the detailed view representation
        return Response(
            EventRegistrationSerializer(serializer.instance).data,
            status=status.HTTP_201_CREATED,
        )