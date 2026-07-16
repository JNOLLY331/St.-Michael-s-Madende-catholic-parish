from django.contrib import admin

from prayers.models import PrayerCategory, PrayerRequest


@admin.register(PrayerCategory)
class PrayerCategoryAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "is_active",
        "created_at",
    )

    search_fields = (
        "name",
    )

    list_filter = (
        "is_active",
    )

    prepopulated_fields = {
        "slug": ("name",),
    }


@admin.register(PrayerRequest)
class PrayerRequestAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "requester",
        "category",
        "priority",
        "status",
        "answered",
        "created_at",
    )

    list_filter = (
        "status",
        "priority",
        "answered",
        "category",
    )

    search_fields = (
        "title",
        "description",
    )

    readonly_fields = (
        "slug",
        "prayed_count",
        "answered_date",
        "created_at",
        "updated_at",
    )

    autocomplete_fields = (
        "requester",
        "assigned_priest",
        "assigned_ministry",
        "category",
    )