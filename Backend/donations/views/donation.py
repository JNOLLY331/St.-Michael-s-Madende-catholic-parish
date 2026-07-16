"""
API endpoints for Donation management.
"""

from django.db.models import Sum
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import BaseSerializer

from donations.filters import DonationFilter
from donations.models import Donation
from donations.permissions import IsFinanceManager
from donations.serializers import (
    DonationCreateUpdateSerializer,
    DonationDetailSerializer,
    DonationListSerializer,
)
from donations.services import (
    DonationNotificationService,
    DonationService,
    PaymentService,
)


class DonationViewSet(viewsets.ModelViewSet):
    """ViewSet for listing, creating, and analyzing financial donations."""

    queryset = Donation.objects.select_related(
        "donor",
        "category",
        "campaign",
    )
    filter_backends = (
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )
    filterset_class = DonationFilter
    search_fields = (
        "receipt_number",
        "transaction_reference",
    )
    ordering_fields = (
        "created_at",
        "amount",
    )
    ordering = ("-created_at",)

    def get_permissions(self):
        if self.action == "create":
            return [IsAuthenticated()]
        return [IsFinanceManager()]

    def get_serializer_class(self) -> type[BaseSerializer]:
        if self.action == "list":
            return DonationListSerializer
        if self.action == "retrieve":
            return DonationDetailSerializer
        return DonationCreateUpdateSerializer

    def perform_create(self, serializer):
        donation = DonationService.create_donation(serializer.validated_data)
        serializer.instance = donation

    def perform_update(self, serializer):
        DonationService.update_donation(
            serializer.instance,
            serializer.validated_data,
        )

    @action(detail=True, methods=["post"])
    def verify_payment(self, request: Request, pk=None):
        """Query verification gateway state to process pending transaction receipts."""
        donation = self.get_object()

        payment = PaymentService.verify_payment(donation.transaction_reference)

        if payment.get("verified"):
            DonationService.mark_completed(
                donation,
                donation.transaction_reference,
            )
            DonationNotificationService.payment_successful(donation)
            return Response(
                {"message": "Payment verified."},
                status=status.HTTP_200_OK,
            )

        DonationService.mark_failed(donation)
        DonationNotificationService.payment_failed(donation)
        return Response(
            {"message": "Payment verification failed."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    @action(detail=False, methods=["get"])
    def statistics(self, request: Request) -> Response:
        """Fetch aggregated structural ledger metrics directly via database computations."""
        queryset = self.filter_queryset(self.get_queryset())

        stats = queryset.aggregate(
            total_count=Sum(1),  # Quick native count mapping
            total_amount=Sum("amount"),
        )

        completed = queryset.filter(payment_status="COMPLETED").count()
        pending = queryset.filter(payment_status="PENDING").count()

        return Response(
            {
                "total_donations": stats["total_count"] or 0,
                "completed": completed,
                "pending": pending,
                "total_amount": float(stats["total_amount"] or 0.0),
            },
            status=status.HTTP_200_OK,
        )