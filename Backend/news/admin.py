from django.contrib import admin

from news.models import News, NewsCategory


@admin.register(NewsCategory)
class NewsCategoryAdmin(admin.ModelAdmin):
    """Admin dashboard layout configuration for News Categories."""

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


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    """Admin dashboard layout configuration for News Articles and Bulletins."""

    list_display = (
        "title",
        "category",
        "author",
        "status",
        "is_featured",
        "views",
        "published_at",
    )
    list_filter = (
        "status",
        "is_featured",
        "category",
    )
    search_fields = (
        "title",
        "excerpt",
        "content",
    )
    readonly_fields = (
        "views",
        "likes",
        "shares",
        "created_at",
        "updated_at",
    )
    autocomplete_fields = (
        "category",
        "author",
        "parish",
    )
    prepopulated_fields = {
        "slug": ("title",),
    }
    date_hierarchy = "published_at"
    ordering = ("-published_at",)