"""
API endpoints for Prayer Requests.
"""

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from prayers.filters import PrayerRequestFilter
from prayers.models import PrayerRequest
from prayers.permissions import IsPrayerCoordinator
from prayers.serializers import (
    PrayerCreateUpdateSerializer,
    PrayerDetailSerializer,
    PrayerListSerializer,
)
from prayers.services import PrayerService


class PrayerViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Prayer Requests.
    """

    queryset = (
        PrayerRequest.objects
        .select_related(
            "category",
            "requester",
            "assigned_ministry",
            "assigned_priest",
            "parish",
        )
    )

    filter_backends = (
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )

    filterset_class = PrayerRequestFilter

    search_fields = (
        "title",
        "description",
    )

    ordering_fields = (
        "created_at",
        "priority",
    )

    ordering = (
        "-created_at",
    )

    def get_permissions(self):
        if self.action in ("list", "retrieve", "create"):
            return [AllowAny()]

        return [IsPrayerCoordinator()]

    def get_serializer_class(self):
        if self.action == "list":
            return PrayerListSerializer

        if self.action == "retrieve":
            return PrayerDetailSerializer

        return PrayerCreateUpdateSerializer

    def perform_create(self, serializer):
        PrayerService.create_prayer(serializer.validated_data)

    def perform_update(self, serializer):
        PrayerService.update_prayer(
            serializer.instance,
            serializer.validated_data,
        )

    @action(detail=False, methods=["get"])
    def pending(self, request):
        queryset = PrayerRequest.objects.pending()
        serializer = PrayerListSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def answered(self, request):
        queryset = PrayerRequest.objects.answered()
        serializer = PrayerListSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def urgent(self, request):
        queryset = PrayerRequest.objects.urgent()
        serializer = PrayerListSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def pray(self, request, pk=None):
        prayer = self.get_object()
        PrayerService.increment_prayer_count(prayer)

        return Response(
            {"detail": "Prayer count updated."},
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["post"])
    def mark_answered(self, request, pk=None):
        prayer = self.get_object()

        PrayerService.mark_answered(
            prayer,
            request.data.get("answered_testimony", ""),
        )

        return Response(
            {"detail": "Prayer marked as answered."},
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["post"])
    def close(self, request, pk=None):
        prayer = self.get_object()

        PrayerService.close_prayer(prayer)

        return Response(
            {"detail": "Prayer closed."},
            status=status.HTTP_200_OK,
        )