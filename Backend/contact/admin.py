from django.contrib import admin

# Register your models here.
from django.contrib import admin
from contact.models import ContactDepartment, ContactMessage, FAQ


@admin.register(ContactDepartment)
class ContactDepartmentAdmin(admin.ModelAdmin):
    """Admin interface customization for ContactDepartment."""

    list_display = ("name", "email", "phone", "display_order", "is_active")
    list_filter = ("is_active",)
    
    # Required search fields so autocomplete lookups function correctly
    search_fields = ("name", "email")
    ordering = ("display_order", "name")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    """Admin interface customization for ContactMessage with custom sections."""

    list_display = (
        "reference",
        "full_name",
        "email",
        "department",
        "status",
        "priority",
        "assigned_to",
        "is_read",
        "is_spam",
        "created_at",
    )
    list_filter = ("status", "priority", "is_read", "is_spam", "department")
    search_fields = ("reference", "full_name", "email", "subject")
    autocomplete_fields = ("assigned_to", "department")
    readonly_fields = ("reference", "created_at", "updated_at")
    ordering = ("-created_at",)

    fieldsets = (
        ("Sender", {
            "fields": ("reference", "department", "full_name", "email", "phone")
        }),
        ("Message", {
            "fields": ("subject", "message", "attachment")
        }),
        ("Administration", {
            "fields": (
                "status",
                "priority",
                "assigned_to",
                "response",
                "internal_notes",
                "is_read",
                "is_spam",
            )
        }),
        ("Audit", {
            "fields": ("created_at", "updated_at")
        }),
    )


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    """Admin interface customization for FAQs."""

    list_display = ("question", "category", "display_order", "is_featured", "is_published")
    list_filter = ("category", "is_featured", "is_published")
    search_fields = ("question", "answer")
    ordering = ("display_order",)
    prepopulated_fields = {"slug": ("question",)}