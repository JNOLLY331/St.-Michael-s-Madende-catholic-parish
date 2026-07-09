from django.contrib import admin
from django.utils.html import format_html

from .models import Event, EventRegistration


class EventRegistrationInline(admin.TabularInline):
    """Inline registrations displayed on the Event detail form page."""

    model = EventRegistration
    extra = 0
    autocomplete_fields = ("member",)
    readonly_fields = ("created_at", "updated_at")
    show_change_link = True


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    """Event administration configuration dashboard."""

    list_display = (
        "title",
        "category",
        "status",
        "start_date",
        "venue",
        "capacity",
        "registered_count",
        "available_slots",
        "is_featured",
        "is_published",
        "banner_preview",
    )

    list_filter = (
        "category",
        "status",
        "is_featured",
        "is_published",
        "start_date",
        "ministry",
    )

    search_fields = (
        "title",
        "description",
        "venue",
    )

    ordering = ("-start_date",)

    readonly_fields = (
        "slug",
        "registered_count",
        "available_slots",
        "created_at",
        "updated_at",
        "banner_preview",
    )

    prepopulated_fields = {"slug": ("title",)}
    autocomplete_fields = ("organizer", "ministry")
    list_select_related = ("organizer", "ministry")
    inlines = (EventRegistrationInline,)

    actions = (
        "publish_events",
        "cancel_events",
        "feature_events",
        "unfeature_events",
    )

    fieldsets = (
        (
            "Basic Information",
            {
                "fields": (
                    "title",
                    "slug",
                    "description",
                    "category",
                ),
            },
        ),
        (
            "Scheduling",
            {
                "fields": (
                    "start_date",
                    "end_date",
                    "start_time",
                    "end_time",
                ),
            },
        ),
        (
            "Location",
            {
                "fields": ("venue",),
            },
        ),
        (
            "Registration Rules",
            {
                "fields": (
                    "capacity",
                    "registered_count",
                    "available_slots",
                    "is_registration_required",
                    "registration_deadline",
                ),
            },
        ),
        (
            "Media Assets",
            {
                "fields": (
                    "banner",
                    "banner_preview",
                    "thumbnail",
                ),
            },
        ),
        (
            "Relationships",
            {
                "fields": (
                    "organizer",
                    "ministry",
                    "church",
                ),
            },
        ),
        (
            "Status & Visibility",
            {
                "fields": (
                    "status",
                    "is_featured",
                    "is_published",
                ),
            },
        ),
        (
            "Metadata",
            {
                "classes": ("collapse",),
                "fields": (
                    "created_at",
                    "updated_at",
                ),
            },
        ),
    )

    @admin.display(description="Banner")
    def banner_preview(self, obj):
        if obj.banner:
            return format_html(
                '<img src="{}" width="120" style="border-radius:8px;" />',
                obj.banner.url,
            )
        return "-"

    @admin.display(description="Available Slots")
    def available_slots(self, obj):
        if obj.capacity == 0:
            return "Unlimited"
        slots = obj.capacity - obj.registered_count
        return max(0, slots)

    @admin.action(description="Publish selected events")
    def publish_events(self, request, queryset):
        queryset.update(status="PUBLISHED", is_published=True)

    @admin.action(description="Cancel selected events")
    def cancel_events(self, request, queryset):
        queryset.update(status="CANCELLED")

    @admin.action(description="Feature selected events")
    def feature_events(self, request, queryset):
        queryset.update(is_featured=True)

    @admin.action(description="Remove featured status")
    def unfeature_events(self, request, queryset):
        queryset.update(is_featured=False)


@admin.register(EventRegistration)
class EventRegistrationAdmin(admin.ModelAdmin):
    """Event registrations administration dashboard."""

    list_display = (
        "member",
        "event",
        "attendance_status",
        "created_at",
    )

    list_filter = (
        "attendance_status",
        "created_at",
    )

    search_fields = (
        "member__first_name",
        "member__last_name",
        "member__email",
        "event__title",
    )

    autocomplete_fields = (
        "member",
        "event",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    list_select_related = (
        "member",
        "event",
    )
