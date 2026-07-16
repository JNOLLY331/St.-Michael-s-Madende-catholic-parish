from django.contrib import admin

from .models import Ministry


@admin.register(Ministry)
class MinistryAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "category",
        "leader",
        "meeting_day",
        "is_featured",
        "is_active",
    )

    list_filter = (
        "category",
        "name",
        "is_featured",
        "is_active",
    )

    search_fields = (
        "name",
        "description",
        "leader__first_name",
        "leader__last_name",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    prepopulated_fields = {"slug": ("name",)}
