"""
Admin registration for the Sacraments application.
Registers Sacrament, SacramentRequirement, and SacramentApplication
with rich list displays, filters, search, and inline editing.
"""

from django.contrib import admin
from django.utils.html import format_html

from sacraments.models import Sacrament, SacramentApplication, SacramentRequirement


# ── Inline: Requirements nested inside a Sacrament ───────────────────────────
class SacramentRequirementInline(admin.TabularInline):
    model = SacramentRequirement
    extra = 1
    fields = ("title", "description", "required", "display_order")
    ordering = ("display_order", "title")


# ── Sacrament ─────────────────────────────────────────────────────────────────
@admin.register(Sacrament)
class SacramentAdmin(admin.ModelAdmin):
    list_display = (
        "sacrament_type",
        "name",
        "banner_preview",
        "preparation_duration",
        "requires_booking",
        "requires_documents",
        "display_order",
        "is_active",
    )
    list_display_links = ("sacrament_type", "name")
    list_editable = ("display_order", "is_active")
    list_filter = ("sacrament_type", "is_active", "requires_booking", "requires_documents")
    search_fields = ("name", "short_description", "description")
    prepopulated_fields = {"slug": ("name",)}
    ordering = ("display_order", "name")
    readonly_fields = ("created_at", "updated_at", "banner_preview")

    fieldsets = (
        ("Sacrament Type", {
            "description": (
                "Select one of the seven Catholic sacraments. "
                "The display name and slug will be auto-filled from your selection "
                "if you leave them blank."
            ),
            "fields": ("sacrament_type",),
        }),
        ("Identity", {
            "fields": ("name", "slug", "icon"),
        }),
        ("Content", {
            "fields": ("short_description", "description", "banner", "banner_preview"),
        }),
        ("Preparation Details", {
            "fields": ("preparation_duration", "minimum_age", "requires_booking", "requires_documents"),
        }),
        ("Display", {
            "fields": ("display_order", "is_active"),
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",),
        }),
    )

    inlines = [SacramentRequirementInline]

    @admin.display(description="Banner")
    def banner_preview(self, obj):
        if obj.banner:
            return format_html(
                '<img src="{}" style="height:48px;border-radius:6px;object-fit:cover;" />',
                obj.banner.url,
            )
        return "—"


# ── SacramentRequirement (standalone) ────────────────────────────────────────
@admin.register(SacramentRequirement)
class SacramentRequirementAdmin(admin.ModelAdmin):
    list_display = ("title", "sacrament", "required", "display_order")
    list_filter = ("required", "sacrament")
    search_fields = ("title", "description", "sacrament__name")
    ordering = ("sacrament", "display_order", "title")


# ── SacramentApplication ─────────────────────────────────────────────────────
@admin.register(SacramentApplication)
class SacramentApplicationAdmin(admin.ModelAdmin):
    list_display = (
        "reference",
        "applicant_name",
        "sacrament",
        "email",
        "phone",
        "preferred_date",
        "status",
        "approved_by",
        "created_at",
    )
    list_display_links = ("reference", "applicant_name")
    list_filter = ("status", "sacrament")
    search_fields = ("reference", "applicant_name", "email", "phone")
    readonly_fields = (
        "reference",
        "created_at",
        "updated_at",
        "approved_at",
    )
    ordering = ("-created_at",)
    date_hierarchy = "preferred_date"

    fieldsets = (
        ("Reference", {
            "fields": ("reference", "status"),
        }),
        ("Applicant", {
            "fields": ("applicant_name", "email", "phone", "date_of_birth"),
        }),
        ("Sacrament Details", {
            "fields": ("sacrament", "preferred_date", "message", "attachment"),
        }),
        ("Review", {
            "fields": ("approved_by", "approved_at", "rejection_reason"),
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",),
        }),
    )
