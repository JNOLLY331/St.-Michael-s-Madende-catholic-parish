"""
Django Admin console registration and configuration for the Gallery application.
"""

from django.contrib import admin

from gallery.models import Album, GalleryMedia  # Fixed: Imported correct 'Album' model name


class GalleryMediaInline(admin.TabularInline):
    """Allows staff to view, append, or modify media files directly inside the Album detail page."""

    model = GalleryMedia
    extra = 0
    fields = (
        "title",
        "media_type",
        "is_featured",
        "created_at",  # Fixed: Included so the read-only timestamp actually renders in the UI
    )
    readonly_fields = ("created_at",)


@admin.register(Album)  # Fixed: Registered correct model name
class AlbumAdmin(admin.ModelAdmin):
    """Admin dashboard container managing collections, slugs, and nested media elements."""

    list_display = (
        "title",
        "parish",
        "created_by",
        "is_public",
        "created_at",
    )
    list_filter = (
        "is_public",
        "created_at",
    )
    search_fields = (
        "title",
        "description",
    )
    prepopulated_fields = {
        "slug": ("title",),
    }
    readonly_fields = (
        "created_at",
        "updated_at",
    )
    inlines = [GalleryMediaInline]
    list_select_related = ("parish", "created_by")


@admin.register(GalleryMedia)
class GalleryMediaAdmin(admin.ModelAdmin):
    """Admin dashboard ledger managing independent asset files and cross-references."""

    list_display = (
        "title",
        "album",
        "media_type",
        "uploaded_by",
        "is_featured",
        "created_at",
    )
    list_filter = (
        "media_type",
        "is_featured",
        # Fixed: Removed "is_public" filter since the field only exists on the parent Album model
    )
    search_fields = (
        "title",
        "description",
    )
    readonly_fields = (
        "created_at",
        "updated_at",
    )
    # Optimizes list views by fetching associated models in a single JOIN operation
    list_select_related = ("album", "uploaded_by")