"""Email notification handling services for the Sacraments pipeline."""

from typing import Any
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags


class SacramentEmailService:
    """Handles transactional email communications throughout application lifecycles."""

    @staticmethod
    def send_confirmation(application: Any) -> None:
        """Dispatches an application receipt confirmation layout."""
        context = {"application": application}

        try:
            html_message = render_to_string(
                "emails/sacraments/application_confirmation.html",
                context,
            )
            plain_message = strip_tags(html_message)
        except Exception:
            html_message = None
            plain_message = (
                f"Dear {application.applicant_name},\n\n"
                f"Your application ({application.reference}) has been received.\n\n"
                "The parish office will contact you soon.\n\n"
                "God bless you."
            )

        send_mail(
            subject=f"Sacrament Application Received - {application.reference}",
            message=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[application.email],
            html_message=html_message,
            fail_silently=False,
        )

    @staticmethod
    def send_approval(application: Any) -> None:
        """Dispatches a notification confirming workflow approval status."""
        send_mail(
            subject="Sacrament Application Approved",
            message=(
                f"Dear {application.applicant_name},\n\n"
                f"Your application for {application.sacrament.name} "
                "has been approved.\n\n"
                "Please visit the parish office for the next steps."
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[application.email],
            fail_silently=False,
        )

    @staticmethod
    def send_rejection(application: Any) -> None:
        """Dispatches a notification conveying rejection updates and reasons."""
        send_mail(
            subject="Sacrament Application Update",
            message=(
                f"Dear {application.applicant_name},\n\n"
                "Unfortunately your application could not be approved.\n\n"
                f"Reason:\n{application.rejection_reason}"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[application.email],
            fail_silently=False,
        )

    @staticmethod
    def send_completion(application: Any) -> None:
        """Dispatches a notification confirming lifecycle finalization."""
        send_mail(
            subject="Sacrament Process Completed",
            message=(
                f"Dear {application.applicant_name},\n\n"
                "Your sacrament process has been completed.\n\n"
                "Thank you for being part of our parish."
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[application.email],
            fail_silently=False,
        )