from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet

from .filters import MinistryFilter
from .models import Ministry
from .permissions import IsMinistryManager
from .serializers import MinistrySerializer


class MinistryViewSet(ModelViewSet):
    queryset = Ministry.objects.select_related("leader", "assistant_leader")
    serializer_class = MinistrySerializer

    # Search, filter, and ordering backends
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_class = MinistryFilter
    search_fields = ["name", "description", "patron_saint"]
    ordering_fields = ["name", "created_at"]
    ordering = ["name"]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]
        return [IsMinistryManager()]
