from typing import Any
from rest_framework import filters, permissions, viewsets
from django_filters.rest_framework import DjangoFilterBackend

from contact.filters import FAQFilter
from contact.models import FAQ
from contact.permissions import IsContactAdmin
from contact.serializers import FAQSerializer


class FAQViewSet(viewsets.ModelViewSet):
    """ViewSet managing public and administrative CRUD actions for FAQs."""

    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer

    filter_backends = (
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )
    filterset_class = FAQFilter

    search_fields = ("question", "answer", "category")
    ordering_fields = ("display_order", "created_at")

    def get_queryset(self) -> Any:
        """Evaluates the dataset per request to safely fetch published, ordered FAQs."""
        return FAQ.objects.published().ordered()

    def get_permissions(self) -> list[permissions.BasePermission]:
        """Dynamically toggles access controls between public viewing and admin updates."""
        if self.action in ("list", "retrieve"):
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [IsContactAdmin]

        return [permission() for permission in permission_classes]