"""
Django Admin console registration and configuration for the Donations application.
"""

from django.contrib import admin

from donations.models import (
    Campaign,
    Donation,
    DonationCategory,
)


@admin.register(DonationCategory)
class DonationCategoryAdmin(admin.ModelAdmin):
    """Admin representation guarding structural category tags."""

    list_display = (
        "name",
        "is_active",
        "created_at",
    )
    list_filter = ("is_active",)
    search_fields = ("name",)
    prepopulated_fields = {
        "slug": ("name",),
    }


@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    """Admin panel displaying active church fundraising campaigns and goal progress."""

    list_display = (
        "title",
        "target_amount",
        "amount_raised",
        "start_date",
        "end_date",
        "is_active",
    )
    list_filter = ("is_active",)
    search_fields = ("title",)
    prepopulated_fields = {
        "slug": ("title",),
    }


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    """Admin ledger displaying individual transaction statuses and financial summaries."""

    list_display = (
        "receipt_number",
        "donor",
        "amount",
        "payment_method",
        "payment_status",
        "anonymous",
        "created_at",
    )
    list_filter = (
        "payment_status",
        "payment_method",
        "anonymous",
    )
    search_fields = (
        "receipt_number",
        "transaction_reference",
    )
    readonly_fields = (
        "receipt_number",
        "transaction_reference",
    )
    # Optimizes performance by pre-fetching foreign keys in a single joined SQL operation
    list_select_related = (
        "donor",
        "category",
        "campaign",
    )