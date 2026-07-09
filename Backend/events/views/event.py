"""
API endpoints for Event management.
"""

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import BaseSerializer

from events.filters import EventFilter
from events.models import Event
from events.permissions import IsEventManager
from events.serializers import (EventCreateUpdateSerializer,
                                EventDetailSerializer, EventListSerializer)
from events.services.event_service import EventService

class EventViewSet(viewsets.ModelViewSet):
    """
    Unified CRUD viewset for parish events.
    """

    queryset = Event.objects.select_related("organizer", "ministry")
    filter_backends = (
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )
    filterset_class = EventFilter
    search_fields = ("title", "description", "venue")
    ordering_fields = ("start_date", "created_at")
    ordering = ("start_date",)

    def get_permissions(self) -> list:
        """
        Instantiate and return the list of permissions that this view requires.
        """
        public_actions = ("list", "retrieve", "featured", "upcoming")
        if self.action in public_actions:
            return [AllowAny()]
        return [IsEventManager()]

    def get_serializer_class(self) -> type[BaseSerializer]:
        """
        Return the class to use for the serializer depending on the context action.
        """
        if self.action == "list":
            return EventListSerializer
        if self.action == "retrieve":
            return EventDetailSerializer
        return EventCreateUpdateSerializer

    def perform_create(self, serializer: BaseSerializer) -> None:
        """
        Intercept creation to route payload validation through the Service Layer.
        """
        EventService.create_event(serializer.validated_data)

    def perform_update(self, serializer: BaseSerializer) -> None:
        """
        Intercept updates to route mutations through the Service Layer.
        """
        EventService.update_event(serializer.instance, serializer.validated_data)

    @action(detail=False, methods=["get"])
    def featured(self, request: Request) -> Response:
        """
        Retrieve a list of published events flagged as featured.
        """
        queryset = self.get_queryset().filter(is_featured=True, is_published=True)
        serializer = EventListSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"])
    def upcoming(self, request: Request) -> Response:
        """
        Retrieve a filtered list of upcoming events via custom model manager.
        """
        queryset = Event.objects.upcoming()
        serializer = EventListSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
