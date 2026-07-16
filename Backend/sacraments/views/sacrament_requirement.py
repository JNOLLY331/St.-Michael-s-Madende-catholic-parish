"""API ViewSet providing public access to mandatory sacrament requirements."""

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, permissions, viewsets

from sacraments.filters import SacramentRequirementFilter
from sacraments.models import SacramentRequirement
from sacraments.serializers import SacramentRequirementSerializer


class SacramentRequirementViewSet(viewsets.ReadOnlyModelViewSet):
    """Public, read-only API endpoint for listing mandatory sacrament requirements."""

    queryset = SacramentRequirement.objects.required().ordered()
    serializer_class = SacramentRequirementSerializer
    permission_classes = (permissions.AllowAny,)

    filter_backends = (
        DjangoFilterBackend,
        filters.OrderingFilter,
    )
    filterset_class = SacramentRequirementFilter
    ordering = ("display_order",)