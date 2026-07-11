from typing import Any
from rest_framework import filters, permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import serializers

from contact.filters import ContactMessageFilter
from contact.models import ContactMessage
from contact.permissions import IsContactAdmin
from contact.serializers import ContactMessageAdminSerializer, ContactMessageSerializer
from contact.services.contact_service import ContactService


class ContactMessageViewSet(viewsets.ModelViewSet):
    """ViewSet managing the end-to-end lifecycle of Contact Messages."""

    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    filter_backends = (
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )
    filterset_class = ContactMessageFilter

    search_fields = ("reference", "full_name", "email", "subject")
    ordering_fields = ("created_at", "priority", "status")

    def get_queryset(self) -> Any:
        """Ensures queries are evaluated cleanly per request lifecycle."""
        return ContactMessage.objects.by_recent()

    def get_serializer_class(self) -> type[serializers.ModelSerializer]:
        """Dynamically serves detailed administration layouts to staff users."""
        if self.request.user and self.request.user.is_staff:
            return ContactMessageAdminSerializer
        return ContactMessageSerializer

    def get_permissions(self) -> list[permissions.BasePermission]:
        """Restricts viewing capabilities to administration staff while allowing public posts."""
        if self.action == "create":
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [IsContactAdmin]
        return [permission() for permission in permission_classes]

    @action(detail=True, methods=["post"])
    def close(self, request: Any, pk: Any = None) -> Response:
        """Custom endpoint to close out a contact ticket."""
        message = self.get_object()
        ContactService.close(message)
        return Response(
            {"detail": "Message closed."},
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["post"])
    def spam(self, request: Any, pk: Any = None) -> Response:
        """Custom endpoint to route messages into spam quarantine."""
        message = self.get_object()
        ContactService.mark_spam(message)
        return Response(
            {"detail": "Message marked as spam."},
            status=status.HTTP_200_OK,
        )