"""
Custom QuerySets and Managers for the Events application.
"""

from django.db import models
from django.utils import timezone


class EventQuerySet(models.QuerySet):
    """
    Custom QuerySet for reusable event queries.
    """

    def active(self):
        return self.filter(is_active=True)

    def published(self):
        return self.active().filter(
            is_published=True,
            status="PUBLISHED",
        )

    def featured(self):
        return self.published().filter(
            is_featured=True,
        )

    def upcoming(self):
        return self.published().filter(
            start_date__gte=timezone.now().date(),
        )

    def past(self):
        return self.published().filter(
            end_date__lt=timezone.now().date(),
        )

    def by_category(self, category):
        return self.published().filter(
            category=category,
        )

    def by_ministry(self, ministry):
        return self.published().filter(
            ministry=ministry,
        )


class EventManager(models.Manager):
    """
    Custom manager for Event model.
    """

    def get_queryset(self):
        return EventQuerySet(
            self.model,
            using=self._db,
        )

    def active(self):
        return self.get_queryset().active()

    def published(self):
        return self.get_queryset().published()

    def featured(self):
        return self.get_queryset().featured()

    def upcoming(self):
        return self.get_queryset().upcoming()

    def past(self):
        return self.get_queryset().past()

    def by_category(self, category):
        return self.get_queryset().by_category(category)

    def by_ministry(self, ministry):
        return self.get_queryset().by_ministry(ministry)
