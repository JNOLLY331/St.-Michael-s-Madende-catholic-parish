"""API ViewSet providing public access channels to available sacraments."""

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, permissions, viewsets

from sacraments.filters import SacramentFilter
from sacraments.models import Sacrament
from sacraments.serializers import SacramentSerializer


class SacramentViewSet(viewsets.ReadOnlyModelViewSet):
    """Public, read-only API endpoint for listing and retrieving active sacraments."""

    queryset = Sacrament.objects.active().ordered()
    serializer_class = SacramentSerializer
    permission_classes = (permissions.AllowAny,)

    filter_backends = (
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )
    filterset_class = SacramentFilter

    search_fields = (
        "name",
        "short_description",
        "description",
    )
    ordering_fields = (
        "display_order",
        "name",
    )
    ordering = (
        "display_order",
        "name",
    )