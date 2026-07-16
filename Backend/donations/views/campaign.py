"""
API endpoints for Campaign management.
"""

from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from donations.models import Campaign
from donations.permissions import IsFinanceManager
from donations.serializers import (
    CampaignCreateUpdateSerializer,
    CampaignDetailSerializer,
    CampaignListSerializer,
)


class CampaignViewSet(viewsets.ModelViewSet):
    """ViewSet for public campaign visibility and administrative management."""

    queryset = Campaign.objects.all()

    def get_permissions(self):
        if self.action in ("list", "retrieve"):
            return [AllowAny()]
        return [IsFinanceManager()]

    def get_serializer_class(self):
        if self.action == "list":
            return CampaignListSerializer
        if self.action == "retrieve":
            return CampaignDetailSerializer
        return CampaignCreateUpdateSerializer