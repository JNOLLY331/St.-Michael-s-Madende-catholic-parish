from django.db import models
from django.db.models import Q
from django.utils import timezone


class NewsQuerySet(models.QuerySet):
    """Custom QuerySet providing reusable domain-specific filter combinations for news items."""

    def active(self):
        """Filter items flagged as active."""
        return self.filter(is_published=True)

    def published(self):
        """Filter live, published items whose release date has arrived or passed."""
        return self.filter(
            status="PUBLISHED",
            is_published=True,
            published_at__lte=timezone.now(),
        )

    def drafts(self):
        """Filter internal items still marked as drafts."""
        return self.filter(status="DRAFT")

    def archived(self):
        """Filter items marked as archived."""
        return self.filter(status="ARCHIVED")

    def featured(self):
        """Filter highlighted items that are fully published."""
        return self.published().filter(is_featured=True)

    def latest(self):
        """Order items chronologically starting with the most recent release."""
        return self.published().order_by("-published_at")

    def popular(self):
        """Order items by reader traffic volume."""
        return self.published().order_by("-views")

    def by_category(self, category):
        """Filter published items tied to a specific news category."""
        return self.published().filter(category=category)

    def by_author(self, author):
        """Filter items written by a specific user account."""
        return self.filter(author=author)

    def search(self, keyword):
        """Perform a case-insensitive search across key descriptive fields."""
        if not keyword:
            return self.published()
        return self.published().filter(
            Q(title__icontains=keyword)
            | Q(excerpt__icontains=keyword)
            | Q(content__icontains=keyword)
            | Q(keywords__icontains=keyword)
        )

    def homepage(self):
        """Retrieve a specific limited slice of featured items optimized for landing displays."""
        return self.featured()[:6]


# Build a clean manager inheriting all QuerySet methods effortlessly
NewsManager = models.Manager.from_queryset(NewsQuerySet)