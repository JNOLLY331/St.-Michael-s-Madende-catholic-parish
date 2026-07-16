"""API ViewSet coordinating the intake and workflow lifecycles of sacrament forms."""

from typing import Any
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from sacraments.filters import SacramentApplicationFilter
from sacraments.models import SacramentApplication
from sacraments.serializers import SacramentApplicationSerializer


class SacramentApplicationViewSet(viewsets.ModelViewSet):
    """API Endpoint handling consumer creation alongside admin-protected application lifecycles."""

    queryset = (
        SacramentApplication.objects
        .select_related("sacrament", "approved_by")
        .by_recent()
    )
    serializer_class = SacramentApplicationSerializer

    filter_backends = (
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )
    filterset_class = SacramentApplicationFilter

    search_fields = (
        "reference",
        "applicant_name",
        "email",
        "phone",
    )
    ordering_fields = (
        "created_at",
        "preferred_date",
    )
    ordering = ("-created_at",)

    def get_permissions(self) -> list[Any]:
        """Dynamically applies permissions based on incoming operational actions."""
        if self.action == "create":
            permission_classes = (permissions.AllowAny,)
        else:
            permission_classes = (permissions.IsAdminUser,)

        return [permission() for permission in permission_classes]

    @action(detail=True, methods=["patch"])
    def approve(self, request: Any, pk: Any = None) -> Response:
        """Transitions state to APPROVED and stamps verifying administrator records."""
        from sacraments.services.sacrament_service import SacramentService

        application = self.get_object()
        SacramentService.approve(application, request.user)

        return Response(
            self.get_serializer(application).data,
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["patch"])
    def reject(self, request: Any, pk: Any = None) -> Response:
        """Transitions state to REJECTED and saves a context rationale string."""
        from sacraments.services.sacrament_service import SacramentService

        application = self.get_object()
        reason = request.data.get("reason", "")
        SacramentService.reject(application, reason)

        return Response(
            self.get_serializer(application).data,
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["patch"])
    def complete(self, request: Any, pk: Any = None) -> Response:
        """Transitions application state to COMPLETED."""
        from sacraments.services.sacrament_service import SacramentService

        application = self.get_object()
        SacramentService.complete(application)

        return Response(
            self.get_serializer(application).data,
            status=status.HTTP_200_OK,
        )