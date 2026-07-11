from django.db import models


class SacramentQuerySet(models.QuerySet):
    """Custom queries for the Sacrament model."""

    def active(self):
        """Filters only active sacraments available to parishioners."""
        return self.filter(is_active=True)

    def ordered(self):
        """Orders sacraments sequentially by priority weight and then name."""
        return self.order_by("display_order", "name")


class SacramentRequirementQuerySet(models.QuerySet):
    """Custom queries for Sacrament structural prerequisites."""

    def ordered(self):
        """Orders requirements based on display sequence."""
        return self.order_by("display_order")

    def required(self):
        """Filters only strict mandatory structural requirements."""
        return self.filter(required=True)


class SacramentApplicationQuerySet(models.QuerySet):
    """Custom queries for filtering applicant workflow records."""

    def pending(self):
        """Filters applications awaiting administrative processing."""
        return self.filter(status="PENDING")

    def approved(self):
        """Filters applications that have been officially accepted."""
        return self.filter(status="APPROVED")

    def completed(self):
        """Filters finalized applications where the sacrament was received."""
        return self.filter(status="COMPLETED")

    def rejected(self):
        """Filters applications that were denied or cancelled."""
        return self.filter(status="REJECTED")

    def by_recent(self):
        """Sorts workflows chronologically starting from the newest entry."""
        return self.order_by("-created_at")


# Generating exposure managers from the underlying QuerySets
SacramentManager = models.Manager.from_queryset(SacramentQuerySet)
SacramentRequirementManager = models.Manager.from_queryset(SacramentRequirementQuerySet)
SacramentApplicationManager = models.Manager.from_queryset(SacramentApplicationQuerySet)