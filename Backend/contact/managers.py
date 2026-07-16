from django.db import models


class ContactDepartmentQuerySet(models.QuerySet):
    """QuerySet for managing contact departments."""

    def active(self):
        return self.filter(is_active=True)

    def inactive(self):
        return self.filter(is_active=False)

    def ordered(self):
        return self.order_by("display_order", "name")


class ContactMessageQuerySet(models.QuerySet):
    """QuerySet for filtering and sorting incoming contact messages."""

    def unread(self):
        return self.filter(is_read=False)

    def read(self):
        return self.filter(is_read=True)

    def spam(self):
        return self.filter(is_spam=True)

    def inbox(self):
        return self.filter(is_spam=False, status="NEW")

    def open(self):
        return self.exclude(status__in=["CLOSED", "SPAM"])

    def closed(self):
        return self.filter(status="CLOSED")

    def assigned(self):
        return self.exclude(assigned_to=None)

    def unassigned(self):
        return self.filter(assigned_to=None)

    def high_priority(self):
        return self.filter(priority__in=["HIGH", "URGENT"])

    def by_recent(self):
        return self.order_by("-created_at")


class FAQQuerySet(models.QuerySet):
    """QuerySet for managing FAQ visibility and ordering."""

    def published(self):
        return self.filter(is_published=True)

    def featured(self):
        return self.filter(is_featured=True)

    def ordered(self):
        return self.order_by("display_order")


# Custom Managers generated from QuerySets
ContactDepartmentManager = models.Manager.from_queryset(ContactDepartmentQuerySet)
ContactMessageManager = models.Manager.from_queryset(ContactMessageQuerySet)
FAQManager = models.Manager.from_queryset(FAQQuerySet)