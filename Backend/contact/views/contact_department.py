from rest_framework import filters, permissions, viewsets
from django_filters.rest_framework import DjangoFilterBackend

from contact.filters import ContactDepartmentFilter
from contact.models import ContactDepartment
from contact.permissions import IsContactAdmin
from contact.serializers import ContactDepartmentSerializer


class ContactDepartmentViewSet(viewsets.ModelViewSet):
    """ViewSet managing CRUD endpoints for Contact Departments with dynamic permissions."""

    # Using an optimized fallback queryset for standard router initialization
    queryset = ContactDepartment.objects.all()
    serializer_class = ContactDepartmentSerializer

    filter_backends = (
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )
    filterset_class = ContactDepartmentFilter
    search_fields = ("name", "email", "description")
    ordering_fields = ("display_order", "name", "created_at")

    def get_queryset(self):
        """Ensures queries remain dynamic and evaluate correctly at request runtime."""
        return ContactDepartment.objects.active().ordered()

    def get_permissions(self) -> list[permissions.BasePermission]:
        """Dynamically applies permissions based on safe read vs write actions."""
        if self.action in ("list", "retrieve"):
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [IsContactAdmin]

        return [permission() for permission in permission_classes]