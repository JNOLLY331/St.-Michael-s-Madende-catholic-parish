"""
Business logic for Donation operations.
"""

from django.db import transaction
from django.db.models import F

from donations.models import Donation


class DonationService:
    """Encapsulates transactional operations and state machine management for donations."""

    @staticmethod
    @transaction.atomic
    def create_donation(validated_data: dict) -> Donation:
        """Create an initial transaction record and build a zero-padded receipt number."""
        donation = Donation.objects.create(**validated_data)

        # Zero-pad the integer primary key to provide consistent document signatures
        donation.receipt_number = f"RCPT-{donation.id:06d}"
        donation.save(update_fields=["receipt_number"])

        return donation

    @staticmethod
    @transaction.atomic
    def update_donation(donation: Donation, validated_data: dict) -> Donation:
        """Perform generic updates on arbitrary meta fields for a specific ledger entry."""
        for field, value in validated_data.items():
            setattr(donation, field, value)

        donation.save()
        return donation

    @staticmethod
    @transaction.atomic
    def mark_completed(donation: Donation, transaction_reference: str) -> Donation:
        """Settle a ledger row as paid and update campaign funding balances atomically."""
        # Prevent counting the same donation twice if this is called repeatedly
        if donation.payment_status == "COMPLETED":
            return donation

        donation.payment_status = "COMPLETED"
        donation.transaction_reference = transaction_reference
        donation.save(update_fields=["payment_status", "transaction_reference"])

        # If linked to a campaign, increment its current fundraising milestones safely
        if donation.campaign:
            campaign = donation.campaign
            campaign.amount_raised = F("amount_raised") + donation.amount
            campaign.save(update_fields=["amount_raised"])

        return donation

    @staticmethod
    @transaction.atomic
    def mark_failed(donation: Donation) -> Donation:
        """Transition payment entry to a failed state."""
        donation.payment_status = "FAILED"
        donation.save(update_fields=["payment_status"])
        return donation

    @staticmethod
    @transaction.atomic
    def refund(donation: Donation) -> Donation:
        """Mark financial entry as fully refunded and deduct figures from linked campaigns."""
        if donation.payment_status != "COMPLETED":
            donation.payment_status = "REFUNDED"
            donation.save(update_fields=["payment_status"])
            return donation

        donation.payment_status = "REFUNDED"
        donation.save(update_fields=["payment_status"])

        # Reverse the financial contribution from the target tracking asset
        if donation.campaign:
            campaign = donation.campaign
            campaign.amount_raised = F("amount_raised") - donation.amount
            campaign.save(update_fields=["amount_raised"])

        return donation