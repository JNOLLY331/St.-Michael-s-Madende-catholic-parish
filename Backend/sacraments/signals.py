"""Database signals event handling hooks for the Sacraments application."""

from typing import Any
from django.db.models.signals import post_save
from django.dispatch import receiver

from sacraments.models import SacramentApplication


@receiver(post_save, sender=SacramentApplication)
def notify_new_application(
    sender: Any, 
    instance: SacramentApplication, 
    created: bool, 
    **kwargs: Any
) -> None:
    """Listens for new database inserts to trigger initial administrative intake alerts."""
    if created:
        from sacraments.services.notification_service import SacramentNotificationService
        SacramentNotificationService.notify_new_application(instance)


@receiver(post_save, sender=SacramentApplication)
def notify_status_change(
    sender: Any, 
    instance: SacramentApplication, 
    created: bool, 
    **kwargs: Any
) -> None:
    """Listens for database record updates to log milestone workflow changes."""
    if created:
        return

    from sacraments.services.notification_service import SacramentNotificationService

    # Aligning explicitly with the database manager uppercase string status rules
    if instance.status == "APPROVED":
        SacramentNotificationService.notify_application_approved(instance)

    elif instance.status == "REJECTED":
        SacramentNotificationService.notify_application_rejected(instance)

    elif instance.status == "COMPLETED":
        SacramentNotificationService.notify_application_completed(instance)