"""
API endpoints for Album management.
"""

from django.db.models import Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response

from gallery.filters import AlbumFilter
from gallery.models import Album
from gallery.permissions import IsGalleryManager
from gallery.serializers import (
    AlbumCreateUpdateSerializer,
    AlbumDetailSerializer,
    AlbumListSerializer,
)
from gallery.services import AlbumService


class AlbumViewSet(viewsets.ModelViewSet):
    """ViewSet handling reading, creation, visibility toggles, and metadata for media albums."""

    # Pre-fetches relational fields and computes media element counts at the database level
    queryset = (
        Album.objects.select_related("created_by", "parish")
        .prefetch_related("media")
        .annotate(media_count=Count("media"))
    )
    filter_backends = (
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )
    filterset_class = AlbumFilter
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
        if self.action in ("list", "retrieve", "public"):
            return [AllowAny()]
        return [IsGalleryManager()]

    def get_serializer_class(self):
        if self.action == "list":
            return AlbumListSerializer
        if self.action == "retrieve":
            return AlbumDetailSerializer
        return AlbumCreateUpdateSerializer

    def perform_create(self, serializer):
        album = AlbumService.create_album(serializer.validated_data)
        serializer.instance = album

    def perform_update(self, serializer):
        AlbumService.update_album(
            serializer.instance,
            serializer.validated_data,
        )

    @action(detail=False, methods=["get"])
    def public(self, request: Request) -> Response:
        """Explicit endpoint shortcut to list public albums while keeping search and filters active."""
        queryset = self.filter_queryset(self.get_queryset()).filter(is_public=True)
        
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = AlbumListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = AlbumListSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"])
    def make_public(self, request: Request, pk=None) -> Response:
        """Mark an album container as publicly viewable."""
        album = self.get_object()
        album.is_public = True
        album.save(update_fields=["is_public"])

        return Response(
            {"detail": "Album is now public."},
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["post"])
    def make_private(self, request: Request, pk=None) -> Response:
        """Restrict album container access to internal staff roles only."""
        album = self.get_object()
        album.is_public = False
        album.save(update_fields=["is_public"])

        return Response(
            {"detail": "Album is now private."},
            status=status.HTTP_200_OK,
        )