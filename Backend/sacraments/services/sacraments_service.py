"""Internal alert and event auditing layer for the Sacraments pipeline."""

import logging
from typing import Any
from django.contrib.auth import get_user_model
from django.db.models import Q

from sacraments.models import SacramentApplication

User = get_user_model()
logger = logging.getLogger(__name__)


class SacramentNotificationService:
    """Handles internal systems notifications and audits for sacrament applications."""

    @staticmethod
    def notify_new_application(application: SacramentApplication) -> None:
        """Audits and alerts administrative teams regarding a newly submitted intake form."""
        admins = User.objects.filter(
            Q(is_staff=True) | Q(is_superuser=True)
        ).distinct()

        for admin in admins:
            logger.info(
                "Notify %s about new sacrament application %s",
                admin.username,
                application.reference,
            )

    @staticmethod
    def notify_application_approved(application: SacramentApplication) -> None:
        """Audits confirmation logs indicating successful admin verification approval."""
        logger.info("Application %s approved.", application.reference)

    @staticmethod
    def notify_application_rejected(application: SacramentApplication) -> None:
        """Audits administrative logs documenting rejected application workflows."""
        logger.info("Application %s rejected.", application.reference)

    @staticmethod
    def notify_application_completed(application: SacramentApplication) -> None:
        """Audits system lifecycle finalization upon reception of the sacrament."""
        logger.info("Application %s completed.", application.reference)