import django_filters
from contact.models import ContactDepartment, ContactMessage, FAQ


class ContactDepartmentFilter(django_filters.FilterSet):
    """Filter class for the ContactDepartment model."""

    class Meta:
        model = ContactDepartment
        fields = ["is_active"]


class ContactMessageFilter(django_filters.FilterSet):
    """Filter class for the ContactMessage model."""

    class Meta:
        model = ContactMessage
        # Optimized with lookup expressions for more versatile filtering
        fields = {
            "status": ["exact", "in"],
            "priority": ["exact", "in"],
            "department": ["exact"],
            "is_spam": ["exact"],
            "is_read": ["exact"],
        }


class FAQFilter(django_filters.FilterSet):
    """Filter class for the FAQ model."""

    class Meta:
        model = FAQ
        fields = ["is_published", "is_featured"]