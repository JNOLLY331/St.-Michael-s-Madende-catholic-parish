from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from news.models import NewsCategory
from news.permissions import IsNewsManager
from news.serializers import (
    NewsCategoryCreateUpdateSerializer,
    NewsCategorySerializer,
)


class NewsCategoryViewSet(viewsets.ModelViewSet):
    """CRUD operations for organizing and managing news categories."""

    queryset = NewsCategory.objects.all()

    def get_permissions(self):
        """Allow public access for reading, restrict mutations to news managers."""
        if self.action in ("list", "retrieve"):
            return [AllowAny()]
        return [IsNewsManager()]

    def get_serializer_class(self):
        """Switch serializer types based on read or write action contexts."""
        if self.action in ("list", "retrieve"):
            return NewsCategorySerializer
        return NewsCategoryCreateUpdateSerializer