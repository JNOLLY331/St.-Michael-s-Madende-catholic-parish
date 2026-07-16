"""
API endpoints for Gallery Media management.
"""

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response

from gallery.filters import GalleryMediaFilter
from gallery.models import GalleryMedia
from gallery.permissions import (
    CanUploadMedia,
    IsGalleryManager,
)
from gallery.serializers import (
    GalleryMediaCreateUpdateSerializer,
    GalleryMediaDetailSerializer,
    GalleryMediaListSerializer,
)
from gallery.services import GalleryMediaService


class GalleryMediaViewSet(viewsets.ModelViewSet):
    """ViewSet handling individual image/video operations, uploads, and featured highlights."""

    queryset = GalleryMedia.objects.select_related(
        "album",
        "uploaded_by",
    )
    filter_backends = (
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )
    filterset_class = GalleryMediaFilter
    search_fields = (
        "title",
        "description",
    )
    ordering_fields = (
        "created_at",
        "title",
    )
    ordering = ("-created_at",)

    def get_permissions(self):
        if self.action in ("list", "retrieve", "featured"):
            return [AllowAny()]
        if self.action == "create":
            return [CanUploadMedia()]
        return [IsGalleryManager()]

    def get_serializer_class(self):
        if self.action == "list":
            return GalleryMediaListSerializer
        if self.action == "retrieve":
            return GalleryMediaDetailSerializer
        return GalleryMediaCreateUpdateSerializer

    def perform_create(self, serializer):
        media = GalleryMediaService.upload_media(serializer.validated_data)
        serializer.instance = media

    @action(detail=False, methods=["get"])
    def featured(self, request: Request) -> Response:
        """Fetch all media highlights marked as featured showcase elements."""
        queryset = self.filter_queryset(self.get_queryset()).filter(is_featured=True)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = GalleryMediaListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = GalleryMediaListSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"])
    def feature(self, request: Request, pk=None) -> Response:
        """Promote a specific media row to the featured showcase feed."""
        media = self.get_object()
        GalleryMediaService.feature_media(media)
        return Response(
            {"detail": "Media asset successfully marked as featured."},
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["post"])
    def unfeature(self, request: Request, pk=None) -> Response:
        """Demote a specific media row out of the featured showcase feed."""
        media = self.get_object()
        GalleryMediaService.unfeature_media(media)
        return Response(
            {"detail": "Media asset successfully removed from featured items."},
            status=status.HTTP_200_OK,
        )